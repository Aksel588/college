require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const DB_NAME = process.env.DB_NAME || 'info';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
});

/* ---------- helpers ---------- */
const httpError = (status, message) => Object.assign(new Error(message), { status });

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    return `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
}

// Supports old plain-text passwords already in your table, and new hashed ones
function verifyPassword(password, stored) {
    stored = String(stored || '');
    if (!/^[0-9a-f]{32}:[0-9a-f]{128}$/.test(stored)) return stored === password;
    const [salt, hash] = stored.split(':');
    return crypto.timingSafeEqual(crypto.scryptSync(password, salt, 64), Buffer.from(hash, 'hex'));
}
const isHashed = (s) => /^[0-9a-f]{32}:[0-9a-f]{128}$/.test(String(s || ''));

const sessions = new Map(); // token -> user (cleared on restart)

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role || 'user' });

function auth(req, res, next) {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    const user = sessions.get(token);
    if (!user) return res.status(401).json({ error: 'Խնդրում ենք մուտք գործել' });
    req.user = user;
    next();
}

function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Միայն ադմինի համար' });
    next();
}

function cleanProduct(body) {
    const p = {
        title: String(body.title || '').trim(),
        category: String(body.category || '').trim(),
        price: Number(body.price),
        rating: Number(body.rating ?? 0),
        stock: Number(body.stock),
        image: String(body.image || '').trim(),
        description: String(body.description || '').trim()
    };
    if (!p.title || !p.category) throw httpError(400, 'Անվանումը և բաժինը պարտադիր են');
    if (!Number.isFinite(p.price) || p.price < 0) throw httpError(400, 'Սխալ գին');
    if (!Number.isInteger(p.stock) || p.stock < 0) throw httpError(400, 'Սխալ քանակ');
    if (!Number.isFinite(p.rating) || p.rating < 0 || p.rating > 5) throw httpError(400, 'Վարկանիշը 0-5 է');
    return p;
}

const wrap = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (err) {
        if (!err.status) console.error(err);
        res.status(err.status || 500).json({ error: err.status ? err.message : 'Սերվերի սխալ' });
    }
};

/* ---------- auto-prepare the existing `info` database ---------- */
async function ensureSchema() {
    const [cols] = await pool.query(
        'SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH AS len FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
        [DB_NAME, 'users']
    );
    if (!cols.length) throw new Error(`Table "users" not found in database "${DB_NAME}"`);
    const has = (n) => cols.find((c) => c.COLUMN_NAME === n);

    if (!has('id')) console.warn('WARNING: users table has no "id" column - add: ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;');
    if (!has('role')) await pool.query("ALTER TABLE users ADD COLUMN role VARCHAR(10) NOT NULL DEFAULT 'user'");
    if (!has('phone')) await pool.query("ALTER TABLE users ADD COLUMN phone VARCHAR(30) DEFAULT ''");
    const pw = has('password');
    if (!pw) throw new Error('users table needs a "password" column');
    if (pw.len !== null && pw.len < 200) await pool.query('ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL');

    await pool.query(`CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        total DECIMAL(12,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NULL,
        title VARCHAR(150) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL
    )`);
}

/* ---------- users ---------- */
app.post('/api/register', wrap(async (req, res) => {
    const name = String(req.body.name || '').trim() || 'User';
    const email = String(req.body.email || '').trim().toLowerCase();
    const phone = String(req.body.phone || '').trim();
    const password = String(req.body.password || '');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw httpError(400, 'Անվավեր էլ․ փոստ');
    if (password.length < 6) throw httpError(400, 'Գաղտնաբառը պետք է լինի մին 6 նիշ');

    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) throw httpError(409, 'Այս էլ․ փոստն արդեն գրանցված է');

    const [result] = await pool.query(
        'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashPassword(password)]
    );
    const user = { id: result.insertId, name, email, phone, role: 'user' };
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, user);
    res.status(201).json({ ...user, token });
}));

app.post('/api/login', wrap(async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length || !verifyPassword(password, rows[0].password)) throw httpError(401, 'Սխալ տվյալներ');

    // upgrade an old plain-text password to a hash on successful login
    if (!isHashed(rows[0].password)) {
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashPassword(password), rows[0].id]);
    }
    const user = publicUser(rows[0]);
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, user);
    res.json({ ...user, token });
}));

/* ---------- products CRUD ---------- */
app.get('/api/products', wrap(async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
}));

app.get('/api/products/:id', wrap(async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) throw httpError(404, 'Ապրանքը չի գտնվել');
    res.json(rows[0]);
}));

app.post('/api/products', auth, adminOnly, wrap(async (req, res) => {
    const p = cleanProduct(req.body);
    // works whether or not products.id is AUTO_INCREMENT
    const [[{ nextId }]] = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM products');
    await pool.query(
        'INSERT INTO products (id, title, category, price, rating, stock, image, description) VALUES (?,?,?,?,?,?,?,?)',
        [nextId, p.title, p.category, p.price, p.rating, p.stock, p.image, p.description]
    );
    res.status(201).json({ id: nextId, ...p });
}));

app.put('/api/products/:id', auth, adminOnly, wrap(async (req, res) => {
    const p = cleanProduct(req.body);
    const [result] = await pool.query(
        'UPDATE products SET title=?, category=?, price=?, rating=?, stock=?, image=?, description=? WHERE id=?',
        [p.title, p.category, p.price, p.rating, p.stock, p.image, p.description, req.params.id]
    );
    if (!result.affectedRows) throw httpError(404, 'Ապրանքը չի գտնվել');
    res.json({ id: Number(req.params.id), ...p });
}));

app.delete('/api/products/:id', auth, adminOnly, wrap(async (req, res) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) throw httpError(404, 'Ապրանքը չի գտնվել');
    res.json({ success: true });
}));

/* ---------- checkout: stock 10 -> 9 ---------- */
app.post('/api/orders', auth, wrap(async (req, res) => {
    const items = req.body.items;
    if (!Array.isArray(items) || !items.length) throw httpError(400, 'Զամբյուղը դատարկ է');

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        let total = 0;
        const lines = [];

        for (const it of items) {
            const id = Number(it.id);
            const qty = Number(it.quantity);
            if (!Number.isInteger(id) || !Number.isInteger(qty) || qty <= 0) throw httpError(400, 'Սխալ քանակ');

            const [rows] = await conn.query('SELECT id, title, price, stock FROM products WHERE id = ? FOR UPDATE', [id]);
            if (!rows.length) throw httpError(404, 'Ապրանքը այլևս չկա');
            const p = rows[0];
            if (p.stock < qty) throw httpError(409, `${p.title}՝ պահեստում մնացել է ${p.stock} հատ`);

            await conn.query('UPDATE products SET stock = stock - ? WHERE id = ?', [qty, id]);
            total += p.price * qty;
            lines.push([p.id, p.title, p.price, qty]);
        }

        const [order] = await conn.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [req.user.id, total]);
        for (const l of lines) {
            await conn.query(
                'INSERT INTO order_items (order_id, product_id, title, price, quantity) VALUES (?,?,?,?,?)',
                [order.insertId, ...l]
            );
        }
        await conn.commit();
        res.status(201).json({ orderId: order.insertId, total });
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}));

app.get('/api/orders/my', auth, wrap(async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.json(rows);
}));

const PORT = process.env.PORT || 5000;
ensureSchema()
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((err) => {
        console.error('Startup failed:', err.message);
        process.exit(1);
    });
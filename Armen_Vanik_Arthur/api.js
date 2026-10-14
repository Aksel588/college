const API_BASE = 'http://localhost:5000/api';

function stanaltoken() {
    try {
        const u = JSON.parse(localStorage.getItem('ogtater'));
        return u && u.token ? u.token : '';
    } catch (e) {
        return '';
    }
}

// Generic request helper: JSON in/out, auth header, readable errors
async function apiqayl(path, method = 'GET', body) {
    const headers = { 'Content-Type': 'application/json' };
    const token = stanaltoken();
    if (token) headers.Authorization = `Bearer ${token}`;

    let response;
    try {
        response = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined
        });
    } catch (e) {
        throw new Error('Սերվերին միանալ չհաջողվեց');
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Սխալ');
    return data;
}

/* READ */
const apranqneristatsum = () => apiqayl('/products');
const apranqistatsumbyid = (apranqiid) => apiqayl(`/products/${apranqiid}`);

/* CREATE / UPDATE / DELETE (admin) */
const apranqiavelacum = (apranq) => apiqayl('/products', 'POST', apranq);
const apranqiatnvel = (id, apranq) => apiqayl(`/products/${id}`, 'PUT', apranq);
const apranqihacnel = (id) => apiqayl(`/products/${id}`, 'DELETE');

/* Checkout: server lowers stock inside a transaction */
const patvirel = (items) =>
    apiqayl('/orders', 'POST', { items: items.map((i) => ({ id: i.id, quantity: i.quantity })) });

/* Login / Register (saved in the SQL users table) */
const ogtaterimutq = (elpost, parol, anun = '', heraxos = '', isRegister = false) =>
    isRegister
        ? apiqayl('/register', 'POST', { name: anun, email: elpost, phone: heraxos, password: parol })
        : apiqayl('/login', 'POST', { email: elpost, password: parol });

from flask import (
    Flask, render_template_string, request,
    redirect, url_for, session, flash
)
from markupsafe import Markup, escape
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector

app = Flask(__name__)
app.secret_key = "lunawear-classroom-secret-change-this"

# CHANGE THESE to match the MySQL account on this computer.
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Lika2009"
}


# ---------------- DATABASE ----------------

def get_connection():
    return mysql.connector.connect(
        **DB_CONFIG,
        database="lunawear"
    )


def initialize_database():
    # Create the database if it doesn't exist yet.
    connection = mysql.connector.connect(**DB_CONFIG)
    cursor = connection.cursor()
    cursor.execute(
        "CREATE DATABASE IF NOT EXISTS lunawear "
        "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    )
    cursor.close()
    connection.close()

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            category VARCHAR(80) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image_url VARCHAR(500),
            description TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            total DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            size VARCHAR(10) NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    """)

    # Add sample products only when the table is empty.
    cursor.execute("SELECT COUNT(*) FROM products")
    if cursor.fetchone()[0] == 0:
        products = [
            (
                "Classic White Shirt", "Tops", 24.99,
                "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
                "A timeless shirt for everyday outfits."
            ),
            (
                "Casual Denim Jacket", "Outerwear", 49.99,
                "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
                "A versatile jacket for casual looks."
            ),
            (
                "Everyday Jeans", "Bottoms", 39.99,
                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
                "Comfortable denim for your daily wardrobe."
            ),
            (
                "Elegant Summer Dress", "Dresses", 44.99,
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
                "A lovely dress for warm days and special occasions."
            ),
            (
                "Cozy Knit Sweater", "Tops", 34.99,
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
                "A soft sweater for cooler weather."
            ),
            (
                "Minimalist Handbag", "Accessories", 29.99,
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
                "A simple accessory for any outfit."
            )
        ]

        cursor.executemany("""
            INSERT INTO products
            (name, category, price, image_url, description)
            VALUES (%s, %s, %s, %s, %s)
        """, products)

    connection.commit()
    cursor.close()
    connection.close()


def query_database(sql, values=(), one=False):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute(sql, values)
    result = cursor.fetchone() if one else cursor.fetchall()
    cursor.close()
    connection.close()
    return result


# ---------------- HTML DESIGN ----------------

BASE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ title }} | LunaWear</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #fffaf7;
            color: #332b2b;
            font-family: 'Inter', sans-serif;
        }
        header {
            padding: 22px 7%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
            background: white;
            border-bottom: 1px solid #f0e5e0;
        }
        .logo {
            font: 600 30px 'Playfair Display', serif;
            color: #a65d68;
            text-decoration: none;
        }
        nav { display: flex; gap: 18px; flex-wrap: wrap; }
        nav a { color: #493e3e; text-decoration: none; font-size: 14px; }
        nav a:hover { color: #b66e7b; }
        main { min-height: 70vh; padding: 38px 7%; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        h1 { font-size: clamp(30px, 5vw, 46px); }
        .hero {
            padding: 65px 35px;
            border-radius: 16px;
            background: #f3e2df;
            text-align: center;
        }
        .hero p { line-height: 1.8; }
        .btn {
            display: inline-block;
            padding: 12px 22px;
            border: 0;
            border-radius: 5px;
            background: #a65d68;
            color: white;
            text-decoration: none;
            cursor: pointer;
            font-size: 14px;
        }
        .btn:hover { background: #884752; }
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 25px;
            margin-top: 28px;
        }
        .product {
            background: white;
            border: 1px solid #f0e5e0;
            border-radius: 10px;
            overflow: hidden;
            padding-bottom: 18px;
        }
        .product img {
            width: 100%;
            height: 260px;
            object-fit: cover;
            background: #f3e2df;
        }
        .product-info { padding: 0 16px; }
        .product h3 { margin-bottom: 8px; }
        .price { font-weight: 600; color: #a65d68; }
        .category { color: #827373; font-size: 12px; }
        .form-box {
            max-width: 480px;
            margin: 0 auto;
            padding: 30px;
            background: white;
            border: 1px solid #f0e5e0;
            border-radius: 12px;
        }
        input, select {
            display: block;
            width: 100%;
            margin: 9px 0 18px;
            padding: 12px;
            border: 1px solid #e3d6d1;
            border-radius: 5px;
            background: white;
        }
        label { font-size: 14px; }
        .notice {
            padding: 12px;
            background: #f3e2df;
            border-radius: 6px;
            margin-bottom: 15px;
        }
        .cart-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
            padding: 18px 0;
            border-bottom: 1px solid #eee0dc;
        }
        footer {
            padding: 28px;
            text-align: center;
            color: #827373;
            background: white;
            border-top: 1px solid #f0e5e0;
            font-size: 13px;
        }
    </style>
</head>
<body>
<header>
    <a class="logo" href="/">LunaWear</a>
    <nav>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/cart">Cart ({{ cart_count }})</a>
        {% if session.get('user_id') %}
            <a href="/orders">My orders</a>
            <a href="/logout">Logout</a>
        {% else %}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {% endif %}
    </nav>
</header>
<main>
    {% for message in messages %}
        <div class="notice">{{ message }}</div>
    {% endfor %}
    {{ content }}
</main>
<footer>LunaWear — Find your everyday style.</footer>
</body>
</html>
"""


def page(title, content):
    return render_template_string(
        BASE,
        title=title,
        content=Markup(content),
        cart_count=sum(session.get("cart", {}).values()),
        messages=[str(escape(m)) for m in session.pop("_flashes", [])]
    )


def product_card(product):
    return f"""
    <article class="product">
        <a href="/product/{product['id']}">
            <img src="{escape(product['image_url'] or '')}"
                 alt="{escape(product['name'])}"
                 onerror="this.style.display='none'">
        </a>
        <div class="product-info">
            <p class="category">{escape(product['category'])}</p>
            <h3>{escape(product['name'])}</h3>
            <p class="price">${float(product['price']):.2f}</p>
            <a class="btn" href="/product/{product['id']}">View product</a>
        </div>
    </article>
    """


# ---------------- HOME AND SHOP ----------------

@app.route("/")
def home():
    products = query_database(
        "SELECT * FROM products ORDER BY id DESC LIMIT 4"
    )
    cards = "".join(product_card(p) for p in products)

    return page("Home", f"""
        <section class="hero">
            <h1>Discover Your Style</h1>
            <p>Timeless pieces. Everyday confidence.</p>
            <p>Find something you'll love at LunaWear.</p>
            <a class="btn" href="/shop">Explore the collection</a>
        </section>
        <h2>Featured Pieces</h2>
        <section class="products">{cards}</section>
    """)


@app.route("/shop")
def shop():
    category = request.args.get("category", "").strip()

    if category:
        products = query_database(
            "SELECT * FROM products WHERE category = %s ORDER BY id",
            (category,)
        )
    else:
        products = query_database("SELECT * FROM products ORDER BY id")

    categories = query_database(
        "SELECT DISTINCT category FROM products ORDER BY category"
    )

    options = '<option value="">All categories</option>'
    for item in categories:
        selected = "selected" if item["category"] == category else ""
        options += (
            f'<option value="{escape(item["category"])}" {selected}>'
            f'{escape(item["category"])}</option>'
        )

    cards = "".join(product_card(p) for p in products)

    return page("Shop", f"""
        <h1>Our Collection</h1>
        <form action="/shop" method="get">
            <label for="category">Filter by category</label>
            <select name="category" id="category"
                    onchange="this.form.submit()">{options}</select>
        </form>
        <section class="products">{cards}</section>
    """)


@app.route("/product/<int:product_id>")
def product_detail(product_id):
    product = query_database(
        "SELECT * FROM products WHERE id = %s",
        (product_id,), one=True
    )

    if not product:
        return page("Not found", "<h1>Product not found</h1>"), 404

    return page(product["name"], f"""
        <div style="max-width:700px;margin:auto">
            <img src="{escape(product['image_url'] or '')}"
                 alt="{escape(product['name'])}"
                 style="width:100%;max-height:450px;object-fit:cover"
                 onerror="this.style.display='none'">
            <p class="category">{escape(product['category'])}</p>
            <h1>{escape(product['name'])}</h1>
            <p class="price">${float(product['price']):.2f}</p>
            <p>{escape(product['description'] or '')}</p>
            <form action="/add-to-cart/{product_id}" method="post">
                <label for="size">Choose size</label>
                <select name="size" id="size">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M" selected>M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="One Size">One Size</option>
                </select>
                <button class="btn" type="submit">Add to cart</button>
            </form>
        </div>
    """)


# ---------------- SHOPPING CART ----------------

@app.route("/add-to-cart/<int:product_id>", methods=["POST"])
def add_to_cart(product_id):
    product = query_database(
        "SELECT id FROM products WHERE id = %s",
        (product_id,), one=True
    )

    if not product:
        flash("Product not found.")
        return redirect(url_for("shop"))

    cart = session.get("cart", {})
    key = str(product_id)
    cart[key] = min(cart.get(key, 0) + 1, 20)
    session["cart"] = cart

    # Store the chosen size for this item.
    sizes = session.get("sizes", {})
    sizes[key] = request.form.get("size", "M")
    session["sizes"] = sizes

    flash("Added to your cart!")
    return redirect(url_for("cart"))


@app.route("/cart")
def cart():
    cart_items = session.get("cart", {})
    sizes = session.get("sizes", {})
    rows = []
    total = 0

    for product_id, quantity in cart_items.items():
        product = query_database(
            "SELECT * FROM products WHERE id = %s",
            (int(product_id),), one=True
        )
        if product:
            subtotal = float(product["price"]) * quantity
            total += subtotal
            rows.append(f"""
                <div class="cart-row">
                    <div>
                        <strong>{escape(product['name'])}</strong><br>
                        Size: {escape(sizes.get(product_id, 'M'))}<br>
                        Quantity: {quantity}<br>
                        ${float(product['price']):.2f} each
                    </div>
                    <div>
                        <strong>${subtotal:.2f}</strong><br><br>
                        <form action="/remove-from-cart/{int(product_id)}"
                              method="post">
                            <button class="btn" type="submit">Remove</button>
                        </form>
                    </div>
                </div>
            """)

    if not rows:
        return page("Cart", """
            <h1>Your Shopping Cart</h1>
            <p>Your cart is empty.</p>
            <a class="btn" href="/shop">Continue shopping</a>
        """)

    checkout = (
        '<a class="btn" href="/checkout">Proceed to checkout</a>'
        if session.get("user_id")
        else '<a class="btn" href="/login">Login to checkout</a>'
    )

    return page("Cart", f"""
        <h1>Your Shopping Cart</h1>
        {''.join(rows)}
        <h2>Total: ${total:.2f}</h2>
        {checkout}
        <a href="/shop">Continue shopping</a>
    """)


@app.route("/remove-from-cart/<int:product_id>", methods=["POST"])
def remove_from_cart(product_id):
    cart = session.get("cart", {})
    cart.pop(str(product_id), None)
    session["cart"] = cart

    sizes = session.get("sizes", {})
    sizes.pop(str(product_id), None)
    session["sizes"] = sizes

    flash("Item removed.")
    return redirect(url_for("cart"))


# ---------------- REGISTRATION AND LOGIN ----------------

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not name or not email or len(password) < 8:
            flash("Enter your name and email, and use a password of at least 8 characters.")
            return redirect(url_for("register"))

        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute("""
                INSERT INTO users (name, email, password_hash)
                VALUES (%s, %s, %s)
            """, (name, email, generate_password_hash(password)))
            connection.commit()
            cursor.close()
            connection.close()

            flash("Account created! Please log in.")
            return redirect(url_for("login"))

        except mysql.connector.IntegrityError:
            flash("That email is already registered.")
            return redirect(url_for("register"))

    return page("Register", """
        <div class="form-box">
            <h1>Create Account</h1>
            <form method="post">
                <label>Name</label>
                <input name="name" required maxlength="100">
                <label>Email</label>
                <input type="email" name="email" required maxlength="150">
                <label>Password (at least 8 characters)</label>
                <input type="password" name="password"
                       minlength="8" required>
                <button class="btn" type="submit">Register</button>
            </form>
            <p>Already registered? <a href="/login">Log in</a></p>
        </div>
    """)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        user = query_database(
            "SELECT * FROM users WHERE email = %s",
            (email,), one=True
        )

        if user and check_password_hash(user["password_hash"], password):
            session.clear()
            session["user_id"] = user["id"]
            session["user_name"] = user["name"]
            session["cart"] = {}
            session["sizes"] = {}
            flash("Welcome back!")
            return redirect(url_for("home"))

        flash("Incorrect email or password.")
        return redirect(url_for("login"))

    return page("Login", """
        <div class="form-box">
            <h1>Welcome Back</h1>
            <form method="post">
                <label>Email</label>
                <input type="email" name="email" required>
                <label>Password</label>
                <input type="password" name="password" required>
                <button class="btn" type="submit">Login</button>
            </form>
            <p>New here? <a href="/register">Create an account</a></p>
        </div>
    """)


@app.route("/logout")
def logout():
    session.clear()
    flash("You have logged out.")
    return redirect(url_for("home"))


# ---------------- CHECKOUT AND ORDERS ----------------

@app.route("/checkout", methods=["GET", "POST"])
def checkout():
    if not session.get("user_id"):
        return redirect(url_for("login"))

    cart_items = session.get("cart", {})
    if not cart_items:
        flash("Your cart is empty.")
        return redirect(url_for("shop"))

    items = []
    total = 0

    for product_id, quantity in cart_items.items():
        product = query_database(
            "SELECT * FROM products WHERE id = %s",
            (int(product_id),), one=True
        )
        if product:
            price = float(product["price"])
            total += price * quantity
            items.append((product, quantity, price))

    if request.method == "POST":
        connection = get_connection()
        cursor = connection.cursor()

        try:
            cursor.execute("""
                INSERT INTO orders (user_id, total)
                VALUES (%s, %s)
            """, (session["user_id"], total))
            order_id = cursor.lastrowid

            for product, quantity, price in items:
                cursor.execute("""
                    INSERT INTO order_items
                    (order_id, product_id, quantity, price, size)
                    VALUES (%s, %s, %s, %s, %s)
                """, (
                    order_id,
                    product["id"],
                    quantity,
                    price,
                    session.get("sizes", {}).get(str(product["id"]), "M")
                ))

            connection.commit()

        except Exception:
            connection.rollback()
            raise
        finally:
            cursor.close()
            connection.close()

        session["cart"] = {}
        session["sizes"] = {}
        flash(f"Order #{order_id} placed successfully!")
        return redirect(url_for("orders"))

    return page("Checkout", f"""
        <h1>Checkout</h1>
        <p>Signed in as {escape(session.get('user_name', 'Customer'))}</p>
        <h2>Total: ${total:.2f}</h2>
        <p>This demo records your order; it does not take payment.</p>
        <form method="post">
            <button class="btn" type="submit">Place order</button>
        </form>
    """)


@app.route("/orders")
def orders():
    if not session.get("user_id"):
        return redirect(url_for("login"))

    user_orders = query_database("""
        SELECT id, total, created_at
        FROM orders
        WHERE user_id = %s
        ORDER BY id DESC
    """, (session["user_id"],))

    if not user_orders:
        return page("My Orders", """
            <h1>My Orders</h1>
            <p>You haven't placed any orders yet.</p>
            <a class="btn" href="/shop">Browse the shop</a>
        """)

    rows = ""
    for order in user_orders:
        rows += f"""
            <div class="cart-row">
                <div>
                    <strong>Order #{order['id']}</strong><br>
                    {escape(str(order['created_at']))}
                </div>
                <strong>${float(order['total']):.2f}</strong>
            </div>
        """

    return page("My Orders", f"<h1>My Orders</h1>{rows}")


# ---------------- RUN THE WEBSITE ----------------

if __name__ == "__main__":
    initialize_database()
    print("LunaWear is ready!")
    app.run(debug=True)

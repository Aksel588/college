import os
from functools import wraps
from datetime import date

import mysql.connector
from mysql.connector import Error
from flask import (
    Flask, render_template, request, redirect, url_for,
    flash, session, abort
)
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "change-this-for-local-development")

# Set MYSQL_USER and MYSQL_PASSWORD in your environment before running.
DB_CONFIG = {
    "host": os.environ.get("MYSQL_HOST", "localhost"),
    "user": os.environ.get("MYSQL_USER", "root"),
    "password": os.environ.get("MYSQL_PASSWORD", ""),
    "database": "dreamtrip",
}


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def query_db(sql, params=(), one=False, commit=False):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(sql, params)
        if commit:
            connection.commit()
            return cursor.lastrowid
        return cursor.fetchone() if one else cursor.fetchall()
    finally:
        cursor.close()
        connection.close()


def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in to continue.", "info")
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped_view


def initialize_database():
    """Create tables and add example destinations if the table is empty."""
    connection = get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS destinations (
                destination_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                image_url VARCHAR(500)
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                booking_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                destination_id INT NOT NULL,
                travel_date DATE NOT NULL,
                travelers INT NOT NULL DEFAULT 1,
                status VARCHAR(30) NOT NULL DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                FOREIGN KEY (destination_id)
                    REFERENCES destinations(destination_id)
            )
        """)
        connection.commit()

        cursor.execute("SELECT COUNT(*) FROM destinations")
        count = cursor.fetchone()[0]
        if count == 0:
            sample_destinations = [
                ("Santorini Escape", "Greece",
                 "Whitewashed villages, blue-domed churches, and unforgettable sunsets over the Aegean Sea.",
                 1299.00, "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=85"),
                ("Maldives Retreat", "Maldives",
                 "Turquoise waters, soft white beaches, and peaceful island days in a tropical paradise.",
                 2499.00, "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85"),
                ("Amalfi Coast", "Italy",
                 "Discover colorful coastal villages, Mediterranean cuisine, and spectacular sea views.",
                 1799.00, "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1200&q=85"),
                ("Paris Getaway", "France",
                 "Romantic streets, beautiful architecture, art, and unforgettable French cafés.",
                 999.00, "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"),
                ("Kyoto Serenity", "Japan",
                 "Explore peaceful gardens, traditional streets, and timeless cultural landmarks.",
                 1599.00, "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"),
                ("Swiss Alpine Escape", "Switzerland",
                 "Mountain villages, clear lakes, scenic trains, and breathtaking Alpine landscapes.",
                 1899.00, "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85"),
            ]
            cursor.executemany("""
                INSERT INTO destinations (name, country, description, price, image_url)
                VALUES (%s, %s, %s, %s, %s)
            """, sample_destinations)
            connection.commit()
    finally:
        cursor.close()
        connection.close()


@app.context_processor
def inject_template_values():
    return {"today": date.today().isoformat()}


@app.route("/")
def home():
    destinations = query_db(
        "SELECT * FROM destinations ORDER BY destination_id LIMIT 3"
    )
    return render_template("index.html", destinations=destinations)


@app.route("/destinations")
def destinations():
    search = request.args.get("q", "").strip()
    if search:
        term = f"%{search}%"
        items = query_db("""
            SELECT * FROM destinations
            WHERE name LIKE %s OR country LIKE %s
            ORDER BY name
        """, (term, term))
    else:
        items = query_db("SELECT * FROM destinations ORDER BY name")
    return render_template("destinations.html", destinations=items, search=search)


@app.route("/destinations/<int:destination_id>")
def destination_detail(destination_id):
    destination = query_db(
        "SELECT * FROM destinations WHERE destination_id = %s",
        (destination_id,), one=True
    )
    if not destination:
        abort(404)
    return render_template("destination_detail.html", destination=destination)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        full_name = request.form.get("full_name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not full_name or not email or not password:
            flash("Please complete every field.", "error")
        elif len(password) < 8:
            flash("Your password must be at least 8 characters long.", "error")
        else:
            try:
                query_db("""
                    INSERT INTO users (full_name, email, password_hash)
                    VALUES (%s, %s, %s)
                """, (full_name, email, generate_password_hash(password)), commit=True)
                flash("Your account is ready. You can now log in.", "success")
                return redirect(url_for("login"))
            except Error as exc:
                if getattr(exc, "errno", None) == 1062:
                    flash("An account with that email already exists.", "error")
                else:
                    app.logger.exception("Registration failed")
                    flash("We couldn't create your account. Check the database connection.", "error")

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        user = query_db(
            "SELECT * FROM users WHERE email = %s", (email,), one=True
        )

        if user and check_password_hash(user["password_hash"], password):
            session.clear()
            session["user_id"] = user["user_id"]
            session["full_name"] = user["full_name"]
            flash(f"Welcome back, {user['full_name']}!", "success")
            return redirect(url_for("home"))

        flash("Email or password is incorrect.", "error")

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    flash("You have logged out.", "info")
    return redirect(url_for("home"))


@app.route("/book/<int:destination_id>", methods=["POST"])
@login_required
def book_destination(destination_id):
    destination = query_db(
        "SELECT * FROM destinations WHERE destination_id = %s",
        (destination_id,), one=True
    )
    if not destination:
        abort(404)

    travel_date = request.form.get("travel_date", "")
    travelers_text = request.form.get("travelers", "1")

    try:
        parsed_date = date.fromisoformat(travel_date)
        travelers = int(travelers_text)
        if parsed_date < date.today():
            raise ValueError
        if not 1 <= travelers <= 20:
            raise ValueError
    except (ValueError, TypeError):
        flash("Choose a valid future date and between 1 and 20 travelers.", "error")
        return redirect(url_for("destination_detail", destination_id=destination_id))

    query_db("""
        INSERT INTO bookings (user_id, destination_id, travel_date, travelers)
        VALUES (%s, %s, %s, %s)
    """, (session["user_id"], destination_id, parsed_date.isoformat(), travelers),
        commit=True)

    flash("Your trip request has been submitted!", "success")
    return redirect(url_for("my_bookings"))


@app.route("/my-bookings")
@login_required
def my_bookings():
    bookings = query_db("""
        SELECT b.booking_id, b.travel_date, b.travelers, b.status, b.created_at,
               d.name AS destination_name, d.country, d.price, d.image_url
        FROM bookings b
        JOIN destinations d ON d.destination_id = b.destination_id
        WHERE b.user_id = %s
        ORDER BY b.created_at DESC
    """, (session["user_id"],))
    return render_template("bookings.html", bookings=bookings)


@app.errorhandler(404)
def not_found(_error):
    return render_template("base.html", page_title="Page not found",
                           error_message="We couldn't find that page."), 404


if __name__ == "__main__":
    try:
        initialize_database()
        print("DreamTrip database is ready.")
    except Error:
        app.logger.exception(
            "Could not connect to MySQL. Check that MySQL is running, "
            "the 'dreamtrip' database exists, and MYSQL_USER/MYSQL_PASSWORD are set."
        )
        raise

    app.run(debug=True)

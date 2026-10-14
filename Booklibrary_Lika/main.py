from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from mysql.connector import Error
from functools import wraps

app = Flask(__name__)
app.secret_key = "book-archive-local-key-change-later"

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Lika2009",
    "database": "booknest_db"
}

READING_STATUSES = ["Want to Read", "Reading", "Finished"]


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def login_required(route_function):
    @wraps(route_function)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in first.", "error")
            return redirect(url_for("login"))
        return route_function(*args, **kwargs)
    return wrapper


@app.route("/")
def start():
    if "user_id" in session:
        return redirect(url_for("home"))
    return redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        if not username or not email or not password:
            flash("Please fill in all fields.", "error")
            return redirect(url_for("register"))

        if len(password) < 8:
            flash("Password must be at least 8 characters.", "error")
            return redirect(url_for("register"))

        connection = None
        cursor = None

        try:
            connection = get_connection()
            cursor = connection.cursor()

            password_hash = generate_password_hash(password)

            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash)
                VALUES (%s, %s, %s)
                """,
                (username, email, password_hash)
            )

            connection.commit()
            user_id = cursor.lastrowid

            session["user_id"] = user_id
            session["username"] = username

            flash("Welcome to BookNest!", "success")
            return redirect(url_for("home"))

        except Error as error:
            if connection and connection.is_connected():
                connection.rollback()

            if getattr(error, "errno", None) == 1062:
                flash("That username or email is already registered.", "error")
            else:
                print("Registration error:", error)
                flash("Registration failed. Check your database connection.", "error")

            return redirect(url_for("register"))

        finally:
            if cursor:
                cursor.close()
            if connection and connection.is_connected():
                connection.close()

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if "user_id" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        connection = None
        cursor = None

        try:
            connection = get_connection()
            cursor = connection.cursor(dictionary=True)

            cursor.execute(
                """
                SELECT user_id, username, password_hash
                FROM users
                WHERE username = %s
                """,
                (username,)
            )

            user = cursor.fetchone()

            if user and check_password_hash(user["password_hash"], password):
                session["user_id"] = user["user_id"]
                session["username"] = user["username"]
                flash("Welcome back!", "success")
                return redirect(url_for("home"))

            flash("Incorrect username or password.", "error")
            return redirect(url_for("login"))

        except Error as error:
            print("Login error:", error)
            flash("Could not connect to the database.", "error")
            return redirect(url_for("login"))

        finally:
            if cursor:
                cursor.close()
            if connection and connection.is_connected():
                connection.close()

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    flash("You have logged out.", "success")
    return redirect(url_for("login"))


@app.route("/books")
@login_required
def home():
    search = request.args.get("q", "").strip()
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        sql = """
            SELECT b.id, b.title, b.author, b.genre,
                   ub.reading_status,
                   (ub.book_id IS NOT NULL) AS in_list
            FROM books b
            LEFT JOIN user_books ub
                ON ub.book_id = b.id
                AND ub.user_id = %s
        """
        params = [session["user_id"]]

        if search:
            sql += " WHERE b.title LIKE %s OR b.author LIKE %s"
            params.extend([f"%{search}%", f"%{search}%"])

        sql += " ORDER BY b.id"

        cursor.execute(sql, tuple(params))
        books = cursor.fetchall()

        return render_template(
            "index.html",
            books=books,
            search=search,
            statuses=READING_STATUSES,
            username=session.get("username")
        )

    except Error as error:
        print("Books error:", error)
        flash("Could not load books. Check your database.", "error")
        return render_template(
            "index.html",
            books=[],
            search=search,
            statuses=READING_STATUSES,
            username=session.get("username")
        )

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


@app.route("/add", methods=["POST"])
@login_required
def add_book():
    title = request.form.get("title", "").strip()
    author = request.form.get("author", "").strip()
    genre = request.form.get("genre", "").strip()
    status = request.form.get("reading_status", "Want to Read")

    if not title or not author:
        flash("Please enter both a title and an author.", "error")
        return redirect(url_for("home"))

    if status not in READING_STATUSES:
        status = "Want to Read"

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO books (title, author, genre)
            VALUES (%s, %s, %s)
            """,
            (title, author, genre or None)
        )

        book_id = cursor.lastrowid

        cursor.execute(
            """
            INSERT INTO user_books (user_id, book_id, reading_status)
            VALUES (%s, %s, %s)
            """,
            (session["user_id"], book_id, status)
        )

        connection.commit()
        flash("Book added to your reading list!", "success")

    except Error as error:
        if connection and connection.is_connected():
            connection.rollback()
        print("Add book error:", error)
        flash("Could not add the book.", "error")

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

    return redirect(url_for("home"))


@app.route("/add-to-list/<int:book_id>", methods=["POST"])
@login_required
def add_to_list(book_id):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT IGNORE INTO user_books (user_id, book_id, reading_status)
            SELECT %s, id, 'Want to Read'
            FROM books WHERE id = %s
            """,
            (session["user_id"], book_id)
        )

        connection.commit()

        if cursor.rowcount:
            flash("Book added to your reading list!", "success")
        else:
            flash("That book is already in your list or does not exist.", "error")

    except Error as error:
        if connection and connection.is_connected():
            connection.rollback()
        print("Add to list error:", error)
        flash("Could not add this book.", "error")

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

    return redirect(url_for("home"))


@app.route("/update/<int:book_id>", methods=["POST"])
@login_required
def update_book(book_id):
    status = request.form.get("reading_status", "")

    if status not in READING_STATUSES:
        flash("Please choose a valid reading status.", "error")
        return redirect(url_for("home"))

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            UPDATE user_books
            SET reading_status = %s
            WHERE user_id = %s AND book_id = %s
            """,
            (status, session["user_id"], book_id)
        )

        connection.commit()
        flash("Reading status updated!", "success")

    except Error as error:
        if connection and connection.is_connected():
            connection.rollback()
        print("Update error:", error)
        flash("Could not update the reading status.", "error")

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

    return redirect(url_for("home"))


@app.route("/delete/<int:book_id>", methods=["POST"])
@login_required
def delete_book(book_id):
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            DELETE FROM user_books
            WHERE user_id = %s AND book_id = %s
            """,
            (session["user_id"], book_id)
        )

        connection.commit()
        flash("Book removed from your reading list.", "success")

    except Error as error:
        if connection and connection.is_connected():
            connection.rollback()
        print("Delete error:", error)
        flash("Could not remove the book.", "error")

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True)
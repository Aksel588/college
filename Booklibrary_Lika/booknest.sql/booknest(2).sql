USE booknest_db;

CREATE TABLE IF NOT EXISTS user_books (
    user_book_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    reading_status VARCHAR(30) DEFAULT 'Want to Read',

    UNIQUE (user_id, book_id),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE
);

SHOW TABLES;
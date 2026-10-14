USE booknest_db;

INSERT IGNORE INTO genres (genre_name) VALUES
('Fantasy'), ('Romance'), ('Mystery'),
('Science Fiction'), ('Classic'), ('Thriller'),
('Young Adult');

INSERT INTO books (title, author, genre)
SELECT v.title, v.author, v.genre
FROM (
    SELECT 'The Hobbit' AS title, 'J.R.R. Tolkien' AS author, 'Fantasy' AS genre
    UNION ALL SELECT 'Pride and Prejudice', 'Jane Austen', 'Romance'
    UNION ALL SELECT 'The Silent Patient', 'Alex Michaelides', 'Thriller'
    UNION ALL SELECT '1984', 'George Orwell', 'Science Fiction'
    UNION ALL SELECT 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic'
    UNION ALL SELECT 'Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'Fantasy'
    UNION ALL SELECT 'The Hunger Games', 'Suzanne Collins', 'Young Adult'
    UNION ALL SELECT 'Murder on the Orient Express', 'Agatha Christie', 'Mystery'
    UNION ALL SELECT 'The Fault in Our Stars', 'John Green', 'Romance'
    UNION ALL SELECT 'Dune', 'Frank Herbert', 'Science Fiction'
) AS v
WHERE NOT EXISTS (
    SELECT 1 FROM books b
    WHERE b.title = v.title AND b.author = v.author
);

SELECT * FROM books;

CREATE DATABASE dreamtrip;

USE dreamtrip;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500)
);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    travel_date DATE NOT NULL,
    travelers INT NOT NULL DEFAULT 1,
    status VARCHAR(30) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
);

USE dreamtrip;

INSERT INTO destinations
(name, country, description, price, image_url)
VALUES
(
    'Santorini Escape',
    'Greece',
    'Whitewashed villages, blue domes, and beautiful sunsets over the Aegean Sea.',
    1299.00,
    'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e'
),
(
    'Maldives Retreat',
    'Maldives',
    'A peaceful island escape with turquoise waters and luxurious resorts.',
    2499.00,
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8'
),
(
    'Amalfi Coast',
    'Italy',
    'Discover coastal villages, Mediterranean cuisine, and breathtaking sea views.',
    1799.00,
    'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7'
),
(
    'Paris Getaway',
    'France',
    'Experience charming streets, world-famous landmarks, and French cafés.',
    999.00,
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
);
SELECT * FROM destinations;
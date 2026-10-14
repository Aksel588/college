
-- Create a separate database for LunaWear
CREATE DATABASE IF NOT EXISTS lunawear;

USE lunawear;


-- 1. Customers
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 2. Clothing products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(80) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. Customer orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);


-- 4. Items belonging to each order
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    size VARCHAR(10) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id),

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);


-- 5. Insert sample clothing products
INSERT INTO products
    (name, category, price, image_url, description)
SELECT
    'Classic White Shirt',
    'Tops',
    24.99,
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    'A timeless shirt for everyday outfits.'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Classic White Shirt'
);

INSERT INTO products
    (name, category, price, image_url, description)
SELECT
    'Denim Jacket',
    'Outerwear',
    49.99,
    'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
    'A versatile jacket for casual looks.'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Denim Jacket'
);

INSERT INTO products
    (name, category, price, image_url, description)
SELECT
    'Everyday Jeans',
    'Bottoms',
    39.99,
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    'Comfortable denim for everyday wear.'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Everyday Jeans'
);

INSERT INTO products
    (name, category, price, image_url, description)
SELECT
    'Summer Dress',
    'Dresses',
    44.99,
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
    'An elegant dress for warm days.'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Summer Dress'
);

INSERT INTO products
    (name, category, price, image_url, description)
SELECT
    'Cozy Knit Sweater',
    'Tops',
    34.99,
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    'A cozy sweater for cooler days.'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Cozy Knit Sweater'
);

INSERT INTO products
    (name, category, price, image_url, description)
SELECT
    'Minimalist Handbag',
    'Accessories',
    29.99,
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    'A minimalist accessory for any outfit.'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Minimalist Handbag'
);


-- 6. Check that everything was created
SHOW TABLES;

SELECT * FROM products;

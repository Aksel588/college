CREATE DATABASE IF NOT EXISTS fashion_shop
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE fashion_shop;

CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    category ENUM('women', 'men', 'accessories')
        NOT NULL DEFAULT 'women',
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2) DEFAULT NULL,
    image VARCHAR(500) NOT NULL,
    colors JSON,
    sizes JSON,
    is_new TINYINT(1) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    stock INT UNSIGNED NOT NULL DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    email VARCHAR(190) DEFAULT NULL,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    note TEXT,
    payment_method ENUM('cash_on_delivery')
        NOT NULL DEFAULT 'cash_on_delivery',
    total DECIMAL(12,2) NOT NULL,
    status ENUM(
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    product_name VARCHAR(180) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id),

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
) ENGINE=InnoDB;

INSERT INTO products
(name, category, description, price, old_price,
 image, colors, sizes, is_new, stock)
VALUES
(
    'The Essential Blazer',
    'women',
    'Elegant tailored blazer with a relaxed silhouette.',
    24900,
    29900,
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
    '["Black","Beige"]',
    '["XS","S","M","L"]',
    1,
    30
),
(
    'Classic White Shirt',
    'women',
    'A timeless wardrobe essential.',
    12900,
    NULL,
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85',
    '["White","Blue"]',
    '["XS","S","M","L","XL"]',
    1,
    45
),
(
    'Minimal Knit Sweater',
    'women',
    'Soft knitwear for everyday styling.',
    16900,
    NULL,
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
    '["Cream","Black"]',
    '["S","M","L"]',
    0,
    25
),
(
    'Everyday Denim',
    'men',
    'Modern straight-leg denim.',
    18900,
    21900,
    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85',
    '["Blue","Black"]',
    '["S","M","L","XL"]',
    0,
    35
),
(
    'Structured Tote Bag',
    'accessories',
    'A refined everyday bag with a minimalist design.',
    19900,
    NULL,
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85',
    '["Black","Beige"]',
    '["ONE SIZE"]',
    1,
    20
),
(
    'Relaxed Linen Shirt',
    'men',
    'Relaxed styling for everyday wear.',
    14500,
    NULL,
    'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85',
    '["White","Beige"]',
    '["S","M","L","XL"]',
    1,
    30
);
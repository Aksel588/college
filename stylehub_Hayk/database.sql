CREATE DATABASE IF NOT EXISTS stylehub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stylehub;

CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(80) NOT NULL,
    gender VARCHAR(30) NOT NULL DEFAULT 'Unisex',
    size VARCHAR(30) NOT NULL DEFAULT 'M',
    color VARCHAR(50) NOT NULL DEFAULT 'Սև',
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(1000) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_stock (stock)
) ENGINE=InnoDB;

INSERT INTO products (name, category, gender, size, color, price, stock, image_url, description) VALUES
('Oversize Hoodie', 'Հուդի', 'Տղամարդու', 'L', 'Սև', 12500, 8, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80', 'Հարմարավետ ամենօրյա հուդի։'),
('Basic T-Shirt', 'Շապիկ', 'Unisex', 'M', 'Սպիտակ', 5500, 15, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', 'Դասական բամբակյա շապիկ։'),
('Classic Jacket', 'Բաճկոն', 'Տղամարդու', 'L', 'Մոխրագույն', 22000, 3, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80', 'Ժամանակակից ոճի բաճկոն։'),
('Summer Dress', 'Զգեստ', 'Կանացի', 'S', 'Բեժ', 16000, 0, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80', 'Թեթև ամառային զգեստ։'),
('Everyday Jeans', 'Տաբատ', 'Unisex', 'M', 'Կապույտ', 14500, 5, 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80', 'Հարմարավետ ջինսե տաբատ։');

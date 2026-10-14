
CREATE DATABASE IF NOT EXISTS cafewebsite;

USE cafewebsite;


CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500)
);


CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);


CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);


INSERT INTO menu_items
(name, description, price, category, image_url)
VALUES
(
    'Cappuccino',
    'Espresso with steamed milk and foam.',
    3.50,
    'Coffee',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80'
),
(
    'Latte',
    'Smooth espresso with creamy milk.',
    4.00,
    'Coffee',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80'
),
(
    'Espresso',
    'A rich and classic Italian coffee.',
    2.50,
    'Coffee',
    'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=80'
),
(
    'Iced Latte',
    'Cold coffee with milk and ice.',
    4.50,
    'Iced Coffee',
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80'
),
(
    'Iced Americano',
    'Cold espresso with water and ice.',
    3.50,
    'Iced Coffee',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80'
),
(
    'Chocolate Cake',
    'Soft chocolate cake with rich flavor.',
    5.00,
    'Cakes',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'
),
(
    'Cheesecake',
    'Creamy cheesecake with a biscuit base.',
    4.50,
    'Cakes',
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80'
),
(
    'Croissant',
    'Fresh pastry with a buttery texture.',
    2.80,
    'Cakes',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80'
),
(
    'Mocha',
    'Espresso with chocolate and steamed milk.',
    4.20,
    'Coffee',
    'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80'
);


SELECT * FROM menu_items;

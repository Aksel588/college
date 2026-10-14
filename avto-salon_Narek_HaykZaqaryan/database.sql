CREATE DATABASE IF NOT EXISTS avto_salon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE avto_salon;

CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(80) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year SMALLINT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    mileage INT NOT NULL DEFAULT 0,
    fuel VARCHAR(40) NOT NULL,
    transmission VARCHAR(40) NOT NULL,
    image_url VARCHAR(500) DEFAULT '',
    status ENUM('Առկա է', 'Ամրագրված է', 'Վաճառված է') NOT NULL DEFAULT 'Առկա է',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cars (brand, model, year, price, mileage, fuel, transmission, image_url, status, description) VALUES
('BMW', '3 Series', 2022, 28500, 32000, 'Բենզին', 'Ավտոմատ', 'https://images.unsplash.com/photo-1555215695-3004980ad6b0?auto=format&fit=crop&w=1200&q=85', 'Առկա է', 'Սպորտային բնավորությամբ հարմարավետ սեդան։'),
('Mercedes-Benz', 'C-Class', 2021, 31900, 41000, 'Բենզին', 'Ավտոմատ', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85', 'Առկա է', 'Նրբագեղ դիզայն և հարմարավետ սրահ։'),
('Toyota', 'Camry', 2020, 22400, 56000, 'Բենզին', 'Ավտոմատ', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85', 'Ամրագրված է', 'Հուսալի և հարմարավետ ամենօրյա մեքենա։'),
('Tesla', 'Model 3', 2023, 29900, 18000, 'Էլեկտրական', 'Ավտոմատ', 'https://images.unsplash.com/photo-1560958089-b8a1929?auto=format&fit=crop&w=1200&q=85', 'Առկա է', 'Էլեկտրական սեդան՝ ժամանակակից տեխնոլոգիաներով։');

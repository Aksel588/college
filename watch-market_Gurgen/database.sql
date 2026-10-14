CREATE DATABASE IF NOT EXISTS watch_market CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE watch_market;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  brand VARCHAR(80) NOT NULL,
  type ENUM('Մեխանիկական','Քվարցային','Խելացի') NOT NULL DEFAULT 'Քվարցային',
  condition_label ENUM('Նոր','Օգտագործված') NOT NULL DEFAULT 'Նոր',
  gender ENUM('Տղամարդու','Կանացի','Ունիսեքս') NOT NULL DEFAULT 'Ունիսեքս',
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 1,
  image VARCHAR(255) NOT NULL DEFAULT 'watch.svg',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_brand (brand), INDEX idx_type (type), INDEX idx_price (price)
);

CREATE TABLE IF NOT EXISTS buy_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_buy_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sell_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_name VARCHAR(100) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  brand VARCHAR(80) NOT NULL,
  model VARCHAR(120) NOT NULL,
  condition_label ENUM('Նոր','Օգտագործված') NOT NULL DEFAULT 'Օգտագործված',
  desired_price DECIMAL(10,2) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name,brand,type,condition_label,gender,price,stock,image,description) VALUES
('Classic Silver','TimeCraft','Քվարցային','Նոր','Տղամարդու',28500,4,'watch-silver.svg','Մինիմալիստական արծաթագույն ժամացույց՝ ամենօրյա օգտագործման համար։'),
('Midnight Automatic','Northstar','Մեխանիկական','Նոր','Տղամարդու',89500,2,'watch-black.svg','Մեխանիկական ավտոմատ մեխանիզմ, սև թվատախտակ և մետաղական կորպուս։'),
('Rose Elegance','Luna','Քվարցային','Նոր','Կանացի',36900,5,'watch-rose.svg','Նրբագեղ վարդագույն երանգներ և բարակ դիզայն։'),
('Sport Pulse','Volt','Խելացի','Նոր','Ունիսեքս',54900,6,'watch-smart.svg','Սպորտային խելացի ժամացույց՝ ակտիվ առօրյայի համար։'),
('Vintage Gold','Heritage','Մեխանիկական','Օգտագործված','Ունիսեքս',62500,1,'watch-gold.svg','Վինտաժ ոճի ժամացույց։ Օգտագործված է, արտաքին վիճակը լավ է։'),
('Ocean Blue','TimeCraft','Քվարցային','Նոր','Տղամարդու',31900,3,'watch-blue.svg','Կապույտ թվատախտակով դասական ժամացույց։');

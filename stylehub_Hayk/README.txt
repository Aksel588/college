STYLEHUB — PHP + MySQL clothing shop (school project)

FILES
- index.php      website interface + JavaScript fetch calls
- api.php        PHP endpoints: SELECT/search/filter/sort, INSERT, DELETE
- config.php     PDO database connection
- database.sql   creates database/table and inserts sample products

RUN WITH XAMPP ON WINDOWS
1. Install/start XAMPP.
2. In XAMPP Control Panel, click Start next to Apache and MySQL.
3. Copy the entire stylehub_mysql folder to C:\xampp\htdocs\
   The final path must be C:\xampp\htdocs\stylehub_mysql\index.php
4. Open http://localhost/phpmyadmin/
5. Click Import, choose C:\xampp\htdocs\stylehub_mysql\database.sql, then click Import/Go.
6. Open http://localhost/stylehub_mysql/
7. Test search, filters, add product and delete product.

DEFAULT XAMPP DB SETTINGS in config.php:
Host: 127.0.0.1 | Database: stylehub | User: root | Password: empty
If your MySQL root account has a password, set it in config.php.

IMPORTANT
- Do not open index.php by double-clicking it or with file:///.
  Open it through http://localhost/stylehub_mysql/ so PHP can run.
- This is an educational local project. Do not publish it publicly without
  adding authentication/authorization, CSRF protection and production hardening.

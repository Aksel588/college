<?php
// XAMPP-ի սովորական կարգավորում. եթե MySQL-ի root օգտատիրոջ գաղտնաբառը փոխված է, լրացրու այն այստեղ։
$host = 'localhost';
$dbname = 'watch_market';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    exit('Տվյալների բազայի հետ կապ չկա։ Ստուգիր՝ MySQL-ը միացված է և ներմուծված է database.sql ֆայլը։');
}
function e($value) { return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }

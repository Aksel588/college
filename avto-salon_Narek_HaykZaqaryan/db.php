<?php
declare(strict_types=1);
$host = 'localhost';
$dbname = 'avto_salon';
$username = 'root';
$password = ''; // XAMPP-ի լռելյայն MySQL գաղտնաբառը հաճախ դատարկ է
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Չհաջողվեց միանալ տվյալների բազային։'], JSON_UNESCAPED_UNICODE);
    exit;
}

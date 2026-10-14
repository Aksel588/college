<?php
// XAMPP-ի ստանդարտ կարգավորումներ․ անհրաժեշտության դեպքում փոխիր։
$host = '127.0.0.1';
$dbname = 'stylehub';
$username = 'root';
$password = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'Տվյալների բազային միանալ չհաջողվեց։ Ստուգիր XAMPP-ի MySQL-ը և config.php-ի տվյալները։'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

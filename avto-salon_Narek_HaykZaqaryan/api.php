<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/db.php';
function respond(array $data, int $code = 200): never { http_response_code($code); echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }
function inputData(): array { $data = json_decode(file_get_contents('php://input'), true); return is_array($data) ? $data : []; }
$action = $_GET['action'] ?? 'list';
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'list') {
        $stmt = $pdo->query('SELECT * FROM cars ORDER BY created_at DESC, id DESC');
        respond(['cars' => $stmt->fetchAll()]);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'add') {
        $d = inputData();
        $brand = trim((string)($d['brand'] ?? '')); $model = trim((string)($d['model'] ?? ''));
        $year = filter_var($d['year'] ?? null, FILTER_VALIDATE_INT); $price = filter_var($d['price'] ?? null, FILTER_VALIDATE_FLOAT);
        $mileage = filter_var($d['mileage'] ?? 0, FILTER_VALIDATE_INT); $fuel = trim((string)($d['fuel'] ?? ''));
        $transmission = trim((string)($d['transmission'] ?? '')); $image = trim((string)($d['image_url'] ?? ''));
        $status = (string)($d['status'] ?? 'Առկա է'); $description = trim((string)($d['description'] ?? ''));
        $allowedStatus = ['Առկա է', 'Ամրագրված է', 'Վաճառված է'];
        $allowedFuel = ['Բենզին', 'Դիզել', 'Հիբրիդ', 'Էլեկտրական', 'Գազ'];
        $allowedTransmission = ['Ավտոմատ', 'Մեխանիկական', 'Վարիատոր'];
        if ($brand === '' || $model === '' || !$year || $year < 1950 || $year > ((int)date('Y') + 1) || $price === false || $price < 0 || $mileage === false || $mileage < 0 || !in_array($fuel, $allowedFuel, true) || !in_array($transmission, $allowedTransmission, true) || !in_array($status, $allowedStatus, true) || strlen($image) > 500) {
            respond(['success' => false, 'message' => 'Ստուգիր լրացված տվյալները։'], 400);
        }
        $stmt = $pdo->prepare('INSERT INTO cars (brand, model, year, price, mileage, fuel, transmission, image_url, status, description) VALUES (:brand, :model, :year, :price, :mileage, :fuel, :transmission, :image, :status, :description)');
        $stmt->execute([':brand'=>$brand, ':model'=>$model, ':year'=>$year, ':price'=>$price, ':mileage'=>$mileage, ':fuel'=>$fuel, ':transmission'=>$transmission, ':image'=>$image, ':status'=>$status, ':description'=>$description]);
        respond(['success'=>true, 'id'=>(int)$pdo->lastInsertId(), 'message'=>'Մեքենան ավելացվեց։'], 201);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'delete') {
        $d = inputData(); $id = filter_var($d['id'] ?? null, FILTER_VALIDATE_INT);
        if (!$id || $id < 1) respond(['success'=>false, 'message'=>'Սխալ ID։'], 400);
        $stmt = $pdo->prepare('DELETE FROM cars WHERE id = :id'); $stmt->execute([':id'=>$id]);
        if (!$stmt->rowCount()) respond(['success'=>false, 'message'=>'Մեքենան չի գտնվել։'], 404);
        respond(['success'=>true, 'message'=>'Մեքենան ջնջվեց։']);
    }
    respond(['success'=>false, 'message'=>'Անհայտ գործողություն։'], 404);
} catch (Throwable $e) { respond(['success'=>false, 'message'=>'Սերվերի սխալ։'], 500); }

<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/config.php';

function respond($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    $search = trim($_GET['search'] ?? '');
    $category = trim($_GET['category'] ?? '');
    $size = trim($_GET['size'] ?? '');
    $gender = trim($_GET['gender'] ?? '');
    $stockFilter = trim($_GET['stock'] ?? '');
    $maxPrice = trim($_GET['max_price'] ?? '');
    $sort = $_GET['sort'] ?? 'newest';

    $where = [];
    $params = [];

    if ($search !== '') {
        $where[] = '(name LIKE :search OR category LIKE :search OR description LIKE :search)';
        $params[':search'] = '%' . $search . '%';
    }
    if ($category !== '') {
        $where[] = 'category = :category';
        $params[':category'] = $category;
    }
    if ($size !== '') {
        $where[] = 'size = :size';
        $params[':size'] = $size;
    }
    if ($gender !== '') {
        $where[] = 'gender = :gender';
        $params[':gender'] = $gender;
    }
    if ($stockFilter === 'available') {
        $where[] = 'stock > 3';
    } elseif ($stockFilter === 'limited') {
        $where[] = 'stock BETWEEN 1 AND 3';
    } elseif ($stockFilter === 'out') {
        $where[] = 'stock = 0';
    }
    if ($maxPrice !== '' && is_numeric($maxPrice) && (float)$maxPrice >= 0) {
        $where[] = 'price <= :max_price';
        $params[':max_price'] = (float)$maxPrice;
    }

    $orderBy = 'created_at DESC';
    if ($sort === 'price_asc') $orderBy = 'price ASC';
    if ($sort === 'price_desc') $orderBy = 'price DESC';
    if ($sort === 'name') $orderBy = 'name ASC';

    $sql = 'SELECT * FROM products';
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' ORDER BY ' . $orderBy;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    respond(['success' => true, 'products' => $stmt->fetchAll()]);
}

if ($action === 'add' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $name = trim($input['name'] ?? '');
    $category = trim($input['category'] ?? '');
    $gender = trim($input['gender'] ?? 'Unisex');
    $size = trim($input['size'] ?? 'M');
    $color = trim($input['color'] ?? 'Սև');
    $price = $input['price'] ?? null;
    $stock = $input['stock'] ?? null;
    $image = trim($input['image_url'] ?? '');
    $description = trim($input['description'] ?? '');

    if ($name === '' || $category === '' || !is_numeric($price) || (float)$price <= 0 || filter_var($stock, FILTER_VALIDATE_INT) === false || (int)$stock < 0) {
        respond(['success' => false, 'message' => 'Լրացրու պարտադիր դաշտերը ճիշտ տվյալներով։ Գինը պետք է լինի 0-ից մեծ, իսկ քանակը՝ 0 կամ ավելի։'], 422);
    }

    $stmt = $pdo->prepare('INSERT INTO products (name, category, gender, size, color, price, stock, image_url, description) VALUES (:name, :category, :gender, :size, :color, :price, :stock, :image_url, :description)');
    $stmt->execute([
        ':name' => $name,
        ':category' => $category,
        ':gender' => $gender,
        ':size' => $size,
        ':color' => $color,
        ':price' => (float)$price,
        ':stock' => (int)$stock,
        ':image_url' => $image !== '' ? $image : null,
        ':description' => $description !== '' ? $description : null
    ]);
    respond(['success' => true, 'message' => 'Ապրանքը ավելացվեց։', 'id' => (int)$pdo->lastInsertId()]);
}

if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $id = filter_var($input['id'] ?? null, FILTER_VALIDATE_INT);
    if (!$id || $id < 1) respond(['success' => false, 'message' => 'Ապրանքի ID-ն սխալ է։'], 422);
    $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
    $stmt->execute([':id' => $id]);
    if ($stmt->rowCount() === 0) respond(['success' => false, 'message' => 'Այդ ID-ով ապրանք չի գտնվել։'], 404);
    respond(['success' => true, 'message' => 'Ապրանքը ջնջվեց։']);
}

respond(['success' => false, 'message' => 'Անհայտ գործողություն։'], 400);

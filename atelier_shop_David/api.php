<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

require __DIR__ . '/config.php';

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query(
        'SELECT id, name, category, description, price,
                old_price, image, colors, sizes, is_new
         FROM products
         WHERE is_active = 1 AND stock > 0
         ORDER BY id DESC'
    );

    respond(200, ['products' => $stmt->fetchAll()]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: GET, POST');
    respond(405, ['error' => 'Method not allowed.']);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    respond(400, ['error' => 'Invalid request.']);
}

$c = $data['customer'] ?? [];
$items = $data['items'] ?? [];

$name = trim((string)($c['name'] ?? ''));
$phone = trim((string)($c['phone'] ?? ''));
$email = trim((string)($c['email'] ?? ''));
$city = trim((string)($c['city'] ?? ''));
$address = trim((string)($c['address'] ?? ''));
$note = trim((string)($c['note'] ?? ''));

if (
    $name === '' || mb_strlen($name) > 150 ||
    $phone === '' || mb_strlen($phone) > 40 ||
    $city === '' || mb_strlen($city) > 100 ||
    $address === '' || mb_strlen($address) > 500
) {
    respond(422, ['error' => 'Fill in all required fields.']);
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['error' => 'Invalid email address.']);
}

if (!is_array($items) || count($items) < 1 || count($items) > 50) {
    respond(422, ['error' => 'Your cart is empty or too large.']);
}

try {
    $pdo->beginTransaction();

    $total = 0;
    $verified = [];

    $find = $pdo->prepare(
        'SELECT id, name, price, stock, colors, sizes
         FROM products
         WHERE id = ? AND is_active = 1
         FOR UPDATE'
    );

    foreach ($items as $item) {
        $id = filter_var($item['id'] ?? null, FILTER_VALIDATE_INT);
        $qty = filter_var($item['quantity'] ?? null, FILTER_VALIDATE_INT);
        $size = trim((string)($item['size'] ?? ''));
        $color = trim((string)($item['color'] ?? ''));

        if (!$id || !$qty || $qty < 1 || $qty > 20) {
            throw new DomainException('Invalid product quantity.');
        }

        $find->execute([$id]);
        $product = $find->fetch();

        if (!$product || (int)$product['stock'] < $qty) {
            throw new DomainException(
                'Product unavailable or insufficient stock.'
            );
        }

        $sizes = json_decode($product['sizes'], true) ?: [];
        $colors = json_decode($product['colors'], true) ?: [];

        if (
            !in_array($size, $sizes, true) ||
            !in_array($color, $colors, true)
        ) {
            throw new DomainException('Invalid size or color.');
        }

        $price = (float)$product['price'];
        $total += $price * $qty;

        $verified[] = [
            'id' => (int)$product['id'],
            'name' => $product['name'],
            'price' => $price,
            'quantity' => $qty,
            'size' => $size,
            'color' => $color
        ];
    }

    $stmt = $pdo->prepare(
        'INSERT INTO orders
        (customer_name, phone, email, address, city, note, total)
        VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    $stmt->execute([
        $name,
        $phone,
        $email !== '' ? $email : null,
        $address,
        $city,
        $note !== '' ? $note : null,
        $total
    ]);

    $orderId = (int)$pdo->lastInsertId();

    $insertItem = $pdo->prepare(
        'INSERT INTO order_items
        (order_id, product_id, product_name, unit_price,
         quantity, size, color)
        VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    $updateStock = $pdo->prepare(
        'UPDATE products
         SET stock = stock - ?
         WHERE id = ? AND stock >= ?'
    );

    foreach ($verified as $item) {
        $insertItem->execute([
            $orderId,
            $item['id'],
            $item['name'],
            $item['price'],
            $item['quantity'],
            $item['size'],
            $item['color']
        ]);

        $updateStock->execute([
            $item['quantity'],
            $item['id'],
            $item['quantity']
        ]);

        if ($updateStock->rowCount() !== 1) {
            throw new DomainException('Stock changed. Try again.');
        }
    }

    $pdo->commit();

    respond(201, [
        'success' => true,
        'order_id' => $orderId,
        'total' => round($total, 2),
        'message' => 'Order received successfully.'
    ]);

} catch (DomainException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    respond(422, ['error' => $e->getMessage()]);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log($e->getMessage());

    respond(500, ['error' => 'Server error. Please try again.']);
}
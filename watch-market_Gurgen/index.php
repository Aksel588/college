<?php
require __DIR__ . '/config.php';
$q = trim($_GET['q'] ?? '');
$brand = trim($_GET['brand'] ?? '');
$type = trim($_GET['type'] ?? '');
$gender = trim($_GET['gender'] ?? '');
$maxPrice = trim($_GET['max_price'] ?? '');
$sort = $_GET['sort'] ?? 'newest';
$sql = 'SELECT * FROM products WHERE stock > 0';
$params = [];
if ($q !== '') { $sql .= ' AND (name LIKE ? OR brand LIKE ? OR description LIKE ?)'; $params[]="%$q%"; $params[]="%$q%"; $params[]="%$q%"; }
if ($brand !== '') { $sql .= ' AND brand = ?'; $params[] = $brand; }
if (in_array($type, ['Մեխանիկական','Քվարցային','Խելացի'], true)) { $sql .= ' AND type = ?'; $params[] = $type; }
if (in_array($gender, ['Տղամարդու','Կանացի','Ունիսեքս'], true)) { $sql .= ' AND gender = ?'; $params[] = $gender; }
if ($maxPrice !== '' && is_numeric($maxPrice)) { $sql .= ' AND price <= ?'; $params[] = (float)$maxPrice; }
$order = ['price_asc'=>'price ASC','price_desc'=>'price DESC','name'=>'name ASC','newest'=>'created_at DESC, id DESC'];
$sql .= ' ORDER BY ' . ($order[$sort] ?? $order['newest']);
$stmt = $pdo->prepare($sql); $stmt->execute($params); $products = $stmt->fetchAll();
$brands = $pdo->query('SELECT DISTINCT brand FROM products ORDER BY brand')->fetchAll(PDO::FETCH_COLUMN);
?>
<!doctype html><html lang="hy"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ժամապահ — ժամացույցների խանութ</title><link rel="stylesheet" href="assets/style.css"></head><body>
<header class="topbar"><a class="logo" href="index.php"><span class="logo-mark">Ժ</span> ԺԱՄԱՊԱՀ</a><nav><a href="index.php">Ժամացույցներ</a><a href="sell.php" class="nav-sell">Վաճառիր քո ժամացույցը ↗</a></nav></header>
<main>
<section class="hero"><div class="hero-copy"><p class="eyebrow">ԺԱՄԱՆԱԿԸ՝ ՔՈ ՈՃՈՎ</p><h1>Գտիր քո հաջորդ<br><em>սիրելի ժամացույցը։</em></h1><p class="hero-text">Դասական, մեխանիկական ու խելացի ժամացույցներ՝ գնելու և վաճառելու մեկ վայրում։</p><a class="btn btn-light" href="#catalog">Դիտել հավաքածուն <span>↓</span></a></div><div class="hero-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><img src="assets/watch-gold.svg" alt="Դասական ժամացույց"></div><div class="hero-note">EST. FOR EVERY MOMENT <span>✳</span></div></section>
<section class="catalog" id="catalog"><div class="section-heading"><div><p class="eyebrow">ՄԵՐ ՀԱՎԱՔԱԾՈՒՆ</p><h2>Ընտրիր քոնը</h2></div><span class="results-count"><?= count($products) ?> ժամացույց</span></div>
<form class="filters" method="get" action="index.php"><label class="search-field"><span>⌕</span><input name="q" value="<?= e($q) ?>" placeholder="Որոնել մոդել կամ բրենդ..."></label><select name="brand"><option value="">Բոլոր բրենդները</option><?php foreach ($brands as $b): ?><option value="<?= e($b) ?>" <?= $brand===$b?'selected':'' ?>><?= e($b) ?></option><?php endforeach; ?></select><select name="type"><option value="">Բոլոր տեսակները</option><?php foreach(['Մեխանիկական','Քվարցային','Խելացի'] as $v): ?><option <?= $type===$v?'selected':'' ?> value="<?= e($v) ?>"><?= e($v) ?></option><?php endforeach; ?></select><select name="gender"><option value="">Բոլորի համար</option><?php foreach(['Տղամարդու','Կանացի','Ունիսեքս'] as $v): ?><option <?= $gender===$v?'selected':'' ?> value="<?= e($v) ?>"><?= e($v) ?></option><?php endforeach; ?></select><input class="price-input" name="max_price" type="number" min="0" value="<?= e($maxPrice) ?>" placeholder="Մինչև ֏"><select name="sort"><option value="newest" <?= $sort==='newest'?'selected':'' ?>>Նորերը սկզբում</option><option value="price_asc" <?= $sort==='price_asc'?'selected':'' ?>>Գին՝ ցածրից բարձր</option><option value="price_desc" <?= $sort==='price_desc'?'selected':'' ?>>Գին՝ բարձրից ցածր</option><option value="name" <?= $sort==='name'?'selected':'' ?>>Անվան այբբենական</option></select><button class="btn btn-dark" type="submit">Ֆիլտրել</button><a class="clear-link" href="index.php">Մաքրել</a></form>
<div class="product-grid"><?php foreach($products as $p): ?><article class="product-card"><div class="product-image"><span class="tag"><?= e($p['condition_label']) ?></span><img src="assets/<?= e($p['image']) ?>" alt="<?= e($p['name']) ?>"><span class="image-number">№ <?= str_pad((string)$p['id'],2,'0',STR_PAD_LEFT) ?></span></div><div class="product-info"><div class="product-brand"><?= e($p['brand']) ?> <span><?= e($p['type']) ?></span></div><h3><?= e($p['name']) ?></h3><p class="product-description"><?= e($p['description']) ?></p><div class="product-bottom"><strong><?= number_format((float)$p['price'],0,'.',' ') ?> ֏</strong><a class="buy-link" href="buy.php?id=<?= (int)$p['id'] ?>" aria-label="Գնել <?= e($p['name']) ?>">↗</a></div></div></article><?php endforeach; ?></div>
<?php if (!$products): ?><div class="empty-state"><span>⌕</span><h3>Չգտնվեց համապատասխան ժամացույց</h3><p>Փոխիր որոնման բառը կամ մաքրիր ֆիլտրերը։</p><a class="btn btn-dark" href="index.php">Ցուցադրել բոլորը</a></div><?php endif; ?>
</section>
<section class="sell-banner"><div><p class="eyebrow">ԺԱՄԱՆԱԿՆ Է ԹԱՐՄԱՑՆԵԼ</p><h2>Ունե՞ս ժամացույց, որը<br>պատմելու բան ունի։</h2><p>Ուղարկիր տվյալները, և մենք կկապվենք քեզ հետ վաճառքի հարցը քննարկելու համար։</p><a class="btn btn-light" href="sell.php">Վաճառել ժամացույցը <span>↗</span></a></div><div class="sell-symbol">↗</div></section>
</main><footer><a class="logo" href="index.php"><span class="logo-mark">Ժ</span> ԺԱՄԱՊԱՀ</a><span>Ժամացույցների առք ու վաճառքի ուսումնական նախագիծ</span><span>© <?= date('Y') ?> ԺԱՄԱՊԱՀ</span></footer></body></html>

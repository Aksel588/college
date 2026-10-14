<?php
require __DIR__ . '/config.php';

$stmt = $pdo->query(
    'SELECT id, name, category, description, price, old_price,
            image, colors, sizes, is_new
     FROM products
     WHERE is_active = 1 AND stock > 0
     ORDER BY id DESC'
);
$products = $stmt->fetchAll();

function e($value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f7f5f0">
    <title>ATELIER — Modern Fashion</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/app.js" defer></script>
</head>
<body>

<div class="announcement">COMPLIMENTARY DELIVERY ON ORDERS OVER ֏50,000</div>

<header class="header">
    <button class="icon-button mobile-menu-button" id="mobileMenuButton" aria-label="Open menu">☰</button>
    <a class="logo" href="#home">ATELIER<span>.</span></a>

    <nav class="nav" id="mainNav">
        <a href="#collection">Collection</a>
        <a href="#collection" data-category-link="women">Women</a>
        <a href="#collection" data-category-link="men">Men</a>
        <a href="#story">Our story</a>
    </nav>

    <div class="header-actions">
        <button class="icon-button" id="searchButton" aria-label="Search">⌕</button>
        <button class="bag-button" id="cartButton">Bag <span id="cartCount">0</span></button>
    </div>
</header>

<main>
    <section class="hero" id="home">
        <img class="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85" alt="Fashion editorial">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <span class="eyebrow">THE NEW SEASON · 2026</span>
            <h1>Less, but<br><em>better.</em></h1>
            <p>Thoughtful essentials. Timeless silhouettes.<br>A wardrobe that feels like you.</p>
            <a class="button button-light" href="#collection">Discover the collection <span>↗</span></a>
        </div>
        <div class="hero-index">01 / NEW COLLECTION</div>
    </section>

    <section class="intro section-wrap" id="story">
        <span class="eyebrow">OUR PHILOSOPHY</span>
        <h2>Made for your everyday.<br><em>Designed to stay.</em></h2>
        <p>Beautiful fabrics, considered cuts and pieces you return to, season after season.</p>
    </section>

    <section class="collection section-wrap" id="collection">
        <div class="section-heading">
            <div>
                <span class="eyebrow">CURATED FOR YOU</span>
                <h2>The collection<span class="period">.</span></h2>
            </div>
            <span class="product-count" id="productCount"><?= count($products) ?> pieces</span>
        </div>

        <div class="toolbar">
            <div class="category-filters">
                <button class="filter-button active" data-filter="all">All pieces</button>
                <button class="filter-button" data-filter="women">Women</button>
                <button class="filter-button" data-filter="men">Men</button>
                <button class="filter-button" data-filter="accessories">Accessories</button>
            </div>
            <div class="toolbar-right">
                <label class="search-box" id="searchBox">
                    <span>⌕</span>
                    <input type="search" id="searchInput" placeholder="Find your piece..." aria-label="Search products">
                </label>
                <select id="sortSelect" aria-label="Sort products">
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Name: A–Z</option>
                </select>
            </div>
        </div>

        <div class="product-grid" id="productGrid">
            <?php foreach ($products as $p): ?>
                <article class="product-card"
                    data-product-id="<?= (int)$p['id'] ?>"
                    data-name="<?= e($p['name']) ?>"
                    data-category="<?= e($p['category']) ?>"
                    data-price="<?= e($p['price']) ?>"
                    data-old-price="<?= e($p['old_price'] ?? '') ?>"
                    data-image="<?= e($p['image']) ?>"
                    data-colors="<?= e($p['colors']) ?>"
                    data-sizes="<?= e($p['sizes']) ?>"
                    data-description="<?= e($p['description'] ?? '') ?>"
                    data-new="<?= (int)$p['is_new'] ?>">

                    <button class="product-image-button" type="button" data-open-product>
                        <div class="product-image-wrap">
                            <img src="<?= e($p['image']) ?>" alt="<?= e($p['name']) ?>" loading="lazy">
                            <?php if ((int)$p['is_new']): ?>
                                <span class="product-badge">NEW ARRIVAL</span>
                            <?php endif; ?>
                            <?php if ($p['old_price'] !== null): ?>
                                <span class="product-badge sale-badge">SALE</span>
                            <?php endif; ?>
                        </div>
                    </button>

                    <div class="product-info">
                        <div>
                            <p class="product-category"><?= e(ucfirst($p['category'])) ?></p>
                            <h3><?= e($p['name']) ?></h3>
                        </div>
                        <div class="product-price">
                            <span>֏<?= number_format((float)$p['price']) ?></span>
                            <?php if ($p['old_price'] !== null): ?>
                                <del>֏<?= number_format((float)$p['old_price']) ?></del>
                            <?php endif; ?>
                        </div>
                    </div>
                    <button class="quick-add" type="button" data-open-product>Choose options <span>＋</span></button>
                </article>
            <?php endforeach; ?>
        </div>
        <p class="empty-state" id="emptyState" hidden>No pieces found. Try another search.</p>
    </section>

    <section class="editorial">
        <div class="editorial-image">
            <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85" alt="Minimal fashion" loading="lazy">
        </div>
        <div class="editorial-copy">
            <span class="eyebrow">THE ART OF LESS</span>
            <h2>Your style.<br><em>Your own rules.</em></h2>
            <p>Discover pieces that work together, effortlessly.</p>
            <a href="#collection" class="text-link">Shop the edit <span>↗</span></a>
        </div>
    </section>

    <section class="newsletter section-wrap">
        <span class="eyebrow">A NOTE FROM ATELIER</span>
        <h2>Good things, occasionally.</h2>
        <p>New collections, styling notes and a little inspiration.</p>
        <form id="newsletterForm" class="newsletter-form">
            <input type="email" placeholder="Your email address" aria-label="Email address" required>
            <button type="submit">Join us ↗</button>
        </form>
        <p id="newsletterMessage" class="newsletter-message" aria-live="polite"></p>
    </section>
</main>

<footer class="footer">
    <a class="logo footer-logo" href="#home">ATELIER<span>.</span></a>
    <p>Considered clothing. Everyday confidence.</p>
    <div class="footer-links">
        <a href="#collection">Shop</a>
        <a href="#story">Our story</a>
        <a href="mailto:hello@example.com">Contact</a>
    </div>
    <small>© <?= date('Y') ?> ATELIER. All rights reserved.</small>
</footer>

<div class="modal-backdrop" id="productModal" hidden>
    <section class="product-modal" role="dialog" aria-modal="true" aria-labelledby="modalProductName">
        <button class="modal-close" type="button" data-close-modal aria-label="Close">×</button>
        <div class="modal-image"><img id="modalImage" src="" alt=""></div>
        <div class="modal-details">
            <span class="eyebrow" id="modalCategory">COLLECTION</span>
            <h2 id="modalProductName"></h2>
            <p class="modal-price" id="modalPrice"></p>
            <p class="modal-description" id="modalDescription"></p>

            <label class="field-label" for="modalColor">Color</label>
            <select id="modalColor"></select>

            <label class="field-label" for="modalSize">Size</label>
            <select id="modalSize"></select>

            <label class="field-label" for="modalQuantity">Quantity</label>
            <input id="modalQuantity" type="number" min="1" max="20" value="1">

            <button class="button button-dark full-button" id="addToCartButton" type="button">Add to bag <span>↗</span></button>
            <p class="modal-note">Thoughtful essentials, made to be worn.</p>
        </div>
    </section>
</div>

<div class="drawer-backdrop" id="cartBackdrop" hidden>
    <aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
        <div class="drawer-header">
            <div><span class="eyebrow">YOUR SELECTION</span><h2 id="cartTitle">Shopping bag</h2></div>
            <button class="modal-close" id="closeCart" type="button" aria-label="Close bag">×</button>
        </div>
        <div id="cartItems" class="cart-items"></div>
        <div class="cart-empty" id="cartEmpty">
            <span class="empty-bag">○</span>
            <h3>Your bag is waiting.</h3>
            <p>Find something you love.</p>
            <button class="button button-dark" id="continueShopping" type="button">Explore collection</button>
        </div>
        <div class="cart-footer" id="cartFooter">
            <div class="shipping-note" id="shippingNote"></div>
            <div class="cart-subtotal"><span>Subtotal</span><strong id="cartSubtotal">֏0</strong></div>
            <p>Delivery charges, if any, are confirmed with your order.</p>
            <button class="button button-dark full-button" id="checkoutButton" type="button">Proceed to checkout <span>↗</span></button>
        </div>
    </aside>
</div>

<div class="modal-backdrop" id="checkoutModal" hidden>
    <section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <button class="modal-close" type="button" data-close-modal aria-label="Close">×</button>
        <span class="eyebrow">ALMOST YOURS</span>
        <h2 id="checkoutTitle">Complete your order.</h2>
        <p class="checkout-intro">Enter your details for delivery.</p>

        <form id="checkoutForm">
            <div class="form-grid">
                <label class="form-field full-field">Full name *
                    <input name="name" required maxlength="150" autocomplete="name">
                </label>
                <label class="form-field">Phone number *
                    <input name="phone" type="tel" required maxlength="40" autocomplete="tel">
                </label>
                <label class="form-field">Email
                    <input name="email" type="email" maxlength="190" autocomplete="email">
                </label>
                <label class="form-field">City *
                    <input name="city" required maxlength="100" autocomplete="address-level2">
                </label>
                <label class="form-field">Delivery address *
                    <input name="address" required maxlength="500" autocomplete="street-address">
                </label>
                <label class="form-field full-field">Order note
                    <textarea name="note" rows="3" maxlength="2000"></textarea>
                </label>
            </div>
            <div class="checkout-summary"><span>Total</span><strong id="checkoutTotal">֏0</strong></div>
            <p class="payment-note">Payment: cash on delivery.</p>
            <button class="button button-dark full-button" id="placeOrderButton" type="submit">Confirm order <span>↗</span></button>
            <p class="form-message" id="checkoutMessage" aria-live="polite"></p>
        </form>
    </section>
</div>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

</body>
</html>
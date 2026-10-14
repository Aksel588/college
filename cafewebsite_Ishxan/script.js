
const menuGrid = document.getElementById("menu-grid");
const categoryButtons = document.querySelectorAll(".category-btn");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutForm = document.getElementById("checkout-form");

let products = [];
let cart = [];

async function loadProducts() {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Could not load products");
        }

        products = await response.json();
        showProducts("All");
    } catch (error) {
        menuGrid.textContent = "Could not load the menu.";
        console.error(error);
    }
}

function showProducts(category) {
    const filteredProducts = category === "All"
        ? products
        : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        menuGrid.innerHTML = "<p>No products in this category.</p>";
        return;
    }

    menuGrid.innerHTML = filteredProducts.map(product => `
        <div class="menu-card">
            <img src="${product.image_url}" alt="${product.name}">

            <div class="menu-info">
                <h3>${product.name}</h3>
                <p>${product.description || ""}</p>

                <div class="menu-bottom">
                    <span class="price">
                        $${Number(product.price).toFixed(2)}
                    </span>

                    <button
                        class="order-btn"
                        data-id="${product.id}"
                    >
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function addToCart(productId) {
    const product = products.find(
        item => Number(item.id) === productId
    );

    if (!product) return;

    const existingItem = cart.find(
        item => item.product_id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            product_id: productId,
            name: product.name,
            price: Number(product.price),
            quantity: 1
        });
    }

    showCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(
        product => product.product_id === productId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(
            product => product.product_id !== productId
        );
    }

    showCart();
}

function showCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>$${item.price.toFixed(2)} each</p>
            </div>

            <div class="quantity-controls">
                <button
                    type="button"
                    class="quantity-btn"
                    data-id="${item.product_id}"
                    data-change="-1"
                >−</button>

                <span>${item.quantity}</span>

                <button
                    type="button"
                    class="quantity-btn"
                    data-id="${item.product_id}"
                    data-change="1"
                >+</button>
            </div>

            <strong>
                $${(item.price * item.quantity).toFixed(2)}
            </strong>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = total.toFixed(2);
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        showProducts(button.dataset.category);
    });
});

menuGrid.addEventListener("click", event => {
    const button = event.target.closest(".order-btn");

    if (!button) return;

    addToCart(Number(button.dataset.id));
});

cartItems.addEventListener("click", event => {
    const button = event.target.closest(".quantity-btn");

    if (!button) return;

    changeQuantity(
        Number(button.dataset.id),
        Number(button.dataset.change)
    );
});

checkoutForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add at least one product.");
        return;
    }

    const customerName =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const submitButton = checkoutForm.querySelector(
        'button[type="submit"]'
    );

    try {
        submitButton.disabled = true;

        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customer_name: customerName,
                phone: phone,
                items: cart.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                }))
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Order failed");
        }

        alert(
            "Order placed successfully! Order number: " +
            result.order_id +
            ". Total: $" +
            Number(result.total).toFixed(2)
        );

        cart = [];
        showCart();
        checkoutForm.reset();
    } catch (error) {
        alert("Could not place order: " + error.message);
    } finally {
        submitButton.disabled = false;
    }
});

loadProducts();

"use strict";

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

const money = value =>
    new Intl.NumberFormat("hy-AM", {
        style: "currency",
        currency: "AMD",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);

function parseArray(value) {
    try {
        const result = JSON.parse(value);
        return Array.isArray(result) ? result : [];
    } catch {
        return [];
    }
}

const cards = $$(".product-card");

const products = cards.map(card => ({
    id: Number(card.dataset.productId),
    name: card.dataset.name,
    category: card.dataset.category,
    price: Number(card.dataset.price),
    oldPrice: card.dataset.oldPrice
        ? Number(card.dataset.oldPrice)
        : null,
    image: card.dataset.image,
    colors: parseArray(card.dataset.colors),
    sizes: parseArray(card.dataset.sizes),
    description: card.dataset.description || ""
}));

let category = "all";
let activeProduct = null;
let toastTimer;

function loadCart() {
    try {
        const data = JSON.parse(
            localStorage.getItem("atelier-cart") || "[]"
        );

        if (!Array.isArray(data)) return [];

        return data.filter(item =>
            Number.isInteger(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity >= 1 &&
            typeof item.size === "string" &&
            typeof item.color === "string"
        ).map(item => ({
            id: item.id,
            quantity: Math.min(item.quantity, 20),
            size: item.size,
            color: item.color
        }));
    } catch {
        return [];
    }
}

let cart = loadCart();

function saveCart() {
    localStorage.setItem("atelier-cart", JSON.stringify(cart));
}

function toast(message) {
    const element = $("#toast");
    element.textContent = message;
    element.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        element.classList.remove("show");
    }, 2800);
}

function openModal(element) {
    element.hidden = false;
    document.body.classList.add("no-scroll");
}

function closeModal(element) {
    element.hidden = true;

    if (!$$(".modal-backdrop, .drawer-backdrop")
        .some(item => !item.hidden)) {
        document.body.classList.remove("no-scroll");
    }
}

function fillSelect(select, values) {
    select.replaceChildren();

    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}

/* SEARCH, FILTERS AND SORTING */

function renderProducts() {
    const query = $("#searchInput")
        .value.trim().toLocaleLowerCase();

    const sort = $("#sortSelect").value;

    const visible = products.filter(product => {
        const matchesCategory =
            category === "all" || product.category === category;

        const searchable =
            `${product.name} ${product.category} ${product.description}`
                .toLocaleLowerCase();

        return matchesCategory && searchable.includes(query);
    });

    if (sort === "price-asc") {
        visible.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        visible.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        visible.sort((a, b) => a.name.localeCompare(b.name));
    }

    const ids = new Set(visible.map(item => item.id));

    cards.forEach(card => {
        card.hidden = !ids.has(Number(card.dataset.productId));
    });

    $("#productCount").textContent =
        `${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`;

    $("#emptyState").hidden = visible.length !== 0;
}

$$(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
        category = button.dataset.filter;

        $$(".filter-button").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        renderProducts();
    });
});

$("#searchInput").addEventListener("input", renderProducts);
$("#sortSelect").addEventListener("change", renderProducts);

$("#searchButton").addEventListener("click", () => {
    $("#searchBox").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    $("#searchInput").focus();
});

$$("[data-category-link]").forEach(link => {
    link.addEventListener("click", () => {
        category = link.dataset.categoryLink;

        $$(".filter-button").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );
        });

        renderProducts();
        $("#mainNav").classList.remove("open");
    });
});

$("#mobileMenuButton").addEventListener("click", () => {
    $("#mainNav").classList.toggle("open");
});

/* PRODUCT DETAILS */

function openProduct(product) {
    activeProduct = product;

    $("#modalImage").src = product.image;
    $("#modalImage").alt = product.name;
    $("#modalProductName").textContent = product.name;
    $("#modalCategory").textContent = product.category.toUpperCase();
    $("#modalPrice").textContent = money(product.price);
    $("#modalDescription").textContent = product.description;

    fillSelect($("#modalColor"), product.colors);
    fillSelect($("#modalSize"), product.sizes);

    $("#modalQuantity").value = "1";

    openModal($("#productModal"));
}

cards.forEach(card => {
    $$("[data-open-product]", card).forEach(button => {
        button.addEventListener("click", () => {
            const product = products.find(
                item => item.id === Number(card.dataset.productId)
            );

            if (product) openProduct(product);
        });
    });
});

$("#addToCartButton").addEventListener("click", () => {
    if (!activeProduct) return;

    const quantity = Number($("#modalQuantity").value);
    const size = $("#modalSize").value;
    const color = $("#modalColor").value;

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20 ||
        !size ||
        !color
    ) {
        toast("Please select a valid size and quantity.");
        return;
    }

    const existing = cart.find(item =>
        item.id === activeProduct.id &&
        item.size === size &&
        item.color === color
    );

    if ((existing?.quantity || 0) + quantity > 20) {
        toast("Maximum 20 pieces per selection.");
        return;
    }

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: activeProduct.id,
            quantity,
            size,
            color
        });
    }

    saveCart();
    renderCart();
    closeModal($("#productModal"));
    toast("Added to your shopping bag.");
});

/* SHOPPING CART */

function cartItems() {
    return cart.map(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) return null;

        return {
            ...item,
            product,
            lineTotal: product.price * item.quantity
        };
    }).filter(Boolean);
}

function cartTotal() {
    return cartItems().reduce(
        (sum, item) => sum + item.lineTotal,
        0
    );
}

function changeQuantity(item, delta) {
    const target = cart.find(entry =>
        entry.id === item.id &&
        entry.size === item.size &&
        entry.color === item.color
    );

    if (!target) return;

    target.quantity += delta;

    if (target.quantity <= 0) {
        cart = cart.filter(entry => entry !== target);
    } else if (target.quantity > 20) {
        target.quantity = 20;
        toast("Maximum 20 pieces per selection.");
    }

    saveCart();
    renderCart();
}

function renderCart() {
    const items = cartItems();

    $("#cartCount").textContent = String(
        items.reduce((sum, item) => sum + item.quantity, 0)
    );

    $("#cartItems").replaceChildren();

    $("#cartEmpty").hidden = items.length > 0;
    $("#cartFooter").hidden = items.length === 0;

    items.forEach(item => {
        const row = document.createElement("article");
        row.className = "cart-row";

        const image = document.createElement("img");
        image.src = item.product.image;
        image.alt = item.product.name;
        image.loading = "lazy";

        const info = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.product.name;

        const detail = document.createElement("p");
        detail.textContent = `${item.color} · Size ${item.size}`;

        const controls = document.createElement("div");
        controls.className = "quantity-control";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Decrease quantity");
        minus.addEventListener("click", () => changeQuantity(item, -1));

        const count = document.createElement("span");
        count.textContent = String(item.quantity);

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Increase quantity");
        plus.addEventListener("click", () => changeQuantity(item, 1));

        controls.append(minus, count, plus);
        info.append(name, detail, controls);

        const price = document.createElement("div");
        price.className = "cart-row-price";
        price.textContent = money(item.lineTotal);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove-item";
        remove.textContent = "Remove";

        remove.addEventListener("click", () => {
            cart = cart.filter(entry =>
                !(
                    entry.id === item.id &&
                    entry.size === item.size &&
                    entry.color === item.color
                )
            );

            saveCart();
            renderCart();
        });

        price.appendChild(remove);
        row.append(image, info, price);
        $("#cartItems").appendChild(row);
    });

    $("#cartSubtotal").textContent = money(cartTotal());
    $("#checkoutTotal").textContent = money(cartTotal());

    const remaining = Math.max(0, 50000 - cartTotal());

    $("#shippingNote").textContent = remaining > 0
        ? `Add ${money(remaining)} more to reach the complimentary delivery threshold.`
        : "Complimentary delivery threshold reached. Final delivery terms will be confirmed.";
}

function openCart() {
    renderCart();
    openModal($("#cartBackdrop"));
}

$("#cartButton").addEventListener("click", openCart);

$("#closeCart").addEventListener("click", () => {
    closeModal($("#cartBackdrop"));
});

$("#continueShopping").addEventListener("click", () => {
    closeModal($("#cartBackdrop"));
    $("#collection").scrollIntoView({ behavior: "smooth" });
});

/* CHECKOUT */

$("#checkoutButton").addEventListener("click", () => {
    if (!cart.length) {
        toast("Your shopping bag is empty.");
        return;
    }

    closeModal($("#cartBackdrop"));
    $("#checkoutMessage").textContent = "";
    $("#placeOrderButton").disabled = false;
    $("#placeOrderButton").textContent = "Confirm order ↗";

    renderCart();
    openModal($("#checkoutModal"));
});

$("#checkoutForm").addEventListener("submit", async event => {
    event.preventDefault();

    if (!cart.length) {
        toast("Your shopping bag is empty.");
        closeModal($("#checkoutModal"));
        return;
    }

    const form = event.currentTarget;
    const button = $("#placeOrderButton");
    const message = $("#checkoutMessage");

    button.disabled = true;
    button.textContent = "Processing...";
    message.textContent = "";

    const formData = new FormData(form);

    const customer = {
        name: String(formData.get("name") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        city: String(formData.get("city") || "").trim(),
        address: String(formData.get("address") || "").trim(),
        note: String(formData.get("note") || "").trim()
    };

    try {
        const response = await fetch("api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                customer,
                items: cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                }))
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.error || "Unable to place your order."
            );
        }

        cart = [];
        saveCart();
        renderCart();
        form.reset();

        closeModal($("#checkoutModal"));

        toast(`Order #${result.order_id} received successfully.`);
    } catch (error) {
        message.textContent =
            error.message || "Something went wrong. Please try again.";

        button.disabled = false;
        button.textContent = "Confirm order ↗";
    }
});

/* CLOSE MODALS */

$$("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal-backdrop");

        if (modal) closeModal(modal);
    });
});

["productModal", "checkoutModal"].forEach(id => {
    const modal = $("#" + id);

    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal(modal);
    });
});

$("#cartBackdrop").addEventListener("click", event => {
    if (event.target === $("#cartBackdrop")) {
        closeModal($("#cartBackdrop"));
    }
});

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    $$(".modal-backdrop, .drawer-backdrop").forEach(modal => {
        if (!modal.hidden) closeModal(modal);
    });
});

/* NEWSLETTER DEMO */

$("#newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    $("#newsletterMessage").textContent =
        "Thank you for your interest in ATELIER.";

    event.currentTarget.reset();
});

/* INITIALIZE */

renderProducts();
renderCart();
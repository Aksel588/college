
const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "cafewebsite",
    port: Number(process.env.DB_PORT) || 3306
};

app.get("/api/status", async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        await connection.end();

        res.json({
            message: "Server and database are connected!"
        });
    } catch (error) {
        res.status(500).json({
            error: "Database connection failed."
        });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const [products] = await connection.execute(
            "SELECT * FROM menu_items ORDER BY id"
        );

        await connection.end();

        res.json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Could not load products."
        });
    }
});

app.post("/api/orders", async (req, res) => {
    const { customer_name, phone, items } = req.body;

    if (
        typeof customer_name !== "string" ||
        !customer_name.trim() ||
        typeof phone !== "string" ||
        !phone.trim() ||
        !Array.isArray(items) ||
        items.length === 0 ||
        items.length > 20
    ) {
        return res.status(400).json({
            error: "Please provide valid customer and order details."
        });
    }

    for (const item of items) {
        if (
            !Number.isInteger(item.product_id) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1 ||
            item.quantity > 100
        ) {
            return res.status(400).json({
                error: "Invalid product or quantity."
            });
        }
    }

    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        await connection.beginTransaction();

        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const [products] = await connection.execute(
                "SELECT id, price FROM menu_items WHERE id = ?",
                [item.product_id]
            );

            if (products.length === 0) {
                throw new Error("Product not found.");
            }

            const price = Number(products[0].price);

            total += price * item.quantity;

            orderItems.push({
                product_id: products[0].id,
                quantity: item.quantity,
                price: price
            });
        }

        total = Number(total.toFixed(2));

        const [orderResult] = await connection.execute(
            `INSERT INTO orders
            (customer_name, phone, total)
            VALUES (?, ?, ?)`,
            [customer_name.trim(), phone.trim(), total]
        );

        for (const item of orderItems) {
            await connection.execute(
                `INSERT INTO order_items
                (order_id, menu_item_id, quantity, price)
                VALUES (?, ?, ?, ?)`,
                [
                    orderResult.insertId,
                    item.product_id,
                    item.quantity,
                    item.price
                ]
            );
        }

        await connection.commit();

        res.status(201).json({
            message: "Order created successfully.",
            order_id: orderResult.insertId,
            total: total
        });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error(error);

        res.status(500).json({
            error: error.message === "Product not found."
                ? error.message
                : "Could not save the order."
        });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`CafeWebsite is running at http://localhost:${PORT}`);
});

// controllers/client.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// Browse catalog
export const browseCatalog = asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT id, name, description, price, created_at FROM products ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// Request a quotation
export const requestQuotation = asyncHandler(async (req, res) => {
  const { customer_name, product_id, quantity } = req.body;
  if (!customer_name || !product_id || !quantity) {
    throw new ApiError(400, "customer_name, product_id, and quantity are required");
  }

  const result = await db.query(
    `INSERT INTO quotations (customer_name, product_id, quantity, status, created_at)
     VALUES ($1, $2, $3, 'pending', NOW())
     RETURNING *`,
    [customer_name, product_id, quantity]
  );

  res.status(201).json(result.rows[0]);
});

// View client dashboard
export const viewClientDashboard = asyncHandler(async (req, res) => {
  const { client_id } = req.params;
  if (!client_id) throw new ApiError(400, "client_id is required");

  const quotations = await db.query(
    "SELECT * FROM quotations WHERE customer_id = $1 ORDER BY created_at DESC",
    [client_id]
  );

  const orders = await db.query(
    "SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC",
    [client_id]
  );

  res.json({ quotations: quotations.rows, orders: orders.rows });
});

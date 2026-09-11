// controllers/orders.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// GET /api/orders
export const listOrders = asyncHandler(async (req, res) => {
  const result = await db.query("SELECT * FROM orders ORDER BY created_at DESC");
  res.json(result.rows);
});

// GET /api/orders/:id
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM orders WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    throw new ApiError(404, "Order not found");
  }

  res.json(result.rows[0]);
});

// POST /api/orders
export const createOrder = asyncHandler(async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

  if (!customer_id || !product_id || !quantity) {
    throw new ApiError(400, "Missing required fields");
  }

  const result = await db.query(
    `INSERT INTO orders (customer_id, product_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [customer_id, product_id, quantity]
  );

  res.status(201).json(result.rows[0]);
});

// PUT /api/orders/:id
export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, status } = req.body;

  const result = await db.query(
    `UPDATE orders
     SET quantity = $1, status = $2
     WHERE id = $3
     RETURNING *`,
    [quantity, status, id]
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Order not found");
  }

  res.json(result.rows[0]);
});

// DELETE /api/orders/:id
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await db.query("DELETE FROM orders WHERE id = $1 RETURNING id", [id]);

  if (result.rows.length === 0) {
    throw new ApiError(404, "Order not found");
  }

  res.json({ message: "Order deleted successfully" });
});

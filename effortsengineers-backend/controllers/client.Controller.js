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
  if (!req.user?.email) throw new ApiError(401, "Authenticated user is required");

  const client = await db.query(
    "SELECT id FROM clients WHERE email = $1",
    [req.user.email]
  );

  if (client.rows.length === 0) {
    return res.json({ quotations: [], orders: [] });
  }

  const clientId = client.rows[0].id;

  const quotations = await db.query(
    "SELECT * FROM quotations WHERE client_id = $1 ORDER BY created_at DESC",
    [clientId]
  );

  const orders = await db.query(
    `SELECT orders.*
     FROM orders
     INNER JOIN quotations ON quotations.id = orders.quotation_id
     WHERE quotations.client_id = $1
     ORDER BY orders.created_at DESC`,
    [clientId]
  );

  res.json({ quotations: quotations.rows, orders: orders.rows });
});

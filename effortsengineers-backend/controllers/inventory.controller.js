// controllers/inventory.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// GET /api/inventory
export const listInventory = asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT id, product_id, quantity, updated_at FROM inventory ORDER BY updated_at DESC"
  );
  res.json(result.rows);
});

// GET /api/inventory/:id
export const getInventoryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    "SELECT id, product_id, quantity, updated_at FROM inventory WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) throw new ApiError(404, "Inventory item not found");
  res.json(result.rows[0]);
});

// POST /api/inventory
export const createInventoryItem = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) throw new ApiError(400, "product_id and quantity are required");

  const result = await db.query(
    `INSERT INTO inventory (product_id, quantity)
     VALUES ($1, $2)
     RETURNING id, product_id, quantity, updated_at`,
    [product_id, quantity]
  );
  res.status(201).json(result.rows[0]);
});

// PUT /api/inventory/:id
export const updateInventoryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const result = await db.query(
    `UPDATE inventory
     SET quantity = $1
     WHERE id = $2
     RETURNING id, product_id, quantity, updated_at`,
    [quantity, id]
  );
  if (result.rows.length === 0) throw new ApiError(404, "Inventory item not found");
  res.json(result.rows[0]);
});

// DELETE /api/inventory/:id
export const deleteInventoryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM inventory WHERE id = $1 RETURNING id", [id]);
  if (result.rows.length === 0) throw new ApiError(404, "Inventory item not found");
  res.json({ message: "Inventory item deleted successfully" });
});

// Update stock for a product
export const updateStock = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || quantity == null) {
    throw new ApiError(400, "product_id and quantity are required");
  }

  const result = await db.query(
    `UPDATE inventory
     SET quantity = $1, updated_at = NOW()
     WHERE product_id = $2
     RETURNING id, product_id, quantity, updated_at`,
    [quantity, product_id]
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Inventory item not found");
  }

  res.json(result.rows[0]);
});
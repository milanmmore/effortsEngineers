// controllers/catalog.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const listCatalog = asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT id, name, description, price, created_at FROM products ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

export const getCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    "SELECT id, name, description, price, created_at FROM products WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) throw new ApiError(404, "Product not found");
  res.json(result.rows[0]);
});

export const createCatalogItem = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !price) throw new ApiError(400, "name and price are required");

  const result = await db.query(
    `INSERT INTO products (name, description, price)
     VALUES ($1, $2, $3)
     RETURNING id, name, description, price, created_at`,
    [name, description, price]
  );
  res.status(201).json(result.rows[0]);
});

export const updateCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const result = await db.query(
    `UPDATE products
     SET name = $1, description = $2, price = $3
     WHERE id = $4
     RETURNING id, name, description, price, created_at`,
    [name, description, price, id]
  );
  if (result.rows.length === 0) throw new ApiError(404, "Product not found");
  res.json(result.rows[0]);
});

export const deleteCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING id", [id]);
  if (result.rows.length === 0) throw new ApiError(404, "Product not found");
  res.json({ message: "Product deleted successfully" });
});

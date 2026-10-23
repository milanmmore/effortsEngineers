// controllers/catalog.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const listCatalog = asyncHandler(async (req, res) => {
  const result = await db.query(
    `SELECT id, name, description, price, brand, category, oem_no,
            stock_quantity, image_url, created_at
     FROM products
     ORDER BY created_at DESC`
  );
  res.json(result.rows);
});

export const getCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    `SELECT id, name, description, price, brand, category, oem_no,
            stock_quantity, image_url, created_at
     FROM products
     WHERE id = $1`,
    [id]
  );
  if (result.rows.length === 0) throw new ApiError(404, "Product not found");
  res.json(result.rows[0]);
});

export const createCatalogItem = asyncHandler(async (req, res) => {
  const {
    name,
    description = null,
    price,
    brand = null,
    category = null,
    oem_no = null,
    stock_quantity = 0,
    image_url = null,
  } = req.body;
  if (!name || price === undefined || price === null) {
    throw new ApiError(400, "name and price are required");
  }
  if (
    (typeof price === "string" && price.trim() === "") ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0
  ) {
    throw new ApiError(400, "price must be a non-negative number");
  }
  if (
    (typeof stock_quantity === "string" && stock_quantity.trim() === "") ||
    !Number.isInteger(Number(stock_quantity)) ||
    Number(stock_quantity) < 0
  ) {
    throw new ApiError(400, "stock_quantity must be a non-negative integer");
  }

  const result = await db.query(
    `INSERT INTO products
       (name, description, price, brand, category, oem_no, stock_quantity, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, name, description, price, brand, category, oem_no,
               stock_quantity, image_url, created_at`,
    [name, description, price, brand, category, oem_no, stock_quantity, image_url]
  );
  res.status(201).json(result.rows[0]);
});

export const updateCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    brand,
    category,
    oem_no,
    stock_quantity,
    image_url,
  } = req.body;
  if (
    stock_quantity !== undefined &&
    stock_quantity !== null &&
    ((typeof stock_quantity === "string" && stock_quantity.trim() === "") ||
      !Number.isInteger(Number(stock_quantity)) ||
      Number(stock_quantity) < 0)
  ) {
    throw new ApiError(400, "stock_quantity must be a non-negative integer");
  }

  const result = await db.query(
    `UPDATE products
     SET name = $1, description = $2, price = $3, brand = COALESCE($4, brand),
         category = COALESCE($5, category), oem_no = COALESCE($6, oem_no),
         stock_quantity = COALESCE($7, stock_quantity),
         image_url = COALESCE($8, image_url)
     WHERE id = $9
     RETURNING id, name, description, price, brand, category, oem_no,
               stock_quantity, image_url, created_at`,
    [name, description, price, brand, category, oem_no, stock_quantity, image_url, id]
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

// controllers/catalog.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const listCatalog = asyncHandler(async (req, res) => {
  const result = await db.query(
    `SELECT id, name, description, price, brand, category, oem_no,
            stock_quantity, stock_status, image_url, series, part_number,
            photo_id, file_name, compatible_models, material_size, photo_status,
            photo_source, photo_view, alt_text, page_url, remarks, created_at
     FROM products
     ORDER BY created_at DESC`
  );
  res.json(result.rows);
});

export const getCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    `SELECT id, name, description, price, brand, category, oem_no,
            stock_quantity, stock_status, image_url, series, part_number,
            photo_id, file_name, compatible_models, material_size, photo_status,
            photo_source, photo_view, alt_text, page_url, remarks, created_at
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
    stock_status = null,
    series = null,
    part_number = null,
    photo_id = null,
    file_name = null,
    compatible_models = null,
    material_size = null,
    photo_status = null,
    photo_source = null,
    photo_view = null,
    alt_text = null,
    page_url = null,
    remarks = null,
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
       (name, description, price, brand, category, oem_no, stock_quantity, image_url,
        stock_status, series, part_number, photo_id, file_name, compatible_models,
        material_size, photo_status, photo_source, photo_view, alt_text, page_url, remarks)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
             $17, $18, $19, $20, $21)
     RETURNING id, name, description, price, brand, category, oem_no,
               stock_quantity, stock_status, image_url, series, part_number,
               photo_id, file_name, compatible_models, material_size, photo_status,
               photo_source, photo_view, alt_text, page_url, remarks, created_at`,
    [
      name, description, price, brand, category, oem_no, stock_quantity, image_url,
      stock_status, series, part_number, photo_id, file_name, compatible_models,
      material_size, photo_status, photo_source, photo_view, alt_text, page_url, remarks,
    ]
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
    stock_status,
    series,
    part_number,
    photo_id,
    file_name,
    compatible_models,
    material_size,
    photo_status,
    photo_source,
    photo_view,
    alt_text,
    page_url,
    remarks,
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
         image_url = COALESCE($8, image_url),
         stock_status = COALESCE($9, stock_status),
         series = COALESCE($10, series),
         part_number = COALESCE($11, part_number),
         photo_id = COALESCE($12, photo_id),
         file_name = COALESCE($13, file_name),
         compatible_models = COALESCE($14, compatible_models),
         material_size = COALESCE($15, material_size),
         photo_status = COALESCE($16, photo_status),
         photo_source = COALESCE($17, photo_source),
         photo_view = COALESCE($18, photo_view),
         alt_text = COALESCE($19, alt_text),
         page_url = COALESCE($20, page_url),
         remarks = COALESCE($21, remarks)
     WHERE id = $22
     RETURNING id, name, description, price, brand, category, oem_no,
               stock_quantity, stock_status, image_url, series, part_number,
               photo_id, file_name, compatible_models, material_size, photo_status,
               photo_source, photo_view, alt_text, page_url, remarks, created_at`,
    [
      name, description, price, brand, category, oem_no, stock_quantity, image_url,
      stock_status, series, part_number, photo_id, file_name, compatible_models,
      material_size, photo_status, photo_source, photo_view, alt_text, page_url, remarks, id,
    ]
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

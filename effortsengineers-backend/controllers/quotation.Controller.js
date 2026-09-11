// controllers/quotation.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// GET /api/quotations
export const listQuotations = asyncHandler(async (req, res) => {
  const result = await db.query("SELECT * FROM quotations ORDER BY created_at DESC");
  res.json(result.rows);
});

// GET /api/quotations/:id
export const getQuotation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM quotations WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    throw new ApiError(404, "Quotation not found");
  }

  res.json(result.rows[0]);
});

// POST /api/quotations
export const createQuotation = asyncHandler(async (req, res) => {
  const { customer_id, product_id, quantity, price } = req.body;

  if (!customer_id || !product_id || !quantity || !price) {
    throw new ApiError(400, "Missing required fields");
  }

  const result = await db.query(
    `INSERT INTO quotations (customer_id, product_id, quantity, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [customer_id, product_id, quantity, price]
  );

  res.status(201).json(result.rows[0]);
});

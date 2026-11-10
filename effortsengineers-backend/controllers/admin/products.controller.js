import db from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const PRODUCT_FIELDS = [
  "name",
  "description",
  "price",
  "brand",
  "category",
  "oem_no",
  "stock_quantity",
  "stock_status",
  "image_url",
  "series",
  "part_number",
  "photo_id",
  "file_name",
  "compatible_models",
  "material_size",
  "photo_status",
  "photo_source",
  "photo_view",
  "alt_text",
  "page_url",
  "remarks",
  "is_published",
];
const TEXT_FIELDS = new Set(PRODUCT_FIELDS.filter(
  (field) => !["price", "stock_quantity", "is_published"].includes(field)
));
const TEXT_MAX_LENGTHS = {
  name: 100,
  brand: 100,
  category: 100,
  series: 150,
  part_number: 100,
  oem_no: 100,
};
const PAGE_SIZE = 25;

function normalizeProduct(body, { creating = false } = {}) {
  const product = {};
  for (const field of PRODUCT_FIELDS) {
    if (!creating && !Object.hasOwn(body, field)) continue;
    if (field === "is_published") {
      const value = body[field] ?? false;
      if (typeof value !== "boolean") {
        throw new ApiError(400, "is_published must be true or false.");
      }
      product[field] = value;
      continue;
    }
    if (field === "price") {
      const rawValue = body[field];
      if (rawValue === undefined || rawValue === null || rawValue === "") {
        product[field] = null;
      } else if (
        (typeof rawValue === "string" && rawValue.trim() === "") ||
        !Number.isFinite(Number(rawValue)) ||
        Number(rawValue) < 0 ||
        Number(rawValue) > 99999999.99
      ) {
        throw new ApiError(400, "price must be a non-negative number.");
      } else {
        product[field] = Number(rawValue);
      }
      continue;
    }
    if (field === "stock_quantity") {
      const rawValue = body[field] ?? 0;
      if (
        (typeof rawValue === "string" && rawValue.trim() === "") ||
        !Number.isInteger(Number(rawValue)) ||
        Number(rawValue) < 0 ||
        Number(rawValue) > 2147483647
      ) {
        throw new ApiError(400, "stock_quantity must be a non-negative integer.");
      }
      product[field] = Number(rawValue);
      continue;
    }
    if (TEXT_FIELDS.has(field)) {
      const value = body[field];
      if (value !== undefined && value !== null && typeof value !== "string") {
        throw new ApiError(400, `${field} must be text.`);
      }
      const text = typeof value === "string" ? value.trim() : "";
      if (field === "name" && !text) {
        throw new ApiError(400, "name is required.");
      }
      const maxLength = TEXT_MAX_LENGTHS[field];
      if (maxLength && text.length > maxLength) {
        throw new ApiError(400, `${field} must be ${maxLength} characters or fewer.`);
      }
      product[field] = text || null;
    }
  }
  if (creating) {
    if (!product.name) throw new ApiError(400, "name is required.");
    product.price ??= null;
    product.stock_quantity ??= 0;
    product.is_published ??= false;
    for (const field of TEXT_FIELDS) {
      if (!Object.hasOwn(product, field)) product[field] = null;
    }
  } else if (Object.keys(product).length === 0) {
    throw new ApiError(400, "Provide at least one product field to update.");
  }
  return product;
}

function validateId(rawId) {
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new ApiError(400, "Product ID must be a positive integer.");
  }
  return id;
}

export const listAdminProducts = asyncHandler(async (req, res) => {
  const search = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const photoId = typeof req.query.photoId === "string" ? req.query.photoId.trim() : "";
  const brand = typeof req.query.brand === "string" ? req.query.brand.trim() : "";
  const category = typeof req.query.category === "string" ? req.query.category.trim() : "";
  const page = Number(req.query.page ?? 1);
  if ([search, photoId, brand, category].some((value) => value.length > 120)) {
    throw new ApiError(400, "Product search filters must be 120 characters or fewer.");
  }
  if (!Number.isSafeInteger(page) || page < 1) {
    throw new ApiError(400, "page must be a positive integer.");
  }

  const values = [];
  const conditions = [];
  if (search) {
    const searchConditions = [
        "name",
        "brand",
        "series",
        "category",
        "photo_id",
        "part_number",
        "compatible_models",
    ].map((column) => {
        values.push(`%${search}%`);
        return `${column} ILIKE $${values.length}`;
    });
    conditions.push(`(${searchConditions.join(" OR ")})`);
  }
  if (photoId) {
    values.push(`%${photoId}%`);
    conditions.push(`photo_id ILIKE $${values.length}`);
  }
  if (brand && brand.toLowerCase() !== "all") {
    values.push(brand);
    conditions.push(`brand = $${values.length}`);
  }
  if (category && category.toLowerCase() !== "all") {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }
  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const count = await db.query(
    `SELECT COUNT(*)::int AS total FROM products ${whereClause}`,
    values
  );
  const total = Number(count.rows[0]?.total) || 0;
  const [brandOptions, seriesOptions, categoryOptions, modelOptions] = await Promise.all([
    db.query(
      `SELECT name FROM brands
       ORDER BY display_order, name`
    ),
    db.query(
      `SELECT DISTINCT brand, series FROM (
         SELECT b.name AS brand, s.name AS series
         FROM series s
         JOIN brands b ON b.id = s.brand_id
         UNION
         SELECT brand, series FROM products
         WHERE brand IS NOT NULL AND BTRIM(brand) <> ''
           AND series IS NOT NULL AND BTRIM(series) <> ''
       ) AS series_options
       ORDER BY brand, series`
    ),
    db.query(
      `SELECT name FROM part_categories
       ORDER BY display_order, name`
    ),
    db.query(
      `SELECT s.name AS series, m.name AS model
       FROM models m
       JOIN series s ON s.id = m.series_id
       ORDER BY s.name, m.name`
    ),
  ]);
  const modelsBySeries = {};
  const seriesByBrand = {};
  for (const { brand, series } of seriesOptions.rows) {
    seriesByBrand[brand] ??= [];
    seriesByBrand[brand].push(series);
  }
  for (const { series: optionSeries, model } of modelOptions.rows) {
    modelsBySeries[optionSeries] ??= [];
    modelsBySeries[optionSeries].push(model);
  }
  const pageValues = [...values, PAGE_SIZE, (page - 1) * PAGE_SIZE];
  const products = await db.query(
    `SELECT id, ${PRODUCT_FIELDS.join(", ")}, created_at, updated_at
     FROM products ${whereClause}
     ORDER BY created_at DESC, id DESC
     LIMIT $${pageValues.length - 1} OFFSET $${pageValues.length}`,
    pageValues
  );

  res.json({
    products: products.rows,
    page,
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
    filters: {
      brands: brandOptions.rows.map(({ name }) => name),
      series: seriesOptions.rows,
      seriesByBrand,
      categories: categoryOptions.rows.map(({ name }) => name),
      modelsBySeries,
    },
  });
});

export const createAdminProduct = asyncHandler(async (req, res) => {
  const product = normalizeProduct(req.body, { creating: true });
  const columns = PRODUCT_FIELDS;
  const values = columns.map((field) => product[field]);
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");

  try {
    const result = await db.query(
      `INSERT INTO products (${columns.join(", ")})
       VALUES (${placeholders})
       RETURNING id, ${PRODUCT_FIELDS.join(", ")}, created_at, updated_at`,
      values
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      throw new ApiError(409, "A product with that photo ID already exists.");
    }
    throw error;
  }
});

export const updateAdminProduct = asyncHandler(async (req, res) => {
  const id = validateId(req.params.id);
  const product = normalizeProduct(req.body);
  const fields = Object.keys(product);
  const values = fields.map((field) => product[field]);
  const assignments = fields.map((field, index) => `${field} = $${index + 1}`);
  values.push(id);

  try {
    const result = await db.query(
      `UPDATE products SET ${assignments.join(", ")}
       WHERE id = $${values.length}
       RETURNING id, ${PRODUCT_FIELDS.join(", ")}, created_at, updated_at`,
      values
    );
    if (result.rows.length === 0) throw new ApiError(404, "Product not found.");
    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      throw new ApiError(409, "A product with that photo ID already exists.");
    }
    throw error;
  }
});

export const deleteAdminProduct = asyncHandler(async (req, res) => {
  const id = validateId(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rows.length === 0) throw new ApiError(404, "Product not found.");
    res.json({ id: result.rows[0].id, message: "Product deleted successfully." });
  } catch (error) {
    if (error.code === "23503") {
      throw new ApiError(
        409,
        "This product is referenced by an order or quotation and cannot be deleted."
      );
    }
    throw error;
  }
});

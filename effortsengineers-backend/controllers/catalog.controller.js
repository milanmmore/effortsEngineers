// controllers/catalog.controller.js
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// Canonical product column list shared by every catalog query.
const PRODUCT_COLUMNS = [
  "name", "description", "price", "brand", "category", "oem_no",
  "stock_quantity", "stock_status", "image_url", "series", "part_number",
  "photo_id", "file_name", "compatible_models", "material_size", "photo_status",
  "photo_source", "photo_view", "alt_text", "page_url", "remarks",
];

// Columns returned by every catalog read/write.
const PRODUCT_SELECT = ["id", ...PRODUCT_COLUMNS, "created_at"].join(", ");
const PUBLIC_PRODUCT_COLUMNS = [
  "id", "name", "description", "brand", "category", "image_url", "series",
  "part_number", "compatible_models", "material_size", "alt_text",
];
const PUBLIC_PRODUCT_SELECT = PUBLIC_PRODUCT_COLUMNS.join(", ");
const PUBLIC_PAGE_SIZE = 24;

const toPublicProduct = (product) => ({
  ...Object.fromEntries(PUBLIC_PRODUCT_COLUMNS.map((column) => [column, product[column]])),
  compatible_models: (product.compatible_models || "")
    .split(",")
    .map((model) => model.trim())
    .filter((model) => model && !/\bto add\b/i.test(model))
    .join(", "),
});

// Placeholder list ($1, $2, ...) for the given number of columns.
const placeholders = (count) =>
  Array.from({ length: count }, (_, i) => `$${i + 1}`).join(", ");

export const listCatalog = asyncHandler(async (req, res) => {
  const brand = typeof req.query.brand === "string" ? req.query.brand.trim() : "";
  const category = typeof req.query.category === "string" ? req.query.category.trim() : "";
  const search = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (search.length > 120) {
    throw new ApiError(400, "q must be 120 characters or fewer.");
  }
  const filtered = Boolean(brand || category || search || req.query.page !== undefined);
  const filters = [];
  const values = [];
  if (brand) {
    values.push(brand);
    filters.push(`LOWER(brand) = LOWER($${values.length})`);
  }
  if (category) {
    values.push(category);
    filters.push(`LOWER(category) = LOWER($${values.length})`);
  }
  if (search) {
    values.push(`%${search}%`);
    const searchParameter = `$${values.length}`;
    filters.push(
      `(name ILIKE ${searchParameter} OR part_number ILIKE ${searchParameter} OR series ILIKE ${searchParameter} OR compatible_models ILIKE ${searchParameter} OR brand ILIKE ${searchParameter})`
    );
  }
  filters.unshift("is_published = TRUE");
  const whereClause = `WHERE ${filters.join(" AND ")}`;

  if (!filtered) {
    const result = await db.query(
      `SELECT ${PUBLIC_PRODUCT_SELECT} FROM products ${whereClause} ORDER BY created_at DESC`,
      values
    );
    return res.json(result.rows.map(toPublicProduct));
  }

  const page = Number(req.query.page ?? 1);
  if (!Number.isInteger(page) || page < 1) {
    throw new ApiError(400, "page must be a positive integer.");
  }

  const countResult = await db.query(
    `SELECT COUNT(*)::int AS total FROM products ${whereClause}`,
    values
  );
  const total = Number(countResult.rows[0]?.total) || 0;
  const pageValues = [...values, PUBLIC_PAGE_SIZE, (page - 1) * PUBLIC_PAGE_SIZE];
  const result = await db.query(
    `SELECT ${PUBLIC_PRODUCT_SELECT} FROM products ${whereClause}
     ORDER BY created_at DESC LIMIT $${pageValues.length - 1} OFFSET $${pageValues.length}`,
    pageValues
  );
  res.json({
    products: result.rows.map(toPublicProduct),
    page,
    pageSize: PUBLIC_PAGE_SIZE,
    total,
    totalPages: Math.ceil(total / PUBLIC_PAGE_SIZE),
  });
});

export const getCatalogFilters = asyncHandler(async (_req, res) => {
  const [brands, categories] = await Promise.all([
    db.query(
      "SELECT DISTINCT brand FROM products WHERE is_published = TRUE AND brand IS NOT NULL AND BTRIM(brand) <> '' ORDER BY brand"
    ),
    db.query(
      "SELECT DISTINCT category FROM products WHERE is_published = TRUE AND category IS NOT NULL AND BTRIM(category) <> '' ORDER BY category"
    ),
  ]);
  res.json({
    brands: brands.rows.map(({ brand }) => brand),
    categories: categories.rows.map(({ category }) => category),
  });
});

export const getCatalogItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    `SELECT ${PUBLIC_PRODUCT_SELECT} FROM products WHERE id = $1 AND is_published = TRUE`,
    [id]
  );
  if (result.rows.length === 0) throw new ApiError(404, "Product not found");
  res.json(toPublicProduct(result.rows[0]));
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
    `INSERT INTO products (${PRODUCT_COLUMNS.join(", ")})
     VALUES (${placeholders(PRODUCT_COLUMNS.length)})
     RETURNING ${PRODUCT_SELECT}`,
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
     SET name = COALESCE($1, name), description = COALESCE($2, description),
         price = COALESCE($3, price), brand = COALESCE($4, brand),
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
     RETURNING ${PRODUCT_SELECT}`,
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

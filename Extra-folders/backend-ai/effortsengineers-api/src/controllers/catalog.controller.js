const db = require('../config/db');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/catalog?category=&search=&page=&limit=
const listCatalog = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query;
  const conditions = ['is_active = TRUE'];
  const params = [];

  if (category) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }
  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`);
  }

  const offset = (Math.max(1, Number(page)) - 1) * Number(limit);
  params.push(Number(limit), offset);

  const result = await db.query(
    `SELECT * FROM catalog_items
     WHERE ${conditions.join(' AND ')}
     ORDER BY created_at DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  res.json({ items: result.rows, page: Number(page), limit: Number(limit) });
});

// GET /api/catalog/:id
const getCatalogItem = asyncHandler(async (req, res) => {
  const result = await db.query('SELECT * FROM catalog_items WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) throw new ApiError(404, 'Catalog item not found');
  res.json(result.rows[0]);
});

// POST /api/catalog  (admin only)
const createCatalogItem = asyncHandler(async (req, res) => {
  const { sku, name, description, category, price, stock_quantity, image_url } = req.body;

  if (!sku || !name || price === undefined) {
    throw new ApiError(400, 'sku, name and price are required');
  }

  const result = await db.query(
    `INSERT INTO catalog_items (sku, name, description, category, price, stock_quantity, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [sku, name, description || null, category || null, price, stock_quantity || 0, image_url || null]
  );

  res.status(201).json(result.rows[0]);
});

// PUT /api/catalog/:id  (admin only)
const updateCatalogItem = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock_quantity, image_url, is_active } = req.body;

  const result = await db.query(
    `UPDATE catalog_items SET
       name = COALESCE($1, name),
       description = COALESCE($2, description),
       category = COALESCE($3, category),
       price = COALESCE($4, price),
       stock_quantity = COALESCE($5, stock_quantity),
       image_url = COALESCE($6, image_url),
       is_active = COALESCE($7, is_active),
       updated_at = NOW()
     WHERE id = $8
     RETURNING *`,
    [name, description, category, price, stock_quantity, image_url, is_active, req.params.id]
  );

  if (result.rows.length === 0) throw new ApiError(404, 'Catalog item not found');
  res.json(result.rows[0]);
});

// DELETE /api/catalog/:id  (admin only) - soft delete
const deleteCatalogItem = asyncHandler(async (req, res) => {
  const result = await db.query(
    `UPDATE catalog_items SET is_active = FALSE, updated_at = NOW() WHERE id = $1 RETURNING id`,
    [req.params.id]
  );
  if (result.rows.length === 0) throw new ApiError(404, 'Catalog item not found');
  res.status(204).send();
});

module.exports = {
  listCatalog,
  getCatalogItem,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
};

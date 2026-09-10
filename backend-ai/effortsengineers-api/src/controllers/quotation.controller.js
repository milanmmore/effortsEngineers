const db = require('../config/db');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const VALID_STATUSES = ['pending', 'approved', 'rejected', 'converted'];

// POST /api/quotation
// body: { items: [{ catalog_item_id, quantity }], notes }
const createQuotation = asyncHandler(async (req, res) => {
  const { items, notes } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'items must be a non-empty array of { catalog_item_id, quantity }');
  }

  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // Look up current prices for each requested item
    const ids = items.map((i) => i.catalog_item_id);
    const priced = await client.query(
      `SELECT id, price FROM catalog_items WHERE id = ANY($1::int[]) AND is_active = TRUE`,
      [ids]
    );
    const priceMap = new Map(priced.rows.map((r) => [r.id, Number(r.price)]));

    let total = 0;
    for (const item of items) {
      const price = priceMap.get(item.catalog_item_id);
      if (price === undefined) {
        throw new ApiError(400, `Catalog item ${item.catalog_item_id} is not available`);
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new ApiError(400, 'Each item requires a positive quantity');
      }
      total += price * item.quantity;
    }

    const quotationResult = await client.query(
      `INSERT INTO quotations (user_id, status, notes, total_amount)
       VALUES ($1, 'pending', $2, $3)
       RETURNING *`,
      [req.user.id, notes || null, total]
    );
    const quotation = quotationResult.rows[0];

    for (const item of items) {
      await client.query(
        `INSERT INTO quotation_items (quotation_id, catalog_item_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [quotation.id, item.catalog_item_id, item.quantity, priceMap.get(item.catalog_item_id)]
      );
    }

    await client.query('COMMIT');
    res.status(201).json(quotation);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

// GET /api/quotation - admins see all, clients see their own
const listQuotations = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const result = await db.query(
    isAdmin
      ? 'SELECT * FROM quotations ORDER BY created_at DESC'
      : 'SELECT * FROM quotations WHERE user_id = $1 ORDER BY created_at DESC',
    isAdmin ? [] : [req.user.id]
  );
  res.json(result.rows);
});

// GET /api/quotation/:id
const getQuotation = asyncHandler(async (req, res) => {
  const quotationResult = await db.query('SELECT * FROM quotations WHERE id = $1', [req.params.id]);
  const quotation = quotationResult.rows[0];
  if (!quotation) throw new ApiError(404, 'Quotation not found');

  if (req.user.role !== 'admin' && quotation.user_id !== req.user.id) {
    throw new ApiError(403, 'You do not have access to this quotation');
  }

  const items = await db.query(
    `SELECT qi.*, ci.name, ci.sku FROM quotation_items qi
     JOIN catalog_items ci ON ci.id = qi.catalog_item_id
     WHERE qi.quotation_id = $1`,
    [quotation.id]
  );

  res.json({ ...quotation, items: items.rows });
});

// PATCH /api/quotation/:id/status  (admin only)
// body: { status: 'approved' | 'rejected' | 'converted' }
const updateQuotationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    throw new ApiError(400, `status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  const result = await db.query(
    `UPDATE quotations SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, req.params.id]
  );

  if (result.rows.length === 0) throw new ApiError(404, 'Quotation not found');
  res.json(result.rows[0]);
});

module.exports = { createQuotation, listQuotations, getQuotation, updateQuotationStatus };

const db = require('../config/db');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/admin/inventory - current stock levels for all catalog items
const listInventory = asyncHandler(async (req, res) => {
  const result = await db.query(
    `SELECT id, sku, name, stock_quantity, is_active FROM catalog_items ORDER BY name ASC`
  );
  res.json(result.rows);
});

// PATCH /api/admin/inventory/:catalogItemId
// body: { mode: 'set' | 'adjust', quantity: number, reason?: string }
//   mode 'set'    -> stock_quantity = quantity
//   mode 'adjust' -> stock_quantity += quantity  (use a negative number to deduct)
const updateStock = asyncHandler(async (req, res) => {
  const { mode = 'adjust', quantity, reason } = req.body;
  const { catalogItemId } = req.params;

  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
    throw new ApiError(400, 'quantity must be a number');
  }
  if (!['set', 'adjust'].includes(mode)) {
    throw new ApiError(400, "mode must be 'set' or 'adjust'");
  }

  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    const current = await client.query(
      'SELECT stock_quantity FROM catalog_items WHERE id = $1 FOR UPDATE',
      [catalogItemId]
    );
    if (current.rows.length === 0) {
      throw new ApiError(404, 'Catalog item not found');
    }

    const currentQty = current.rows[0].stock_quantity;
    const newQty = mode === 'set' ? quantity : currentQty + quantity;

    if (newQty < 0) {
      throw new ApiError(400, 'Resulting stock quantity cannot be negative');
    }

    const updated = await client.query(
      `UPDATE catalog_items SET stock_quantity = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [newQty, catalogItemId]
    );

    await client.query(
      `INSERT INTO inventory_logs (catalog_item_id, change_qty, reason, created_by)
       VALUES ($1, $2, $3, $4)`,
      [catalogItemId, newQty - currentQty, reason || null, req.user.id]
    );

    await client.query('COMMIT');
    res.json(updated.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

module.exports = { listInventory, updateStock };

const db = require('../config/db');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const VALID_STATUSES = ['processing', 'shipped', 'delivered', 'cancelled'];

// GET /api/orders - admins see all, clients see their own
const listOrders = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const { status } = req.query;

  const conditions = [];
  const params = [];

  if (!isAdmin) {
    params.push(req.user.id);
    conditions.push(`user_id = $${params.length}`);
  }
  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const result = await db.query(
    `SELECT * FROM orders ${where} ORDER BY created_at DESC`,
    params
  );

  res.json(result.rows);
});

// GET /api/orders/:id
const getOrder = asyncHandler(async (req, res) => {
  const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  const order = orderResult.rows[0];
  if (!order) throw new ApiError(404, 'Order not found');

  if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
    throw new ApiError(403, 'You do not have access to this order');
  }

  const items = await db.query(
    `SELECT oi.*, ci.name, ci.sku FROM order_items oi
     JOIN catalog_items ci ON ci.id = oi.catalog_item_id
     WHERE oi.order_id = $1`,
    [order.id]
  );

  res.json({ ...order, items: items.rows });
});

// PATCH /api/orders/:id/status  (admin only)
// body: { status: 'processing' | 'shipped' | 'delivered' | 'cancelled' }
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    throw new ApiError(400, `status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  const result = await db.query(
    `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, req.params.id]
  );

  if (result.rows.length === 0) throw new ApiError(404, 'Order not found');
  res.json(result.rows[0]);
});

module.exports = { listOrders, getOrder, updateOrderStatus };

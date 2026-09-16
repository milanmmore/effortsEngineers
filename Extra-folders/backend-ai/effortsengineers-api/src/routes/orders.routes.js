const express = require('express');
const { listOrders, getOrder, updateOrderStatus } = require('../controllers/orders.controller');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth); // every orders route requires a logged-in user

router.get('/', listOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', requireRole('admin'), updateOrderStatus);

module.exports = router;

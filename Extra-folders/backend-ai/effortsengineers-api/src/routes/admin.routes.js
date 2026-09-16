const express = require('express');
const { listInventory, updateStock } = require('../controllers/inventory.controller');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth, requireRole('admin')); // every admin route requires an admin

router.get('/inventory', listInventory);
router.patch('/inventory/:catalogItemId', updateStock);

module.exports = router;

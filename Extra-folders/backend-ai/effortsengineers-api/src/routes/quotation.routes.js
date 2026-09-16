const express = require('express');
const {
  createQuotation,
  listQuotations,
  getQuotation,
  updateQuotationStatus,
} = require('../controllers/quotation.controller');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth); // every quotation route requires a logged-in user

router.post('/', createQuotation);
router.get('/', listQuotations);
router.get('/:id', getQuotation);
router.patch('/:id/status', requireRole('admin'), updateQuotationStatus);

module.exports = router;

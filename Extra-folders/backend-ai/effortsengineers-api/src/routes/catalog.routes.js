const express = require('express');
const {
  listCatalog,
  getCatalogItem,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} = require('../controllers/catalog.controller');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Public - anyone can browse the catalog
router.get('/', listCatalog);
router.get('/:id', getCatalogItem);

// Admin only - manage catalog
router.post('/', requireAuth, requireRole('admin'), createCatalogItem);
router.put('/:id', requireAuth, requireRole('admin'), updateCatalogItem);
router.delete('/:id', requireAuth, requireRole('admin'), deleteCatalogItem);

module.exports = router;

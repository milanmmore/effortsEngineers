import express from "express";
import {
  listCatalog,
  getCatalogFilters,
  getCatalogItem,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from "../controllers/catalog.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", listCatalog);
router.get("/filters", getCatalogFilters);
router.get("/:id", getCatalogItem);
router.post("/", requireAuth, requireRole("admin"), createCatalogItem);
router.put("/:id", requireAuth, requireRole("admin"), updateCatalogItem);
router.delete("/:id", requireAuth, requireRole("admin"), deleteCatalogItem);

export default router;

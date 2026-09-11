import express from "express";
import {
  listCatalog,
  getCatalogItem,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from "../controllers/catalog.Controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", listCatalog);
router.get("/:id", getCatalogItem);
router.post("/", requireAuth, requireRole("admin"), createCatalogItem);
router.put("/:id", requireAuth, requireRole("admin"), updateCatalogItem);
router.delete("/:id", requireAuth, requireRole("admin"), deleteCatalogItem);

export default router;

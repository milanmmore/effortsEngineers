import express from "express";
import {
  listInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStock,   // <-- now available
} from "../controllers/inventory.Controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", listInventory);
router.get("/:id", getInventoryItem);
router.post("/", requireAuth, requireRole("admin"), createInventoryItem);
router.put("/:id", requireAuth, requireRole("admin"), updateInventoryItem);
router.delete("/:id", requireAuth, requireRole("admin"), deleteInventoryItem);

// Custom route for updating stock
router.patch("/stock", requireAuth, requireRole("admin"), updateStock);

export default router;

import express from "express";
import {
  listInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStock,   // <-- now available
} from "../controllers/inventory.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth, requireRole("admin"));

router.get("/", listInventory);
router.get("/:id", getInventoryItem);
router.post("/", createInventoryItem);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

// Custom route for updating stock
router.patch("/stock", updateStock);

export default router;

import express from "express";
import { listInventory, updateStock } from "../controllers/inventory.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// every admin route requires an admin
router.use(requireAuth, requireRole("admin"));

router.get("/inventory", listInventory);
router.patch("/inventory/:catalogItemId", updateStock);

export default router; // <-- critical for ESM

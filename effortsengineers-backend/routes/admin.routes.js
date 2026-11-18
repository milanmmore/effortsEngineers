import express from "express";
import { listInventory } from "../controllers/inventory.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Every admin route requires admin privileges
router.use(requireAuth, requireRole("admin"));

router.get("/inventory", listInventory);

export default router;

import express from "express";
import {
  getOrdersOverview,
  getInventoryLevels,
  getSalesForecast,
} from "../controllers/dashboard.Controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Admin dashboard routes
router.use(requireAuth, requireRole("admin"));

router.get("/orders", getOrdersOverview);
router.get("/inventory", getInventoryLevels);
router.get("/forecast", getSalesForecast);

export default router;

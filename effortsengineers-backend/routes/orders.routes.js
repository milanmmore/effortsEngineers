// routes/orders.routes.js
import express from "express";
import {
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.Controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", listOrders);
router.get("/:id", getOrder);

// Admin-only routes
router.post("/", requireAuth, requireRole("admin"), createOrder);
router.put("/:id", requireAuth, requireRole("admin"), updateOrder);
router.delete("/:id", requireAuth, requireRole("admin"), deleteOrder);

export default router;

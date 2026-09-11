// routes/quotation.routes.js
import express from "express";
import {
  listQuotations,
  getQuotation,
  createQuotation,
} from "../controllers/quotation.Controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", listQuotations);
router.get("/:id", getQuotation);

// Admin-only route
router.post("/", requireAuth, requireRole("admin"), createQuotation);

export default router;

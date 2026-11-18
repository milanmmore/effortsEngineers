// routes/quotation.routes.js
import express from "express";
import {
  listQuotations,
  getQuotation,
  createQuotation,
  updateQuotationStatus,
} from "../controllers/quotation.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// All quotation management endpoints require admin privileges
router.use(requireAuth, requireRole("admin"));

router.get("/", listQuotations);
router.get("/:id", getQuotation);
router.post("/", createQuotation);
router.put("/:id/status", updateQuotationStatus);
router.patch("/:id", updateQuotationStatus);

export default router;

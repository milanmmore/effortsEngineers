// routes/inquiries.routes.js
import express from "express";
import rateLimit from "express-rate-limit";
import { createInquiry, listInquiries } from "../controllers/inquiries.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

const inquiryRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skip: () => process.env.NODE_ENV === "test",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many enquiries. Please try again later." },
});

router.post("/", inquiryRateLimit, createInquiry);
router.get("/", requireAuth, requireRole("admin"), listInquiries);

export default router;

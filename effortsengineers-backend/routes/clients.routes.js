// routes/client.routes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  browseCatalog,
  requestQuotation,
  viewClientDashboard,
} from "../controllers/client.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

const quotationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many quotation requests. Please try again later." },
});

router.get("/catalog", browseCatalog);
router.post("/quotation", quotationRateLimit, requestQuotation);
router.get("/dashboard", requireAuth, viewClientDashboard);

export default router;

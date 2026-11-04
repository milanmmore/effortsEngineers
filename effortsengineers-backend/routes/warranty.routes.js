import express from "express";
import rateLimit from "express-rate-limit";
import { createWarrantyClaim } from "../controllers/warranty.controller.js";

const router = express.Router();

const claimRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many warranty claims. Please try again later." },
});

router.post("/claims", claimRateLimit, createWarrantyClaim);

export default router;

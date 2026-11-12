// routes/auth.routes.js
import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, forgotPassword, resetPassword, logout } from "../controllers/auth.controller.js";
import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const makeRateLimit = (limit, windowMs = 15 * 60 * 1000) => rateLimit({
  windowMs,
  limit,
  skip: () => process.env.NODE_ENV === "test",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});

router.post("/register", makeRateLimit(5), register);
router.post("/login", makeRateLimit(10), login);
router.post("/forgot-password", makeRateLimit(5, 60 * 60 * 1000), forgotPassword);
router.post("/reset-password", makeRateLimit(10), resetPassword);
router.post("/logout", logout);
router.get("/profile", requireAuth, asyncHandler(async (req, res) => {
  const result = await db.query(
    "SELECT id, name, username, email, role FROM users WHERE id = $1 LIMIT 1",
    [req.user.id]
  );
  if (!result.rows[0]) return res.status(401).json({ message: "Session is no longer valid." });
  res.json({ user: result.rows[0] });
}));

export default router;

// routes/auth.routes.js
import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed successfully", user: req.user });
});

export default router;

// middleware/auth.middleware.js
import { verifyToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new ApiError(401, "No token provided"));

  const token = authHeader.split(" ")[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return next(new ApiError(401, "Not authenticated"));
  if (req.user.role !== role) return next(new ApiError(403, "Forbidden"));
  next();
};

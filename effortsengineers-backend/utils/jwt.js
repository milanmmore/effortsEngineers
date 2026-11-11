// utils/jwt.js
import jwtLib from "jsonwebtoken";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (process.env.NODE_ENV === "production" && (secret || "").length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters in production.");
  }
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be configured in production.");
  }
  return "local-development-only-jwt-secret";
};

export const signToken = (payload, options = {}) => {
  return jwtLib.sign(payload, getSecret(), { expiresIn: options.expiresIn || "1h" });
};

export const verifyToken = (token) => {
  return jwtLib.verify(token, getSecret());
};

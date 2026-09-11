// utils/jwt.js
import jwtLib from "jsonwebtoken";

export const signToken = (payload) => {
  return jwtLib.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwtLib.verify(token, process.env.JWT_SECRET);
};

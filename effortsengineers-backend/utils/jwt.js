// utils/jwt.js
import jwtLib from "jsonwebtoken";

const getSecret = () => process.env.JWT_SECRET || "effortsengineers_jwt_super_secret_key_2026";

export const signToken = (payload) => {
  return jwtLib.sign(payload, getSecret(), { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwtLib.verify(token, getSecret());
};


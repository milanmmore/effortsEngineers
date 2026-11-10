import bcrypt from "bcryptjs";
import { createHash, timingSafeEqual } from "node:crypto";
import db from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import { signToken, verifyToken } from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  getConfiguredPortalAccounts,
  isDemoAccountEmail,
} from "../config/portalAccounts.js";


// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "name, email and password are required");
  }
  if (process.env.NODE_ENV === "production" && isDemoAccountEmail(email)) {
    throw new ApiError(400, "This email address is not available.");
  }

  // Standard password strength validation:
  // - Minimum 8 characters
  // - At least one uppercase letter (A-Z)
  // - At least one lowercase letter (a-z)
  // - At least one number (0-9)
  // - At least one special character (!@#$%^&*...)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+={}\[\]:;<>,.?/~\\-]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    throw new ApiError(409, "An account with this email already exists");
  }

  // Public registration is always 'client'
  const assignedRole = "client";
  void role; // ignored on purpose

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, passwordHash, assignedRole]
  );

  const user = result.rows[0];
  const token = signToken({ id: user.id, role: user.role, email: user.email });

  res.status(201).json({ user, token });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const identifier = String(req.body.identifier ?? req.body.email ?? "").trim();
  const { password } = req.body;

  if (!identifier || typeof password !== "string" || !password) {
    throw new ApiError(400, "user ID/email and password are required");
  }

  const configuredAccount = getConfiguredPortalAccounts().find(
    ({ username, email }) =>
      username.toLowerCase() === identifier.toLowerCase() ||
      email.toLowerCase() === identifier.toLowerCase()
  );
  let user;

  if (configuredAccount) {
    const submittedHash = createHash("sha256").update(password).digest();
    const configuredHash = createHash("sha256")
      .update(configuredAccount.password)
      .digest();
    if (!timingSafeEqual(submittedHash, configuredHash)) {
      throw new ApiError(401, "Invalid user ID/email or password");
    }

    const passwordHash = await bcrypt.hash(configuredAccount.password, 10);
    const result = await db.query(
      `INSERT INTO users (name, username, email, password_hash, role, managed_by_env)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       ON CONFLICT (email) DO UPDATE SET
         name = EXCLUDED.name,
         username = EXCLUDED.username,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role,
         managed_by_env = TRUE
       RETURNING id, name, username, email, role`,
      [
        configuredAccount.name,
        configuredAccount.username,
        configuredAccount.email,
        passwordHash,
        configuredAccount.role,
      ]
    );
    user = result.rows[0];
  } else {
    const result = await db.query(
      `SELECT id, name, username, email, password_hash, role, managed_by_env
       FROM users
       WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1)
       LIMIT 1`,
      [identifier]
    );
    user = result.rows[0];

    if (!user || user.managed_by_env) {
      throw new ApiError(401, "Invalid user ID/email or password");
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new ApiError(401, "Invalid user ID/email or password");
    }
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });

  res.json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

// POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email address is required");
  }

  const result = await db.query(
    "SELECT id, name, email, managed_by_env FROM users WHERE email = $1",
    [email]
  );
  const user = result.rows[0];

  // For security, do not disclose whether user exists or not
  if (!user) {
    return res.json({
      success: true,
      message: "If an account with that email exists, password reset instructions have been dispatched.",
    });
  }

  if (user.managed_by_env) {
    return res.json({
      success: true,
      message: "If an account with that email exists, password reset instructions have been dispatched.",
    });
  }

  // Create temporary reset token valid for 15 minutes
  const resetToken = signToken({ id: user.id, email: user.email, type: "password_reset" });

  res.json({
    success: true,
    message: "Password reset verification code / link generated successfully.",
    resetToken, // Returned so frontend can transition directly to reset screen
  });
});

// POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new ApiError(400, "Token and new password are required");
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+={}\[\]:;<>,.?/~\\-]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  let decoded;
  try {
    const { verifyToken } = await import("../utils/jwt.js");
    decoded = verifyToken(token);
  } catch {
    throw new ApiError(400, "Password reset link has expired or is invalid. Please request a new one.");
  }
  if (decoded.type !== "password_reset") {
    throw new ApiError(400, "Password reset link has expired or is invalid. Please request a new one.");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await db.query("UPDATE users SET password_hash = $1 WHERE id = $2", [passwordHash, decoded.id]);

  res.json({
    success: true,
    message: "Password has been reset successfully. You can now log in with your new password.",
  });
});

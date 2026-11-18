import dotenv from "dotenv";
dotenv.config();

import { pathToFileURL } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import db from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import quotationRoutes from "./routes/quotation.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import adminProductsRoutes from "./routes/admin/products.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import inquiriesRoutes from "./routes/inquiries.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import warrantyRoutes from "./routes/warranty.routes.js";
import {
  getImageUploadDirectory,
  getStorageConfig,
  fetchFileFromS3,
} from "./services/storage.service.js";
import { assertProductionAuthEnvironment } from "./config/portalAccounts.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

const configuredFrontendOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => new URL(origin).origin);
const allowedFrontendOrigins = configuredFrontendOrigins.length
  ? configuredFrontendOrigins
  : process.env.NODE_ENV === "production"
    ? []
    : ["http://localhost:3000"];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => callback(null, !origin || allowedFrontendOrigins.includes(origin)),
    credentials: true,
  })
);
app.use("/api", (req, res, next) => {
  const origin = req.get("origin");
  const isWriteRequest = !["GET", "HEAD", "OPTIONS"].includes(req.method);
  if (isWriteRequest && origin && !allowedFrontendOrigins.includes(origin)) {
    return res.status(403).json({ message: "Request origin is not allowed." });
  }
  next();
});
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(
  "/uploads/images",
  express.static(getImageUploadDirectory(), {
    dotfiles: "deny",
    index: false,
    setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff"),
  })
);

app.get("/uploads/images/:filename", async (req, res, next) => {
  const { filename } = req.params;
  if (
    !/^[\p{L}\p{N}][\p{L}\p{N}._ -]{0,199}$/u.test(filename) ||
    filename.includes("..")
  ) {
    return next();
  }
  try {
    const s3Obj = await fetchFileFromS3(filename);
    if (!s3Obj || !s3Obj.Body) {
      return next();
    }
    if (s3Obj.ContentType) {
      res.setHeader("Content-Type", s3Obj.ContentType);
    }
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    if (s3Obj.ContentLength) {
      res.setHeader("Content-Length", s3Obj.ContentLength);
    }
    s3Obj.Body.pipe(res);
  } catch (err) {
    next(err);
  }
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send("User-agent: *\nAllow: /\n");
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error("Health check failed:", {
      code: err.code,
      message: err.message,
    });
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/order", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/warranty", warrantyRoutes);

app.use(notFound);
app.use(errorHandler);

// Helper to ensure critical tables exist on database startup (e.g. Railway PostgreSQL)
export async function ensureEssentialSchema() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id BIGSERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash CHAR(64) NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id
        ON password_reset_tokens (user_id);

      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS username VARCHAR(100) UNIQUE,
        ADD COLUMN IF NOT EXISTS managed_by_env BOOLEAN NOT NULL DEFAULT FALSE;

      ALTER TABLE quotations
        ADD COLUMN IF NOT EXISTS user_id INT REFERENCES users(id),
        ADD COLUMN IF NOT EXISTS customer_name VARCHAR(150),
        ADD COLUMN IF NOT EXISTS email VARCHAR(150),
        ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
        ADD COLUMN IF NOT EXISTS company VARCHAR(150),
        ADD COLUMN IF NOT EXISTS urgency VARCHAR(100),
        ADD COLUMN IF NOT EXISTS notes TEXT,
        ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending',
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

      CREATE TABLE IF NOT EXISTS quotation_items (
        id SERIAL PRIMARY KEY,
        quotation_id INTEGER NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
        unit_price NUMERIC(10,2) DEFAULT 0,
        part_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_quotation_items_quotation_id ON quotation_items (quotation_id);
    `);
  } catch (err) {
    console.warn("[SCHEMA] Schema check note:", err.message);
  }
}

// Only start the server if run directly (keeps `import app` safe for Jest tests)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  assertProductionAuthEnvironment();

  if (process.env.NODE_ENV === "production" && !allowedFrontendOrigins.length) {
    console.warn(
      "⚠️  [CONFIG WARNING] FRONTEND_URL is not configured in production.\n" +
        "   Browser cross-origin write requests will be rejected with 403 until FRONTEND_URL is set.\n" +
        "   Set FRONTEND_URL=https://your-frontend-domain.up.railway.app in Railway service variables."
    );
  }

  if (!process.env.FORMSUBMIT_TOKEN?.trim()) {
    if (process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT) {
      console.warn(
        "⚠️  [EMAIL WARNING] FORMSUBMIT_TOKEN is not set in backend environment variables.\n" +
          "   Email notifications for enquiries, warranty claims, and password resets will not be delivered.\n" +
          "   Set FORMSUBMIT_TOKEN in Railway backend service variables."
      );
    }
  }

  await ensureEssentialSchema();

  const storage = getStorageConfig();
  if (!storage.isPersistent) {
    if (process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT) {
      console.warn(
        `⚠️  [STORAGE WARNING] Image upload directory is using ephemeral storage at ${storage.uploadDir}.\n` +
          "   On Railway, uploaded files will be lost when the container redeploys or restarts.\n" +
          "   To persist uploads, attach a Railway Volume (mount at /data or set RAILWAY_VOLUME_MOUNT_PATH / IMAGE_UPLOAD_DIR)\n" +
          "   or configure AWS S3 environment variables (S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)."
      );
    }
  } else {
    console.log(
      `[STORAGE] Persistent storage enabled: ${
        storage.isS3
          ? `S3 (${storage.s3Bucket})`
          : `Volume (${storage.uploadDir})`
      }`
    );
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`API listening on port ${PORT}`)
  );
}

export default app;

import dotenv from "dotenv";

// Local/dev/test only. On Railway the real variables are injected,
// so these files are skipped in production.
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env" });
  dotenv.config({ path: "env.test" });
}

import pkg from "pg";
const { Pool } = pkg;

const databaseUrl = process.env.DATABASE_URL;
const isLocalUrl =
  !databaseUrl ||
  databaseUrl.includes("localhost") ||
  databaseUrl.includes("127.0.0.1");

// Set DB_SSL=false on Railway only if you hit SSL errors.
const useSsl = !isLocalUrl && process.env.DB_SSL !== "false";

const pool = new Pool(
  databaseUrl && !isLocalUrl
    ? {
        connectionString: databaseUrl,
        ssl: useSsl ? { rejectUnauthorized: false } : false,
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5433,
        user: process.env.DB_USER || "postgres",
        password: String(process.env.DB_PASSWORD ?? ""),
        database: process.env.DB_NAME || "effortsengineers",
      }
);

if (process.env.NODE_ENV !== "production") {
  console.log("DB config:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
}

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
  // Don't crash the API in production on a dropped idle connection.
  if (process.env.NODE_ENV !== "production") process.exit(1);
});

// Default export so controllers can `import db from "../config/db.js"`
export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
};

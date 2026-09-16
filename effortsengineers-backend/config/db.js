// config/db.js
import dotenv from "dotenv";

// Load both standard app env and the project test env file if present.
// The repository uses env.test, not .env.test, so a missing .env.test file
// would otherwise leave DATABASE credentials undefined during DB-backed tests.
dotenv.config({ path: ".env" });
dotenv.config({ path: "env.test" });

import pkg from "pg";
const { Pool } = pkg;

const isLocalDb =
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes("localhost") ||
  process.env.DATABASE_URL.includes("127.0.0.1") ||
  process.env.DB_HOST === "localhost" ||
  process.env.DB_HOST === "127.0.0.1";

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: isLocalDb ? false : { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5433,   // ✅ default to 5433
        user: process.env.DB_USER || "postgres",
        password: String(process.env.DB_PASSWORD),   // ✅ ensure string
        database: process.env.DB_NAME,               // ✅ use DB_NAME from .env.test
      }
);

// Debug log to confirm values Jest is using
console.log("DB config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
  process.exit(1);
});

// Export default so controllers can `import db from "../config/db.js"`
export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
};

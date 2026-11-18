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
const isProduction = process.env.NODE_ENV === "production";
const isValidDatabaseUrl =
  !databaseUrl || /^postgres(?:ql)?:\/\//i.test(databaseUrl);
const databaseConfigurationError = !isValidDatabaseUrl
  ? "DATABASE_URL must be a PostgreSQL connection URL."
  : isProduction && !databaseUrl
    ? "DATABASE_URL must be configured for the production backend."
    : null;

const isLocalUrl =
  !databaseUrl ||
  databaseUrl.includes("localhost") ||
  databaseUrl.includes("127.0.0.1");

// Set DB_SSL=false on Railway only if you hit SSL errors.
const useSsl = !isLocalUrl && process.env.DB_SSL !== "false";

const pool = new Pool(
  databaseUrl && !isLocalUrl && isValidDatabaseUrl
    ? {
        connectionString: databaseUrl,
        ssl: useSsl ? { rejectUnauthorized: false } : false,
      }
    : isProduction
      ? {}
      : {
          host: process.env.DB_HOST || "localhost",
          port: Number(process.env.DB_PORT) || 5433,
          user: process.env.DB_USER || "postgres",
          password: String(process.env.DB_PASSWORD ?? ""),
          database: process.env.DB_NAME || "effortsengineers",
        }
);

if (!isProduction) {
  console.log("DB config:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
}

if (databaseConfigurationError) {
  console.error(databaseConfigurationError);
}

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", {
    code: err.code,
    message: err.message,
  });
  // Don't crash the API in production on a dropped idle connection.
  if (!isProduction) process.exit(1);
});

// Default export so controllers can `import db from "../config/db.js"`
export default {
  query: (text, params) => {
    if (databaseConfigurationError) {
      return Promise.reject(new Error(databaseConfigurationError));
    }
    return pool.query(text, params);
  },
  getClient: () => {
    if (databaseConfigurationError) {
      return Promise.reject(new Error(databaseConfigurationError));
    }
    return pool.connect();
  },
  pool,
};

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigration() {
  console.log("=================================================");
  console.log("Efforts Engineers — Database Migration Runner");
  console.log("=================================================");

  const schemaPath = path.resolve(__dirname, "schema_new.sql");
  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found at: ${schemaPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, "utf8");
  console.log(`Applying schema from: ${schemaPath}`);

  try {
    await db.query(sql);
    console.log("✅ Schema applied successfully!");
    console.log("All tables, indexes, columns, triggers, and views are up to date.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to apply schema:", err);
    process.exit(1);
  }
}

runMigration();

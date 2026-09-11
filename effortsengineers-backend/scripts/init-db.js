// Example: PostgreSQL init
const { execSync } = require("child_process");

try {
  console.log("Initializing database...");
  execSync("psql -U postgres -f ./scripts/schema.sql", { stdio: "inherit" });
  console.log("Database initialized successfully!");
} catch (err) {
  console.error("Database init failed:", err);
}

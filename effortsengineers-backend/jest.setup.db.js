// jest.setup.db.js
import { jest } from "@jest/globals";
import * as dbModule from "./config/db.js";

beforeEach(async () => {
  // Seed an admin user matching the app's actual users schema.
  await dbModule.default.query(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES (999, 'Admin User', 'admin@example.com', 'hashedpassword', 'admin')
     ON CONFLICT (id) DO NOTHING`
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

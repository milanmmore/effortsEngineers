// __tests__/integration.test.js
import { jest } from "@jest/globals";
import request from "supertest";
import bcrypt from "bcryptjs";

import * as dbModule from "../config/db.js";

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn(),
}));

const jwtModule = await import("../utils/jwt.js");
const { default: app } = await import("../server.js");

beforeEach(() => {
  jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
    if (sql.includes("INSERT INTO users")) {
      return { rows: [{ id: 1, email: params[1], name: params[0] }] };
    }
    if (sql.includes("SELECT * FROM users")) {
      return {
        rows: [{
          id: 1,
          email: "milan@example.com",
          password_hash: await bcrypt.hash("secret", 10),
        }],
      };
    }
    if (sql.includes("INSERT INTO orders")) {
      return {
        rows: [{ id: 1, customer_id: params[0], product_id: params[1], quantity: params[2] }],
      };
    }
    if (sql.includes("SELECT COUNT(*) FROM users")) {
      return { rows: [{ count: 1 }] };
    }
    return { rows: [] };
  });

  jwtModule.verifyToken.mockImplementation((token) => {
    if (token === "admin-token") return { id: 99, email: "admin@example.com", role: "admin" };
    if (token === "user-token") return { id: 1, email: "milan@example.com", role: "user" };
    throw new Error("Invalid token");
  });
});


afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await dbModule.default.pool.end();
});

test("full user flow: register → login → create order → admin stats", async () => {
  // Register
  const regRes = await request(app).post("/api/auth/register").send({
    name: "Milan",
    email: "milan@example.com",
    password: "secret",
  });
  expect(regRes.status).toBe(201);
  expect(regRes.body.token).toBeTruthy();

  // Login
  const loginRes = await request(app).post("/api/auth/login").send({
    email: "milan@example.com",
    password: "secret",
  });
  expect(loginRes.status).toBe(200);
  expect(loginRes.body.token).toBeTruthy();

  // Create order
  const orderRes = await request(app)
    .post("/api/orders")
    .set("Authorization", "Bearer admin-token")
    .send({ customer_id: 1, product_id: 1, quantity: 2 });
  expect(orderRes.status).toBe(201);
  expect(orderRes.body.quantity).toBe(2);

  // Admin inventory
  const statsRes = await request(app)
    .get("/api/admin/inventory")
    .set("Authorization", "Bearer admin-token");
  expect(statsRes.status).toBe(200);
  expect(Array.isArray(statsRes.body)).toBe(true);
});

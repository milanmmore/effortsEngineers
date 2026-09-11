// __tests__/integration-negative.test.js
import { jest } from "@jest/globals";
import request from "supertest";

import * as dbModule from "../config/db.js";

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn(),
}));

const jwtModule = await import("../utils/jwt.js");
const { default: app } = await import("../server.js");

beforeEach(() => {
  // Default DB mock
  jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
    if (sql.includes("SELECT id FROM users") && params[0] === "exists@example.com") {
      return { rows: [{ id: 1, email: "exists@example.com" }] };
    }
    if (sql.includes("INSERT INTO users") && params[1] === "exists@example.com") {
      throw new Error("duplicate key value violates unique constraint");
    }
    if (sql.includes("SELECT * FROM users") && params[0] === "wrong@example.com") {
      return { rows: [] }; // simulate no user found
    }
    return { rows: [] };
  });

  // Default JWT mock
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

// --- Negative flows ---
test("register with duplicate email fails", async () => {
  const res = await request(app).post("/api/auth/register").send({
    name: "Milan",
    email: "exists@example.com",
    password: "secret",
  });
  expect(res.status).toBe(409);
  expect(res.body.message).toMatch(/already exists/i);
});

test("login with wrong credentials fails", async () => {
  dbModule.default.query.mockImplementationOnce(async () => {
    return { rows: [] }; // simulate no user found
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "wrong@example.com",
    password: "bad",
  });
  expect(res.status).toBe(401);
  expect(res.body.message).toMatch(/invalid/i);
});

test("order creation fails without token", async () => {
  const res = await request(app)
    .post("/api/orders")
    .send({ product_id: 1, quantity: 2 });
  expect(res.status).toBe(401);
});

test("catalog create fails with invalid token", async () => {
  const res = await request(app)
    .post("/api/catalog")
    .set("Authorization", "Bearer invalid-token")
    .send({ name: "Bad Product", description: "Bad", price: 50 });
  expect(res.status).toBe(401);
});

test("quotation creation fails for non-admin", async () => {
  const res = await request(app)
    .post("/api/quotation")
    .set("Authorization", "Bearer user-token")
    .send({ customer_id: 1, product_id: 1, quantity: 1, price: 999 });
  expect(res.status).toBe(403);
});

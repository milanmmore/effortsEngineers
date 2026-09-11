// __tests__/api.test.js
import { jest } from "@jest/globals";
import request from "supertest";

import * as dbModule from "../config/db.js";

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn(),
}));

const jwtModule = await import("../utils/jwt.js");
const { default: app } = await import("../server.js");

describe("API Endpoints", () => {
  beforeEach(() => {
    // Mock DB
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
      if (sql.includes("FROM users")) {
        if (params[0] === "exists@example.com") {
          return { rows: [{ id: 1, email: "exists@example.com", password_hash: "hashed" }] };
        }
        return { rows: [] };
      }
      if (sql.includes("FROM products")) {
        return { rows: [{ id: 1, name: "Test Product", description: "Desc", price: 99 }] };
      }
      if (sql.includes("FROM quotations")) {
        return { rows: [{ id: 1, customer_name: "Alice", details: "Test", total: 500 }] };
      }
      if (sql.includes("INSERT INTO users")) {
        return { rows: [{ id: 1, name: params[0], email: params[1], role: params[3] }] };
      }
      return { rows: [] };
    });

    // Mock JWT
    jwtModule.verifyToken.mockImplementation((token) => {
      if (token === "admin-token") return { id: 1, email: "admin@example.com", role: "admin" };
      if (token === "user-token") return { id: 2, email: "user@example.com", role: "user" };
      throw new Error("Invalid token");
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await dbModule.default.pool.end();
  });

  test("health endpoint returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("register fails with missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.status).toBe(400);
  });

  test("register succeeds with new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Milan",
      email: "new@example.com",
      password: "secret",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("login fails with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "bad",
    });
    expect(res.status).toBe(401);
  });

  test("catalog list returns products", async () => {
    const res = await request(app).get("/api/catalog");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("admin can create catalog item", async () => {
    const res = await request(app)
      .post("/api/catalog")
      .set("Authorization", "Bearer admin-token")
      .send({ name: "New Product", description: "Test", price: 100 });
    expect(res.status).toBe(201);
  });

  test("non-admin is forbidden from creating catalog item", async () => {
    const res = await request(app)
      .post("/api/catalog")
      .set("Authorization", "Bearer user-token")
      .send({ name: "New Product", description: "Test", price: 100 });
    expect(res.status).toBe(403);
  });

  test("unauthenticated catalog create is rejected", async () => {
    const res = await request(app)
      .post("/api/catalog")
      .send({ name: "New Product", description: "Test", price: 100 });
    expect(res.status).toBe(401);
  });
});

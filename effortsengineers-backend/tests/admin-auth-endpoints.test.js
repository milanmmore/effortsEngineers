import { jest } from "@jest/globals";
import request from "supertest";
import * as dbModule from "../config/db.js";

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn((token) => {
    if (token === "admin-token") return { id: 1, email: "admin@example.com", role: "admin" };
    if (token === "client-token") return { id: 2, email: "client@example.com", role: "client" };
    throw new Error("Invalid token");
  }),
}));

const { default: app } = await import("../server.js");

describe("Admin Quotations & Orders Auth & Inventory Route Consolidation", () => {
  beforeEach(() => {
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
      if (sql.includes("FROM quotations")) {
        return {
          rows: [
            { id: 1, client_id: 1, product_id: 1, quantity: 2, total: 1000, status: "pending" },
          ],
        };
      }
      if (sql.includes("FROM orders")) {
        return {
          rows: [
            { id: 1, customer_id: 1, product_id: 1, quantity: 2, status: "processing" },
          ],
        };
      }
      if (sql.includes("UPDATE inventory")) {
        return {
          rows: [
            { id: 1, product_id: 5, quantity: 20, updated_at: new Date().toISOString() },
          ],
        };
      }
      return { rows: [] };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await dbModule.default.pool.end();
  });

  // 1. Quotations endpoint auth
  test("GET /api/quotation rejects unauthenticated requests", async () => {
    const res = await request(app).get("/api/quotation");
    expect(res.status).toBe(401);
  });

  test("GET /api/quotations rejects unauthenticated requests", async () => {
    const res = await request(app).get("/api/quotations");
    expect(res.status).toBe(401);
  });

  test("GET /api/quotations rejects non-admin users", async () => {
    const res = await request(app)
      .get("/api/quotations")
      .set("Authorization", "Bearer client-token");
    expect(res.status).toBe(403);
  });

  test("GET /api/quotations succeeds for admin users", async () => {
    const res = await request(app)
      .get("/api/quotations")
      .set("Authorization", "Bearer admin-token");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 2. Orders endpoint auth
  test("GET /api/orders rejects unauthenticated requests", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.status).toBe(401);
  });

  test("GET /api/orders rejects non-admin users", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", "Bearer client-token");
    expect(res.status).toBe(403);
  });

  test("GET /api/orders succeeds for admin users", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", "Bearer admin-token");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 3. Consolidated inventory stock update route
  test("PATCH /api/inventory/stock updates stock for admin", async () => {
    const res = await request(app)
      .patch("/api/inventory/stock")
      .set("Authorization", "Bearer admin-token")
      .send({ product_id: 5, quantity: 20 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(20);
  });

  test("removed duplicate route PATCH /api/admin/inventory/:id returns 404", async () => {
    const res = await request(app)
      .patch("/api/admin/inventory/5")
      .set("Authorization", "Bearer admin-token")
      .send({ quantity: 20 });

    expect(res.status).toBe(404);
  });
});

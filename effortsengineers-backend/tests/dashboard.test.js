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

describe("Dashboard Controller API", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await dbModule.default.pool.end();
  });

  test("requires admin authentication", async () => {
    const unauth = await request(app).get("/api/dashboard/orders");
    expect(unauth.status).toBe(401);

    const client = await request(app)
      .get("/api/dashboard/orders")
      .set("Authorization", "Bearer client-token");
    expect(client.status).toBe(403);
  });

  test("getOrdersOverview queries the database and returns counts", async () => {
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
      if (sql.includes("FROM orders")) {
        return {
          rows: [
            {
              total_orders: 15,
              pending_orders: 4,
              completed_orders: 11,
            },
          ],
        };
      }
      return { rows: [] };
    });

    const res = await request(app)
      .get("/api/dashboard/orders")
      .set("Authorization", "Bearer admin-token");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalOrders: 15,
      pendingOrders: 4,
      completedOrders: 11,
    });
  });

  test("getOrdersOverview handles empty orders gracefully", async () => {
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
      if (sql.includes("FROM orders")) {
        return {
          rows: [
            {
              total_orders: 0,
              pending_orders: 0,
              completed_orders: 0,
            },
          ],
        };
      }
      return { rows: [] };
    });

    const res = await request(app)
      .get("/api/dashboard/orders")
      .set("Authorization", "Bearer admin-token");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
    });
  });

  test("getInventoryLevels queries inventory table when available", async () => {
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
      if (sql.includes("FROM inventory")) {
        return {
          rows: [
            {
              low_stock: 3,
              in_stock: 45,
              total_items: 45,
            },
          ],
        };
      }
      return { rows: [] };
    });

    const res = await request(app)
      .get("/api/dashboard/inventory")
      .set("Authorization", "Bearer admin-token");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      itemsLowStock: 3,
      itemsInStock: 45,
    });
  });

  test("getInventoryLevels falls back to products table when inventory is empty", async () => {
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
      if (sql.includes("FROM inventory")) {
        return {
          rows: [
            {
              low_stock: 0,
              in_stock: 0,
              total_items: 0,
            },
          ],
        };
      }
      if (sql.includes("FROM products")) {
        return {
          rows: [
            {
              low_stock: 8,
              in_stock: 150,
              total_items: 150,
            },
          ],
        };
      }
      return { rows: [] };
    });

    const res = await request(app)
      .get("/api/dashboard/inventory")
      .set("Authorization", "Bearer admin-token");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      itemsLowStock: 8,
      itemsInStock: 150,
    });
  });

  test("getSalesForecast returns metrics, projected growth, and recommendations", async () => {
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
      if (sql.includes("FROM quotations")) {
        return { rows: [{ count: 20 }] };
      }
      if (sql.includes("FROM orders")) {
        return { rows: [{ count: 8, total_rev: 450000, avg_val: 56250 }] };
      }
      if (sql.includes("FROM products")) {
        return { rows: [{ count: 2 }] };
      }
      return { rows: [] };
    });

    const res = await request(app)
      .get("/api/dashboard/forecast")
      .set("Authorization", "Bearer admin-token");

    expect(res.status).toBe(200);
    expect(res.body.projectedGrowthPct).toBeDefined();
    expect(res.body.metrics.totalQuotations).toBe(20);
    expect(res.body.metrics.totalOrders).toBe(8);
    expect(res.body.metrics.conversionRate).toBe(40);
    expect(Array.isArray(res.body.recommendations)).toBe(true);
  });
});

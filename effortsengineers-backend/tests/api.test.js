// __tests__/api.test.js
import { jest } from "@jest/globals";
import request from "supertest";

import * as dbModule from "../config/db.js";

const originalFormSubmitToken = process.env.FORMSUBMIT_TOKEN;

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn(),
}));

const jwtModule = await import("../utils/jwt.js");
const { default: app } = await import("../server.js");

describe("API Endpoints", () => {
  beforeEach(() => {
    process.env.FORMSUBMIT_TOKEN = "test-formsubmit-token";
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: "true", message: "OK" }),
    });

    // Mock DB
    jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
      if (sql.includes("FROM users")) {
        if (params[0] === "exists@example.com") {
          return { rows: [{ id: 1, email: "exists@example.com", password_hash: "hashed" }] };
        }
        return { rows: [] };
      }
      if (sql.includes("COUNT(*)")) {
        return { rows: [{ total: 1 }] };
      }
      if (sql.includes("FROM products")) {
        return { rows: [{ id: 1, name: "Test Product", description: "Desc", price: 99 }] };
      }
      if (sql.includes("FROM quotations")) {
        return { rows: [{ id: 1, customer_name: "Alice", details: "Test", total: 500 }] };
      }
      if (sql.includes("INSERT INTO quotations")) {
        return {
          rows: [{
            id: 1,
            customer_name: params[0],
            product_id: params[1],
            quantity: params[2],
            status: "pending",
          }],
        };
      }
      if (sql.includes("INSERT INTO users")) {
        return { rows: [{ id: 1, name: params[0], email: params[1], role: params[3] }] };
      }
      if (sql.includes("INSERT INTO warranty_claims")) {
        return {
          rows: [{
            id: 1,
            claim_number: params[0],
            status: "new",
            created_at: new Date().toISOString(),
          }],
        };
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
    if (originalFormSubmitToken === undefined) {
      delete process.env.FORMSUBMIT_TOKEN;
    } else {
      process.env.FORMSUBMIT_TOKEN = originalFormSubmitToken;
    }
  });

  afterAll(async () => {
    await dbModule.default.pool.end();
  });

  test("health endpoint returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", db: "connected" });
  });

  test("register fails with missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.status).toBe(400);
  });

  test("register succeeds with new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Milan",
      email: "new@example.com",
      password: "Secret@123",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test.each(["admin@example.com", "user@example.com"])(
    "production registration rejects demo email %s",
    async (email) => {
      const previousNodeEnv = process.env.NODE_ENV;
      const query = jest.spyOn(dbModule.default, "query");
      try {
        process.env.NODE_ENV = "production";
        const res = await request(app).post("/api/auth/register").send({
          name: "Demo Account",
          email,
          password: "Strong-Password1!",
        });

        expect(res.status).toBe(400);
        expect(query).not.toHaveBeenCalled();
      } finally {
        if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
        else process.env.NODE_ENV = previousNodeEnv;
      }
    }
  );

  test("login fails with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "bad",
    });
    expect(res.status).toBe(401);
  });

  test("catalog list is paginated by default", async () => {
    const res = await request(app).get("/api/catalog");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      page: 1,
      pageSize: 24,
      total: 1,
      totalPages: 1,
    });
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  test("warranty claim requires reference and issue, then returns a claim number", async () => {
    const invalid = await request(app).post("/api/warranty/claims").send({
      name: "Test Customer",
      email: "customer@example.com",
      invoice_reference: "INV-123",
    });
    expect(invalid.status).toBe(400);

    const valid = await request(app).post("/api/warranty/claims").send({
      name: "Test Customer",
      company: "Example Plant",
      email: "customer@example.com",
      phone: "+91 90000 00000",
      invoice_reference: "INV-123",
      part: "Valve plate",
      serial: "SN-456",
      issue: "The supplied part has a visible crack.",
    });

    expect(valid.status).toBe(201);
    expect(valid.body.claim.claim_number).toMatch(/^EE-WC-[0-9A-F]{8}$/);
    expect(valid.body.notification.success).toBe(true);
  });

  test("saved warranty claim succeeds when notification delivery fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("provider unavailable"));
    const response = await request(app).post("/api/warranty/claims").send({
      name: "Test Customer",
      email: "customer@example.com",
      invoice_reference: "INV-123",
      issue: "The supplied part has a visible crack.",
    });

    expect(response.status).toBe(201);
    expect(response.body.claim.claim_number).toMatch(/^EE-WC-[0-9A-F]{8}$/);
    expect(response.body.notification).toMatchObject({
      success: false,
      message: "Email provider could not be reached.",
    });
  });

  test("warranty claim rejects honeypot submissions", async () => {
    const response = await request(app).post("/api/warranty/claims").send({
      name: "Bot",
      email: "bot@example.com",
      invoice_reference: "INV-123",
      issue: "Spam",
      website: "https://spam.example",
    });

    expect(response.status).toBe(400);
  });

  test("inquiry rejects honeypot submissions", async () => {
    const res = await request(app).post("/api/inquiries").send({
      name: "Spam bot",
      email: "spam@example.com",
      website: "https://spam.example",
    });

    expect(res.status).toBe(400);
    expect(res.body.message || res.body.error?.message).toMatch(/Unable to submit inquiry/);
  });

  test("saved inquiry succeeds when notification delivery fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("provider unavailable"));
    const response = await request(app).post("/api/inquiries").send({
      name: "Test Customer",
      email: "customer@example.com",
      phone: "+91 90000 00000",
      brand: "Grasso",
      model: "RC11",
      part_name: "Valve plate",
      quantity: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.rfqId).toMatch(/^EE-RFQ-\d+$/);
    expect(response.body.notification).toMatchObject({
      success: false,
      message: "Email provider could not be reached.",
    });
  });

  test("quotation registration returns a reference and notification result", async () => {
    const response = await request(app).post("/api/client/quotation").send({
      customer_name: "Test Customer",
      email: "customer@example.com",
      phone: "+91 90000 00000",
      product_id: 1,
      quantity: 2,
      items: [{ name: "Valve plate", quantity: 2, brand: "Grasso" }],
    });

    expect(response.status).toBe(201);
    expect(response.body.quoteId).toBe("EE-QT-1");
    expect(response.body.notification.success).toBe(true);
  });

  test("saved quotation succeeds when notification delivery fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("provider unavailable"));
    const response = await request(app).post("/api/client/quotation").send({
      customer_name: "Test Customer",
      email: "customer@example.com",
      product_id: 1,
      quantity: 2,
      items: [{ name: "Valve plate", quantity: 2, brand: "Grasso" }],
    });

    expect(response.status).toBe(201);
    expect(response.body.quoteId).toBe("EE-QT-1");
    expect(response.body.notification).toMatchObject({
      success: false,
      message: "Email provider could not be reached.",
    });
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

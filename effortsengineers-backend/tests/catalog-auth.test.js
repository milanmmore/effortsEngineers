// __tests__/catalog-auth.test.js
import { jest } from "@jest/globals";
import request from "supertest";
import * as dbModule from "../config/db.js";

// --- Mock JWT ---
jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn(),
}));

const jwtModule = await import("../utils/jwt.js");
const { default: app } = await import("../server.js");

beforeEach(() => {
  // Default mock for verifyToken
  jwtModule.verifyToken.mockImplementation((token) => {
    if (token === "admin-token") {
      return { id: 1, email: "admin@example.com", role: "admin" };
    }
    if (token === "user-token") {
      return { id: 2, email: "user@example.com", role: "user" };
    }
    throw new Error("Invalid token");
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await dbModule.default.pool.end();
});

test("admin can create catalog item", async () => {
  const res = await request(app)
    .post("/api/catalog")
    .set("Authorization", "Bearer admin-token")
    .send({ name: "Admin Product", description: "Test", price: 100 });

  expect(res.status).toBe(201);
});

test("non-admin forbidden from creating catalog item", async () => {
  const res = await request(app)
    .post("/api/catalog")
    .set("Authorization", "Bearer user-token")
    .send({ name: "User Product", description: "Test", price: 100 });

  expect(res.status).toBe(403);
});

test("unauthenticated catalog create is rejected", async () => {
  const res = await request(app)
    .post("/api/catalog")
    .send({ name: "NoAuth Product", description: "Test", price: 100 });

  expect(res.status).toBe(401);
});

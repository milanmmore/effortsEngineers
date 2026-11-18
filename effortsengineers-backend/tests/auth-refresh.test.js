import { jest } from "@jest/globals";
import request from "supertest";
import * as dbModule from "../config/db.js";
import { signToken } from "../utils/jwt.js";

const { default: app } = await import("../server.js");

const mockUser = {
  id: 10,
  name: "Refresh Test User",
  username: "refreshtest",
  email: "refresh@example.com",
  role: "client",
};

beforeEach(() => {
  jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
    if (typeof sql === "string" && sql.includes("FROM users WHERE id = $1")) {
      if (params[0] === 10) {
        return { rows: [mockUser] };
      }
      return { rows: [] };
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

describe("POST /api/auth/refresh", () => {
  test("returns 401 when no token or cookie is provided", async () => {
    const res = await request(app).post("/api/auth/refresh");
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/No authentication token provided/i);
  });

  test("returns 401 when an invalid/malformed token is provided", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Authorization", "Bearer invalid-garbage-token");
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Invalid authentication token/i);
  });

  test("returns 200 with new token and cookie for a valid active token via Bearer header", async () => {
    const activeToken = signToken({ id: 10, role: "client", email: "refresh@example.com" });

    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Authorization", `Bearer ${activeToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toMatchObject({
      id: 10,
      name: "Refresh Test User",
      email: "refresh@example.com",
      role: "client",
    });
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe("string");
    // Verify Set-Cookie header contains ee_session
    const setCookie = res.headers["set-cookie"];
    expect(setCookie).toBeDefined();
    expect(setCookie.some((c) => c.includes("ee_session="))).toBe(true);
  });

  test("returns 200 with new token and cookie for a valid active token via Cookie", async () => {
    const activeToken = signToken({ id: 10, role: "client", email: "refresh@example.com" });

    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", [`ee_session=${activeToken}`]);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test("returns 200 and refreshes recently expired token within 7-day grace period", async () => {
    // Expired 10 seconds ago
    const recentlyExpiredToken = signToken(
      { id: 10, role: "client", email: "refresh@example.com" },
      { expiresIn: "-10s" }
    );

    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Authorization", `Bearer ${recentlyExpiredToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.id).toBe(10);
  });

  test("returns 401 when token is expired beyond 7-day grace period", async () => {
    // Expired 8 days ago
    const longExpiredToken = signToken(
      { id: 10, role: "client", email: "refresh@example.com" },
      { expiresIn: "-8d" }
    );

    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Authorization", `Bearer ${longExpiredToken}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Session has expired/i);
  });

  test("returns 401 when user account no longer exists in DB", async () => {
    const tokenForNonexistentUser = signToken({ id: 999, role: "client", email: "ghost@example.com" });

    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Authorization", `Bearer ${tokenForNonexistentUser}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/User account no longer exists/i);
  });
});

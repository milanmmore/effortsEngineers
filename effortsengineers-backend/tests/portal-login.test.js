import { jest } from "@jest/globals";
import request from "supertest";
import * as dbModule from "../config/db.js";
import { assertProductionAuthEnvironment } from "../config/portalAccounts.js";

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "configured-user-token"),
  verifyToken: jest.fn(() => ({ id: 1, role: "admin" })),
}));

const { default: app } = await import("../server.js");
const originalEnvironment = Object.fromEntries([
  "ADMIN_LOGIN_ID",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "TEST_LOGIN_ID",
  "TEST_EMAIL",
  "TEST_PASSWORD",
].map((key) => [key, process.env[key]]));

beforeEach(() => {
  process.env.ADMIN_LOGIN_ID = "admin";
  process.env.ADMIN_EMAIL = "administrator@example.test";
  process.env.ADMIN_PASSWORD = "Local-Admin-Password-1";
  process.env.TEST_LOGIN_ID = "test";
  process.env.TEST_EMAIL = "test-user@example.test";
  process.env.TEST_PASSWORD = "Local-Test-Password-1";

  jest.spyOn(dbModule.default, "query").mockImplementation(async (_sql, params) => ({
    rows: [{
      id: params[0] === "Test User" ? 2 : 1,
      name: params[0],
      username: params[1],
      email: params[2],
      role: params[4],
    }],
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

afterAll(async () => {
  await dbModule.default.pool.end();
});

test("configured admin can sign in by user ID and receives the admin role", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ identifier: "admin", password: "Local-Admin-Password-1" });

  expect(response.status).toBe(200);
  expect(response.body.user).toMatchObject({
    username: "admin",
    email: "administrator@example.test",
    role: "admin",
  });
  expect(response.body.token).toBe("configured-user-token");
});

test("configured test account receives only the client role", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ identifier: "test", password: "Local-Test-Password-1" });

  expect(response.status).toBe(200);
  expect(response.body.user.role).toBe("client");
});

test("configured account rejects an incorrect password", async () => {
  const query = jest.spyOn(dbModule.default, "query");
  const response = await request(app)
    .post("/api/auth/login")
    .send({ identifier: "admin", password: "wrong" });

  expect(response.status).toBe(401);
  expect(query).not.toHaveBeenCalled();
});

test("production auth configuration rejects weak passwords", () => {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousJwtSecret = process.env.JWT_SECRET;
  try {
    process.env.NODE_ENV = "production";
    process.env.JWT_SECRET = "random-secret-that-is-at-least-32-characters";
    process.env.ADMIN_PASSWORD = "admin";
    process.env.TEST_PASSWORD = "Strong-Test-Password-1";
    expect(() => assertProductionAuthEnvironment()).toThrow(/ADMIN_PASSWORD/);

    process.env.ADMIN_PASSWORD = "Strong-Admin-Password-1";
    expect(() => assertProductionAuthEnvironment()).not.toThrow();
  } finally {
    process.env.NODE_ENV = previousNodeEnv;
    if (previousJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousJwtSecret;
  }
});

test.each(["admin@example.com", "user@example.com"])(
  "production auth configuration rejects demo email %s",
  (email) => {
    const previousNodeEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = "production";
      process.env.JWT_SECRET = "random-secret-that-is-at-least-32-characters";
      process.env.ADMIN_EMAIL = email;
      process.env.ADMIN_PASSWORD = "Strong-Admin-Password-1";
      process.env.TEST_PASSWORD = "Strong-Test-Password-1";

      expect(() => assertProductionAuthEnvironment()).toThrow(/demo account address/);
    } finally {
      if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = previousNodeEnv;
    }
  }
);

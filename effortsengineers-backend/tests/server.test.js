// __tests__/server.test.js
import { jest } from "@jest/globals";
import request from "supertest";
import * as dbModule from "../config/db.js";
import app from "../server.js";

test("health endpoint returns an ok status", async () => {
  const res = await request(app).get("/api/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ status: "ok" });
});

test("unknown route returns 404", async () => {
  const res = await request(app).get("/api/does-not-exist");
  expect(res.status).toBe(404);
});

afterAll(async () => {
  await dbModule.default.pool.end();
});

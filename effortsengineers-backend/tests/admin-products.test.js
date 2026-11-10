import { jest } from "@jest/globals";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import request from "supertest";
import * as dbModule from "../config/db.js";
import { getImageUploadDirectory } from "../controllers/uploads.controller.js";

jest.unstable_mockModule("../utils/jwt.js", () => ({
  signToken: jest.fn(() => "test-token"),
  verifyToken: jest.fn((token) => {
    if (token === "admin-token") return { id: 1, role: "admin" };
    if (token === "client-token") return { id: 2, role: "client" };
    throw new Error("Invalid token");
  }),
}));

const { default: app } = await import("../server.js");
const uploadedPhotoNames = [];

beforeEach(() => {
  jest.spyOn(dbModule.default, "query").mockImplementation(async (sql) => {
    if (sql.includes("COUNT(*)")) return { rows: [{ total: 1 }] };
    if (sql.includes("FROM brands")) {
      return { rows: [{ name: "Grasso" }, { name: "Sabroe" }, { name: "Other" }] };
    }
    if (sql.includes("FROM series s")) {
      return {
        rows: [
          { brand: "Grasso", series: "Grasso V Series" },
          { brand: "Grasso", series: "Grasso RC Series" },
          { brand: "Sabroe", series: "Sabroe CMO Series" },
        ],
      };
    }
    if (sql.includes("FROM part_categories")) {
      return {
        rows: [
          { name: "Cylinder Liner" },
          { name: "Piston Assembly" },
          { name: "Connecting Rod" },
        ],
      };
    }
    if (sql.includes("FROM models m")) {
      return {
        rows: [
          { series: "Grasso V Series", model: "V 300" },
          { series: "Grasso V Series", model: "V 450" },
          { series: "Sabroe CMO Series", model: "CMO 16" },
        ],
      };
    }
    if (sql.startsWith("SELECT id, name, description")) {
      return {
        rows: [{
          id: 7,
          name: "Cylinder Liner",
          brand: "Grasso",
          series: "V Series",
          category: "Cylinder Liner",
          photo_id: "GRA-V-CLN-01",
          compatible_models: "V 300, V 450",
          photo_status: "To Shoot",
          is_published: false,
        }],
      };
    }
    if (sql.startsWith("INSERT INTO products")) {
      return { rows: [{ id: 8, name: "New Product", photo_id: "NEW-01" }] };
    }
    if (sql.startsWith("UPDATE products")) {
      return { rows: [{ id: 7, name: "Updated Product" }] };
    }
    if (sql.startsWith("DELETE FROM products")) {
      return { rows: [{ id: 7 }] };
    }
    return { rows: [] };
  });
});

afterEach(() => {
  const uploadedPhotos = uploadedPhotoNames.splice(0);
  return Promise.all(
    uploadedPhotos.map((filename) => rm(path.join(getImageUploadDirectory(), filename), { force: true }))
  ).finally(() => jest.restoreAllMocks());
});

afterAll(async () => {
  await dbModule.default.pool.end();
});

test("admin can list the full product master data including unpublished rows", async () => {
  const response = await request(app)
    .get("/api/admin/products?q=Grasso&page=1")
    .set("Authorization", "Bearer admin-token");

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    page: 1,
    pageSize: 25,
    total: 1,
    products: [{
      id: 7,
      photo_id: "GRA-V-CLN-01",
      is_published: false,
    }],
  });
});

test("admin product list supports photo ID, brand, and category filters", async () => {
  const querySpy = jest.spyOn(dbModule.default, "query");
  const response = await request(app)
    .get("/api/admin/products?photoId=GRA-V&brand=Grasso&category=Cylinder%20Liner")
    .set("Authorization", "Bearer admin-token");

  expect(response.status).toBe(200);
  expect(querySpy).toHaveBeenCalledWith(
    expect.stringContaining("photo_id ILIKE $1 AND brand = $2 AND category = $3"),
    ["%GRA-V%", "Grasso", "Cylinder Liner"]
  );
  expect(response.body.filters).toEqual({
    brands: ["Grasso", "Sabroe", "Other"],
    series: [
      { brand: "Grasso", series: "Grasso V Series" },
      { brand: "Grasso", series: "Grasso RC Series" },
      { brand: "Sabroe", series: "Sabroe CMO Series" },
    ],
    seriesByBrand: {
      Grasso: ["Grasso V Series", "Grasso RC Series"],
      Sabroe: ["Sabroe CMO Series"],
    },
    categories: ["Cylinder Liner", "Piston Assembly", "Connecting Rod"],
    modelsBySeries: {
      "Grasso V Series": ["V 300", "V 450"],
      "Sabroe CMO Series": ["CMO 16"],
    },
  });
});

test("client cannot access admin product management endpoints", async () => {
  const response = await request(app)
    .get("/api/admin/products")
    .set("Authorization", "Bearer client-token");

  expect(response.status).toBe(403);
});

test("admin product photo upload saves and replaces the named image", async () => {
  const filename = `admin-photo-${Date.now()}-${Math.random().toString(16).slice(2)}.png`;
  uploadedPhotoNames.push(filename);
  const firstImage = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x01]);
  const replacementImage = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x02]);

  const upload = (image) => request(app)
    .post("/api/admin/products/photo")
    .set("Authorization", "Bearer admin-token")
    .set("X-File-Name", filename)
    .attach("image", image, { filename, contentType: "image/png" });

  const firstResponse = await upload(firstImage);
  expect(firstResponse.status).toBe(201);
  expect(firstResponse.body.file.filename).toBe(filename);

  const replacementResponse = await upload(replacementImage);
  expect(replacementResponse.status).toBe(201);
  expect(replacementResponse.body.file.filename).toBe(filename);
  await expect(readFile(path.join(getImageUploadDirectory(), filename))).resolves.toEqual(replacementImage);
});

test("admin can create, update, and delete product records", async () => {
  const headers = { Authorization: "Bearer admin-token" };
  const created = await request(app)
    .post("/api/admin/products")
    .set(headers)
    .send({ name: "New Product", photo_id: "NEW-01" });
  const updated = await request(app)
    .put("/api/admin/products/7")
    .set(headers)
    .send({ name: "Updated Product" });
  const deleted = await request(app)
    .delete("/api/admin/products/7")
    .set(headers);

  expect(created.status).toBe(201);
  expect(updated.status).toBe(200);
  expect(deleted.status).toBe(200);
});

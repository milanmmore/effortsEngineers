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
  // JWT role mock
  jwtModule.verifyToken.mockImplementation((token) => {
    if (token === "admin-token") {
      return { id: 1, email: "admin@example.com", role: "admin" };
    }
    if (token === "user-token") {
      return { id: 2, email: "user@example.com", role: "user" };
    }
    throw new Error("Invalid token");
  });

  // DB insert mock
  jest.spyOn(dbModule.default, "query").mockImplementation(async (sql, params) => {
    if (sql.startsWith("INSERT INTO products")) {
      return {
        rows: [{
          id: 1,
          name: params[0],
          description: params[1],
          price: params[2],
          brand: params[3],
          category: params[4],
          oem_no: params[5],
          stock_quantity: params[6],
          image_url: params[7],
          stock_status: params[8],
          series: params[9],
          part_number: params[10],
          photo_id: params[11],
          created_at: new Date(),
        }],
      };
    }
    if (sql.startsWith("UPDATE products")) {
      return {
        rows: [{
          id: params[21],
          name: params[0],
          description: params[1],
          price: params[2],
          brand: params[3],
          category: params[4],
          oem_no: params[5],
          stock_quantity: params[6],
          image_url: params[7],
          stock_status: params[8],
          series: params[9],
          part_number: params[10],
          photo_id: params[11],
          created_at: new Date(),
        }],
      };
    }
    if (sql.includes("FROM products")) {
      return {
        rows: [{
          id: 1,
          name: "Admin Product",
          description: "Test",
          price: 100,
          brand: "Grasso",
          category: "Cylinder Liners",
          oem_no: "GRA-RC11-042",
          stock_quantity: 18,
          stock_status: "In Stock",
          image_url: "/images/liners-bushes.jpg",
          series: "RC Series",
          part_number: "GRA-RC11-042",
          photo_id: "GRA-RC11-LIN-01",
          compatible_models: "RC11",
          material_size: "Cast iron",
          created_at: new Date(),
        }],
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

test("admin can create catalog item", async () => {
  const res = await request(app)
    .post("/api/catalog")
    .set("Authorization", "Bearer admin-token")
    .send({
      name: "Admin Product",
      description: "Test",
      price: 100,
      brand: "Grasso",
      category: "Cylinder Liners",
      oem_no: "GRA-RC11-042",
      stock_quantity: 18,
      image_url: "/images/liners-bushes.jpg",
      stock_status: "In Stock",
      series: "RC Series",
      part_number: "GRA-RC11-042",
      photo_id: "GRA-RC11-LIN-01",
    });

  expect(res.status).toBe(201);
  expect(res.body).toMatchObject({
    name: "Admin Product",
    brand: "Grasso",
    category: "Cylinder Liners",
    oem_no: "GRA-RC11-042",
    stock_quantity: 18,
    image_url: "/images/liners-bushes.jpg",
    stock_status: "In Stock",
    series: "RC Series",
    part_number: "GRA-RC11-042",
    photo_id: "GRA-RC11-LIN-01",
  });
});

test("catalog list and item endpoints return product details", async () => {
  const listResponse = await request(app).get("/api/catalog");
  const itemResponse = await request(app).get("/api/catalog/1");

  expect(listResponse.status).toBe(200);
  expect(itemResponse.status).toBe(200);
  expect(Array.isArray(listResponse.body)).toBe(true);
  for (const product of [listResponse.body[0], itemResponse.body]) {
    expect(product).toMatchObject({
      name: "Admin Product",
      brand: "Grasso",
      category: "Cylinder Liners",
      oem_no: "GRA-RC11-042",
      stock_quantity: 18,
      image_url: "/images/liners-bushes.jpg",
    });
  }
});

test("admin can update catalog product details", async () => {
  const res = await request(app)
    .put("/api/catalog/1")
    .set("Authorization", "Bearer admin-token")
    .send({
      name: "Updated Product",
      description: "Updated description",
      price: 125,
      brand: "Bitzer",
      category: "Piston Rings",
      oem_no: "BIT-4N-382",
      stock_quantity: 10,
      image_url: "/images/piston-rings.jpg",
      stock_status: "Low Stock",
      series: "4N Series",
      part_number: "BIT-4N-382",
      photo_id: "BIT-4N-PRG-02",
    });

  expect(res.status).toBe(200);
  expect(res.body).toMatchObject({
    name: "Updated Product",
    brand: "Bitzer",
    category: "Piston Rings",
    oem_no: "BIT-4N-382",
    stock_quantity: 10,
    image_url: "/images/piston-rings.jpg",
  });
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

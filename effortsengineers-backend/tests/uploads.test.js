import { afterEach, jest } from "@jest/globals";
import { unlink } from "node:fs/promises";
import path from "node:path";
import request from "supertest";
import app from "../server.js";
import { getImageUploadDirectory } from "../controllers/uploads.controller.js";

const createdImageFilenames = [];

afterEach(async () => {
  await Promise.all(
    createdImageFilenames
      .splice(0)
      .map((filename) => unlink(path.join(getImageUploadDirectory(), filename)))
  );
  jest.restoreAllMocks();
});

test("uploads a valid PNG and serves it from the returned URL", async () => {
  const pngSignature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  const response = await request(app)
    .post("/api/uploads/images")
    .attach("image", pngSignature, {
      filename: "product.png",
      contentType: "image/png",
    });

  expect(response.status).toBe(201);
  expect(response.body.success).toBe(true);
  expect(response.body.image.filename).toMatch(/^[0-9a-f-]+\.png$/);
  expect(response.body.image.url).toBe(`/uploads/images/${response.body.image.filename}`);
  createdImageFilenames.push(response.body.image.filename);

  const imageResponse = await request(app).get(response.body.image.url);
  expect(imageResponse.status).toBe(200);
  expect(imageResponse.headers["content-type"]).toContain("image/png");
  expect(imageResponse.headers["x-content-type-options"]).toBe("nosniff");
});

test("rejects a file with an unsupported media type", async () => {
  const response = await request(app)
    .post("/api/uploads/images")
    .attach("image", Buffer.from("not an image"), {
      filename: "document.txt",
      contentType: "text/plain",
    });

  expect(response.status).toBe(400);
});

test("rejects a file whose content does not match its declared image type", async () => {
  const response = await request(app)
    .post("/api/uploads/images")
    .attach("image", Buffer.from("not a JPEG"), {
      filename: "image.jpg",
      contentType: "image/jpeg",
    });

  expect(response.status).toBe(400);
});

test("requires an image file", async () => {
  const response = await request(app).post("/api/uploads/images");

  expect(response.status).toBe(400);
});

test("records an uploaded image URL with an inquiry", async () => {
  const attachmentUrl = `/uploads/images/${"123e4567-e89b-42d3-a456-426614174000"}.png`;
  const response = await request(app).post("/api/inquiries").send({
    name: "Test Customer",
    email: "customer@example.com",
    attachment_url: attachmentUrl,
  });

  expect(response.status).toBe(201);
  expect(response.body.inquiry.attachment_url).toBe(attachmentUrl);
  expect(response.body.inquiry.message).toContain(`Attached image: ${attachmentUrl}`);
});

test("rejects inquiry attachment URLs that do not reference stored uploads", async () => {
  const response = await request(app).post("/api/inquiries").send({
    name: "Test Customer",
    email: "customer@example.com",
    attachment_url: "https://example.com/image.png",
  });

  expect(response.status).toBe(400);
});

test("rejects image uploads larger than 5 MB", async () => {
  const oversizedPng = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    Buffer.alloc(5 * 1024 * 1024),
  ]);
  const response = await request(app)
    .post("/api/uploads/images")
    .attach("image", oversizedPng, {
      filename: "large.png",
      contentType: "image/png",
    });

  expect(response.status).toBe(413);
});

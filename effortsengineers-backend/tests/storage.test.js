import { jest } from "@jest/globals";
import path from "node:path";
import fs from "node:fs/promises";
import {
  getImageUploadDirectory,
  getStorageConfig,
  saveFileToStorage,
} from "../services/storage.service.js";

describe("Storage Service", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
  });

  test("resolves default upload directory when no env vars set", () => {
    delete process.env.IMAGE_UPLOAD_DIR;
    delete process.env.RAILWAY_VOLUME_MOUNT_PATH;

    const dir = getImageUploadDirectory();
    expect(dir).toContain("images");
  });

  test("resolves custom directory from IMAGE_UPLOAD_DIR", () => {
    process.env.IMAGE_UPLOAD_DIR = "/custom/persistent/images";
    const dir = getImageUploadDirectory();
    expect(path.normalize(dir)).toBe(path.normalize(path.resolve("/custom/persistent/images")));
  });

  test("resolves Railway volume mount path when RAILWAY_VOLUME_MOUNT_PATH is set", () => {
    delete process.env.IMAGE_UPLOAD_DIR;
    process.env.RAILWAY_VOLUME_MOUNT_PATH = "/data";

    const dir = getImageUploadDirectory();
    expect(path.normalize(dir)).toBe(path.normalize(path.resolve("/data/images")));
  });

  test("getStorageConfig identifies volume vs ephemeral storage", () => {
    delete process.env.IMAGE_UPLOAD_DIR;
    delete process.env.RAILWAY_VOLUME_MOUNT_PATH;
    delete process.env.S3_BUCKET;

    const config = getStorageConfig();
    expect(config.isS3).toBe(false);

    process.env.IMAGE_UPLOAD_DIR = "/data/images";
    const volumeConfig = getStorageConfig();
    expect(volumeConfig.isVolume).toBe(true);
    expect(volumeConfig.isPersistent).toBe(true);
  });

  test("getStorageConfig detects S3 when credentials are provided", () => {
    process.env.S3_BUCKET = "my-test-bucket";
    process.env.AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
    process.env.AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

    const config = getStorageConfig();
    expect(config.isS3).toBe(true);
    expect(config.s3Bucket).toBe("my-test-bucket");
    expect(config.isPersistent).toBe(true);
  });

  test("saveFileToStorage writes buffer to resolved upload directory", async () => {
    const testDir = path.resolve("./test-temp-storage");
    process.env.IMAGE_UPLOAD_DIR = testDir;

    const testBuffer = Buffer.from("test file content");
    const filename = `test-${Date.now()}.png`;

    try {
      const result = await saveFileToStorage({
        filename,
        buffer: testBuffer,
        mimeType: "image/png",
      });

      expect(result.filename).toBe(filename);
      expect(result.url).toBe(`/uploads/images/${filename}`);

      const savedContent = await fs.readFile(path.join(testDir, filename));
      expect(savedContent.equals(testBuffer)).toBe(true);
    } finally {
      try {
        await fs.rm(testDir, { recursive: true, force: true });
      } catch {}
    }
  });
});

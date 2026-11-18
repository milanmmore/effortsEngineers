import fs from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Returns the resolved directory path where uploaded images are persisted.
 * Priority:
 * 1. process.env.IMAGE_UPLOAD_DIR
 * 2. process.env.RAILWAY_VOLUME_MOUNT_PATH (e.g. /data or /data/images)
 * 3. /data/images if /data is an accessible directory (Railway's default volume mount point)
 * 4. Fallback to local ./images directory in the backend folder
 */
export const getImageUploadDirectory = () => {
  if (process.env.IMAGE_UPLOAD_DIR) {
    return path.resolve(process.env.IMAGE_UPLOAD_DIR);
  }

  if (process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    const mount = process.env.RAILWAY_VOLUME_MOUNT_PATH;
    return path.resolve(
      mount.endsWith("images") ? mount : path.join(mount, "images")
    );
  }

  // On Linux containers (such as Railway Nixpacks/Docker), check if /data mount exists
  if (process.platform !== "win32") {
    try {
      if (fs.existsSync("/data")) {
        fs.accessSync("/data", fs.constants.W_OK);
        return path.resolve("/data/images");
      }
    } catch {
      // not accessible, fall through
    }
  }

  return path.resolve(path.join(__dirname, "..", "images"));
};

/**
 * Checks whether persistent storage (Railway Volume or S3) is active.
 */
export const getStorageConfig = () => {
  const uploadDir = getImageUploadDirectory();
  const s3Bucket =
    process.env.S3_BUCKET ||
    process.env.AWS_S3_BUCKET ||
    process.env.AWS_BUCKET_NAME;

  const isS3 = Boolean(
    s3Bucket &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY
  );

  const isVolume = Boolean(
    process.env.IMAGE_UPLOAD_DIR ||
      process.env.RAILWAY_VOLUME_MOUNT_PATH ||
      (process.platform !== "win32" && uploadDir.startsWith("/data"))
  );

  return {
    uploadDir,
    isS3,
    s3Bucket: isS3 ? s3Bucket : null,
    isVolume,
    isPersistent: isS3 || isVolume,
  };
};

/**
 * Initializes and caches an S3Client instance when S3 credentials are present.
 */
let cachedS3Client = null;
export const getS3Client = async () => {
  const { isS3 } = getStorageConfig();
  if (!isS3) return null;

  if (cachedS3Client) return cachedS3Client;

  const { S3Client } = await import("@aws-sdk/client-s3");
  cachedS3Client = new S3Client({
    region: process.env.AWS_REGION || process.env.S3_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT } : {}),
    ...(process.env.S3_FORCE_PATH_STYLE === "true"
      ? { forcePathStyle: true }
      : {}),
  });

  return cachedS3Client;
};

/**
 * Persists an uploaded image buffer to disk (Railway volume or local)
 * and syncs to S3 if configured.
 */
export const saveFileToStorage = async ({
  filename,
  buffer,
  mimeType,
  preserveFilename = false,
}) => {
  const uploadDir = getImageUploadDirectory();
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer, {
    flag: preserveFilename ? "w" : "wx",
    mode: 0o644,
  });

  const s3Client = await getS3Client();
  if (s3Client) {
    try {
      const { PutObjectCommand } = await import("@aws-sdk/client-s3");
      const bucket =
        process.env.S3_BUCKET ||
        process.env.AWS_S3_BUCKET ||
        process.env.AWS_BUCKET_NAME;
      const s3Prefix = (process.env.S3_PREFIX || "uploads/images").replace(
        /^\/|\/$/g,
        ""
      );
      const key = `${s3Prefix}/${filename}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
        })
      );
    } catch (err) {
      console.error(`[STORAGE] Failed to sync ${filename} to S3:`, err.message);
      // Local/volume write succeeded, so we don't abort the upload request
    }
  }

  return {
    filename,
    filePath,
    url: `/uploads/images/${filename}`,
  };
};

/**
 * Fetches an object stream from S3 if configured.
 */
export const fetchFileFromS3 = async (filename) => {
  const s3Client = await getS3Client();
  if (!s3Client) return null;

  try {
    const { GetObjectCommand } = await import("@aws-sdk/client-s3");
    const bucket =
      process.env.S3_BUCKET ||
      process.env.AWS_S3_BUCKET ||
      process.env.AWS_BUCKET_NAME;
    const s3Prefix = (process.env.S3_PREFIX || "uploads/images").replace(
      /^\/|\/$/g,
      ""
    );
    const key = `${s3Prefix}/${filename}`;

    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await s3Client.send(command);
    return response;
  } catch {
    return null;
  }
};

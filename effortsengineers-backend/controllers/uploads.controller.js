import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ApiError from "../utils/ApiError.js";

export const getImageUploadDirectory = () =>
  path.resolve(
    process.env.IMAGE_UPLOAD_DIR ||
      path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "images")
  );

const imageFormats = [
  {
    extension: ".jpg",
    mimeType: "image/jpeg",
    matches: (buffer) =>
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff,
  },
  {
    extension: ".png",
    mimeType: "image/png",
    matches: (buffer) =>
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      ),
  },
  {
    extension: ".webp",
    mimeType: "image/webp",
    matches: (buffer) =>
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP",
  },
];

export const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "An image file is required in the 'image' field.");
  }

  const imageFormat = imageFormats.find(({ matches }) => matches(req.file.buffer));
  if (!imageFormat || imageFormat.mimeType !== req.file.mimetype) {
    throw new ApiError(400, "The uploaded file is not a valid JPEG, PNG, or WebP image.");
  }

  const imageUploadDirectory = getImageUploadDirectory();
  await mkdir(imageUploadDirectory, { recursive: true });

  const filename = `${randomUUID()}${imageFormat.extension}`;
  await writeFile(path.join(imageUploadDirectory, filename), req.file.buffer, {
    flag: "wx",
    mode: 0o644,
  });

  res.status(201).json({
    success: true,
    image: {
      filename,
      url: `/uploads/images/${filename}`,
      mimeType: imageFormat.mimeType,
      size: req.file.size,
    },
  });
};

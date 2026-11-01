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

const uploadFormats = [
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
  {
    extension: ".pdf",
    mimeType: "application/pdf",
    matches: (buffer) => buffer.length >= 5 && buffer.toString("ascii", 0, 5) === "%PDF-",
  },
  {
    extension: ".dwg",
    mimeType: "application/acad",
    matches: (buffer) => buffer.length >= 6 && /^AC\d{4}$/.test(buffer.toString("ascii", 0, 6)),
  },
];

export const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "A file is required in the 'image' field.");
  }

  const extension = path.extname(req.file.originalname).toLowerCase();
  const uploadFormat = uploadFormats.find(
    (format) => format.extension === extension && format.matches(req.file.buffer)
  );
  if (!uploadFormat) {
    throw new ApiError(400, "The uploaded file content does not match a supported file type.");
  }

  if (
    uploadFormat.extension !== ".dwg" &&
    uploadFormat.mimeType !== req.file.mimetype
  ) {
    throw new ApiError(400, "The uploaded file content does not match its declared file type.");
  }

  const imageUploadDirectory = getImageUploadDirectory();
  await mkdir(imageUploadDirectory, { recursive: true });

  const filename = `${randomUUID()}${uploadFormat.extension}`;
  await writeFile(path.join(imageUploadDirectory, filename), req.file.buffer, {
    flag: "wx",
    mode: 0o644,
  });

  res.status(201).json({
    success: true,
    file: {
      filename,
      url: `/uploads/images/${filename}`,
      mimeType: uploadFormat.mimeType,
      size: req.file.size,
    },
    image: {
      filename,
      url: `/uploads/images/${filename}`,
      mimeType: uploadFormat.mimeType,
      size: req.file.size,
    },
  });
};

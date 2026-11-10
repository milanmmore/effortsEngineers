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

const HEIC_BRANDS = new Set([
  "heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs",
]);
const HEIF_BRANDS = new Set([...HEIC_BRANDS, "mif1", "msf1"]);

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
    extension: ".jpeg",
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
    extension: ".heic",
    mimeType: "image/heic",
    matches: (buffer) => {
      if (buffer.length < 12 || buffer.toString("ascii", 4, 8) !== "ftyp") {
        return false;
      }
      return HEIC_BRANDS.has(buffer.toString("ascii", 8, 12));
    },
  },
  {
    extension: ".heif",
    mimeType: "image/heif",
    matches: (buffer) => {
      if (buffer.length < 12 || buffer.toString("ascii", 4, 8) !== "ftyp") {
        return false;
      }
      return HEIF_BRANDS.has(buffer.toString("ascii", 8, 12));
    },
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

const saveUploadedImage = async (req, res, { preserveFilename = false } = {}) => {
  if (!req.file) {
    throw new ApiError(400, "A file is required in the 'image' field.");
  }

  const uploadFormat = uploadFormats.find((format) =>
    format.matches(req.file.buffer)
  );
  if (!uploadFormat) {
    throw new ApiError(
      400,
      "Unsupported file content. Upload a JPEG, PNG, WebP, HEIC / HEIF, PDF, or DWG file."
    );
  }
  if (preserveFilename && !uploadFormat.mimeType.startsWith("image/")) {
    throw new ApiError(400, "Product photos must be image files.");
  }

  const imageUploadDirectory = getImageUploadDirectory();
  await mkdir(imageUploadDirectory, { recursive: true });

  let filename = `${randomUUID()}${uploadFormat.extension}`;
  if (preserveFilename) {
    let requestedFilename;
    try {
      requestedFilename = decodeURIComponent(req.get("x-file-name") || "");
    } catch {
      throw new ApiError(400, "Provide a valid product photo filename.");
    }
    if (
      typeof requestedFilename !== "string" ||
      !/^[\p{L}\p{N}][\p{L}\p{N}._ -]{0,199}$/u.test(requestedFilename) ||
      requestedFilename === "." ||
      requestedFilename === ".."
    ) {
      throw new ApiError(400, "Provide a valid product photo filename.");
    }
    filename = `${path.parse(requestedFilename).name}${uploadFormat.extension}`;
  }
  await writeFile(path.join(imageUploadDirectory, filename), req.file.buffer, {
    flag: preserveFilename ? "w" : "wx",
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

export const uploadImage = (req, res) => saveUploadedImage(req, res);

export const uploadAdminProductImage = (req, res) =>
  saveUploadedImage(req, res, { preserveFilename: true });

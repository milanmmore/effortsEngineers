import multer from "multer";
import path from "node:path";
import ApiError from "../utils/ApiError.js";

const allowedTypesByExtension = {
  ".jpg": new Set(["image/jpeg"]),
  ".jpeg": new Set(["image/jpeg"]),
  ".png": new Set(["image/png"]),
  ".webp": new Set(["image/webp"]),
  ".pdf": new Set(["application/pdf"]),
  ".dwg": new Set([
    "application/acad",
    "application/dwg",
    "application/x-acad",
    "application/x-dwg",
    "image/vnd.dwg",
    "application/octet-stream",
  ]),
};

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },
  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const allowedMimeTypes = allowedTypesByExtension[extension];
    if (!allowedMimeTypes?.has(file.mimetype)) {
      callback(new ApiError(400, "Only JPEG, PNG, WebP, PDF, and DWG files are allowed."));
      return;
    }

    callback(null, true);
  },
});

export default imageUpload;

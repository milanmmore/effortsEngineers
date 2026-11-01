import multer from "multer";
import ApiError from "../utils/ApiError.js";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new ApiError(400, "Only JPEG, PNG, and WebP images are allowed."));
      return;
    }

    callback(null, true);
  },
});

export default imageUpload;

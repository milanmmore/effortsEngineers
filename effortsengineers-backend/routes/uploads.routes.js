import express from "express";
import rateLimit from "express-rate-limit";
import { uploadImage } from "../controllers/uploads.controller.js";
import imageUpload from "../middleware/imageUpload.js";

const router = express.Router();

const fileUploadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many file uploads. Please try again later." },
});

router.post(
  "/images",
  fileUploadRateLimit,
  imageUpload.single("image"),
  uploadImage
);

export default router;

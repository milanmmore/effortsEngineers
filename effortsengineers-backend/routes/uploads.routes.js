import express from "express";
import rateLimit from "express-rate-limit";
import { uploadImage } from "../controllers/uploads.controller.js";
import imageUpload from "../middleware/imageUpload.js";

const router = express.Router();

const imageUploadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many image uploads. Please try again later." },
});

router.post(
  "/images",
  imageUploadRateLimit,
  imageUpload.single("image"),
  uploadImage
);

export default router;

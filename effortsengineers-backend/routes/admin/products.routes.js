import express from "express";
import {
  createAdminProduct,
  deleteAdminProduct,
  listAdminProducts,
  updateAdminProduct,
} from "../../controllers/admin/products.controller.js";
import { uploadAdminProductImage } from "../../controllers/uploads.controller.js";
import { requireAuth, requireRole } from "../../middleware/auth.middleware.js";
import imageUpload from "../../middleware/imageUpload.js";

const router = express.Router();

router.use(requireAuth, requireRole("admin"));
router.get("/", listAdminProducts);
router.post("/photo", imageUpload.single("image"), uploadAdminProductImage);
router.post("/", createAdminProduct);
router.put("/:id", updateAdminProduct);
router.delete("/:id", deleteAdminProduct);

export default router;

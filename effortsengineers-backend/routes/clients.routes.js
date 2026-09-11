// routes/client.routes.js
import express from "express";
import {
  browseCatalog,
  requestQuotation,
  viewClientDashboard,
} from "../controllers/client.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/catalog", browseCatalog);
router.post("/quotation", requestQuotation);
router.get("/dashboard/:client_id", requireAuth, viewClientDashboard);

export default router;

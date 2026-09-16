// routes/inquiries.routes.js
import express from "express";
import { createInquiry, listInquiries } from "../controllers/inquiries.controller.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", listInquiries);

export default router;


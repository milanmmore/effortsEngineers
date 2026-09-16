// routes/chat.routes.js
import express from "express";
import { processChatMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", processChatMessage);

export default router;


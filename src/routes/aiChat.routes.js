import express from "express";
import { askAiAssistant } from "../controllers/aiChat.controller.js";
import rateLimit from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post(
  "/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 120,
    message: "Assistant request limit reached. Please try again in a few minutes."
  }),
  askAiAssistant
);

export default router;

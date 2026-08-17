import express from "express";
import rateLimit from "express-rate-limit";
import { getMe, login, logout } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { loginValidation } from "../validations/auth.validation.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, validate(loginValidation), login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;

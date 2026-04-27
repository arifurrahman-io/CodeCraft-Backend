import express from "express";
import { getMe, login, logout } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { loginValidation } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/login", validate(loginValidation), login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;

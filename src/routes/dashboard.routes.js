import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/stats", protect, authorize("admin", "editor"), getDashboardStats);

export default router;

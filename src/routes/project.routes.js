import express from "express";
import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject
} from "../controllers/project.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { projectValidation } from "../validations/project.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);
router.post("/", manage, validate(projectValidation), createProject);
router.put("/:id", manage, updateProject);
router.delete("/:id", manage, deleteProject);

export default router;

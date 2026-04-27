import express from "express";
import {
  createService,
  deleteService,
  getServiceBySlug,
  getServices,
  updateService
} from "../controllers/service.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { serviceValidation } from "../validations/service.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.get("/", getServices);
router.get("/:slug", getServiceBySlug);
router.post("/", manage, validate(serviceValidation), createService);
router.put("/:id", manage, updateService);
router.delete("/:id", manage, deleteService);

export default router;

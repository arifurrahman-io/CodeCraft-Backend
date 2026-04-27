import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial
} from "../controllers/testimonial.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { testimonialValidation } from "../validations/testimonial.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.get("/", getTestimonials);
router.post("/", manage, validate(testimonialValidation), createTestimonial);
router.put("/:id", manage, updateTestimonial);
router.delete("/:id", manage, deleteTestimonial);

export default router;

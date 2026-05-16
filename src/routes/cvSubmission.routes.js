import express from "express";
import {
  createCvSubmission,
  getCvSubmissionById,
  getCvSubmissions
} from "../controllers/cvSubmission.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { cvSubmissionValidation } from "../validations/cvSubmission.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.post("/", validate(cvSubmissionValidation), createCvSubmission);
router.get("/", manage, getCvSubmissions);
router.get("/:id", manage, getCvSubmissionById);

export default router;

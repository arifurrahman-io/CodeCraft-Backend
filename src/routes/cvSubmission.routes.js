import express from "express";
import rateLimit from "express-rate-limit";
import {
  createCvSubmission,
  getCvSubmissionById,
  getCvSubmissions,
  updateCvSubmissionStatus
} from "../controllers/cvSubmission.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { cvSubmissionValidation } from "../validations/cvSubmission.validation.js";
import { cvStatusValidation } from "../validations/cvStatus.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

const publicSubmitLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many CV submissions. Please try again later.",
  },
});

router.post(
  "/",
  publicSubmitLimit,
  validate(cvSubmissionValidation),
  createCvSubmission
);
router.get("/", manage, getCvSubmissions);
router.get("/:id", manage, getCvSubmissionById);
router.patch(
  "/:id/status",
  manage,
  validate(cvStatusValidation),
  updateCvSubmissionStatus
);

export default router;

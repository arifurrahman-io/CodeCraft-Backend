import express from "express";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember
} from "../controllers/team.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { teamValidation } from "../validations/team.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.get("/", getTeamMembers);
router.post("/", manage, validate(teamValidation), createTeamMember);
router.put("/:id", manage, updateTeamMember);
router.delete("/:id", manage, deleteTeamMember);

export default router;

import express from "express";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContactStatus
} from "../controllers/contact.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { contactValidation } from "../validations/contact.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.post("/", validate(contactValidation), createContact);
router.get("/", manage, getContacts);
router.get("/:id", manage, getContactById);
router.put("/:id/status", manage, updateContactStatus);
router.delete("/:id", manage, deleteContact);

export default router;

import express from "express";
import { deleteUploadedImage, uploadImage } from "../controllers/upload.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.post("/", manage, upload.single("image"), uploadImage);
router.delete("/", manage, deleteUploadedImage);

export default router;

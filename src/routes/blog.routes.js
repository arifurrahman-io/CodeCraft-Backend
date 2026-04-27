import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog
} from "../controllers/blog.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { blogValidation } from "../validations/blog.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", manage, validate(blogValidation), createBlog);
router.put("/:id", manage, updateBlog);
router.delete("/:id", manage, deleteBlog);

export default router;

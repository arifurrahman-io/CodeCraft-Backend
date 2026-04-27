import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import { createUniqueSlug } from "../utils/slugify.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid blog id");
  }
};

const withPublishDate = (data) => {
  if (data.isPublished === true && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  return data;
};

export const getBlogs = asyncHandler(async (req, res) => {
  const query = { isPublished: true };
  if (req.query.category) query.category = req.query.category;
  if (req.query.tag) query.tags = req.query.tag;
  if (req.query.search) query.$text = { $search: req.query.search };

  const blogs = await Blog.find(query)
    .populate("author", "name email avatar role")
    .sort({ publishedAt: -1, createdAt: -1 });

  return sendResponse(res, 200, "Blogs fetched successfully", { blogs });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  ).populate("author", "name email avatar role");

  if (!blog) throw new ApiError(404, "Blog not found");

  return sendResponse(res, 200, "Blog fetched successfully", { blog });
});

export const createBlog = asyncHandler(async (req, res) => {
  const slug = await createUniqueSlug(Blog, req.body.title);
  const blog = await Blog.create(withPublishDate({ ...req.body, slug, author: req.user._id }));

  return sendResponse(res, 201, "Blog created successfully", { blog });
});

export const updateBlog = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const data = withPublishDate({ ...req.body });
  if (data.title) {
    data.slug = await createUniqueSlug(Blog, data.title, req.params.id);
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  }).populate("author", "name email avatar role");

  if (!blog) throw new ApiError(404, "Blog not found");

  return sendResponse(res, 200, "Blog updated successfully", { blog });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) throw new ApiError(404, "Blog not found");

  return sendResponse(res, 200, "Blog deleted successfully");
});

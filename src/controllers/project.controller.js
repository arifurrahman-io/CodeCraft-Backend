import mongoose from "mongoose";
import Project from "../models/project.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import { createUniqueSlug } from "../utils/slugify.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid project id");
  }
};

export const getProjects = asyncHandler(async (req, res) => {
  const query = { isActive: true };
  if (req.query.featured === "true") query.isFeatured = true;
  if (req.query.category) query.category = req.query.category;
  if (req.query.search) query.$text = { $search: req.query.search };

  const projects = await Project.find(query).sort({ completedAt: -1, createdAt: -1 });
  return sendResponse(res, 200, "Projects fetched successfully", { projects });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug, isActive: true });
  if (!project) throw new ApiError(404, "Project not found");

  return sendResponse(res, 200, "Project fetched successfully", { project });
});

export const createProject = asyncHandler(async (req, res) => {
  const slug = await createUniqueSlug(Project, req.body.title);
  const project = await Project.create({ ...req.body, slug });

  return sendResponse(res, 201, "Project created successfully", { project });
});

export const updateProject = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const data = { ...req.body };
  if (data.title) {
    data.slug = await createUniqueSlug(Project, data.title, req.params.id);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  if (!project) throw new ApiError(404, "Project not found");

  return sendResponse(res, 200, "Project updated successfully", { project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) throw new ApiError(404, "Project not found");

  return sendResponse(res, 200, "Project deleted successfully");
});

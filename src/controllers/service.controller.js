import mongoose from "mongoose";
import Service from "../models/service.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import { createUniqueSlug } from "../utils/slugify.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid service id");
  }
};

export const getServices = asyncHandler(async (req, res) => {
  const query = { isActive: true };
  if (req.query.featured === "true") query.isFeatured = true;
  if (req.query.search) query.$text = { $search: req.query.search };

  const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
  return sendResponse(res, 200, "Services fetched successfully", { services });
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug, isActive: true });
  if (!service) throw new ApiError(404, "Service not found");

  return sendResponse(res, 200, "Service fetched successfully", { service });
});

export const createService = asyncHandler(async (req, res) => {
  const slug = await createUniqueSlug(Service, req.body.title);
  const service = await Service.create({ ...req.body, slug });

  return sendResponse(res, 201, "Service created successfully", { service });
});

export const updateService = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const data = { ...req.body };
  if (data.title) {
    data.slug = await createUniqueSlug(Service, data.title, req.params.id);
  }

  const service = await Service.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  if (!service) throw new ApiError(404, "Service not found");

  return sendResponse(res, 200, "Service updated successfully", { service });
});

export const deleteService = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) throw new ApiError(404, "Service not found");

  return sendResponse(res, 200, "Service deleted successfully");
});

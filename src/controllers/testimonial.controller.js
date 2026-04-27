import mongoose from "mongoose";
import Testimonial from "../models/testimonial.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid testimonial id");
  }
};

export const getTestimonials = asyncHandler(async (_req, res) => {
  const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  return sendResponse(res, 200, "Testimonials fetched successfully", { testimonials });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  return sendResponse(res, 201, "Testimonial created successfully", { testimonial });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  return sendResponse(res, 200, "Testimonial updated successfully", { testimonial });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  return sendResponse(res, 200, "Testimonial deleted successfully");
});

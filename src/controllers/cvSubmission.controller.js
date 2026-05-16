import CvSubmission from "../models/cvSubmission.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid CV submission id");
  }
};

export const createCvSubmission = asyncHandler(async (req, res) => {
  const submission = await CvSubmission.create(req.body);
  return sendResponse(res, 201, "CV submitted successfully", { submission });
});

export const getCvSubmissions = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.status) query.status = req.query.status;

  const submissions = await CvSubmission.find(query).sort({ createdAt: -1 });
  return sendResponse(res, 200, "CV submissions fetched successfully", {
    submissions
  });
});

export const getCvSubmissionById = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const submission = await CvSubmission.findById(req.params.id);
  if (!submission) throw new ApiError(404, "CV submission not found");

  return sendResponse(res, 200, "CV submission fetched successfully", {
    submission
  });
});

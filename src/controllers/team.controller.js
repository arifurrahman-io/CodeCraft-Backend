import mongoose from "mongoose";
import Team from "../models/team.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid team member id");
  }
};

export const getTeamMembers = asyncHandler(async (_req, res) => {
  const teamMembers = await Team.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  return sendResponse(res, 200, "Team members fetched successfully", { teamMembers });
});

export const createTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await Team.create(req.body);
  return sendResponse(res, 201, "Team member created successfully", { teamMember });
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const teamMember = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!teamMember) throw new ApiError(404, "Team member not found");

  return sendResponse(res, 200, "Team member updated successfully", { teamMember });
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const teamMember = await Team.findByIdAndDelete(req.params.id);

  if (!teamMember) throw new ApiError(404, "Team member not found");

  return sendResponse(res, 200, "Team member deleted successfully");
});

import Settings from "../models/settings.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/apiResponse.js";

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return settings;
};

export const getSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();
  return sendResponse(res, 200, "Settings fetched successfully", { settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const existing = await getOrCreateSettings();
  const settings = await Settings.findByIdAndUpdate(existing._id, req.body, {
    new: true,
    runValidators: true
  });

  return sendResponse(res, 200, "Settings updated successfully", { settings });
});

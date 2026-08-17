import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";
import { hasCloudinaryConfig } from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import deleteImage from "../utils/deleteImage.js";
import { assertValidImageBuffer } from "../middleware/upload.middleware.js";

const ALLOWED_FOLDERS = new Set([
  "codecraft-bd",
  "services",
  "projects",
  "blogs",
  "team",
  "testimonials",
  "settings",
  "uploads",
]);

const sanitizeFolder = (folder) => {
  const value = String(folder || "codecraft-bd")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]/g, "");

  const root = value.split("/")[0] || "codecraft-bd";
  return ALLOWED_FOLDERS.has(root) ? root : "codecraft-bd";
};

const uploadBufferToCloudinary = (fileBuffer, folder = "codecraft-bd") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      },
    );

    Readable.from(fileBuffer).pipe(stream);
  });
};

export const uploadImage = asyncHandler(async (req, res) => {
  if (!hasCloudinaryConfig()) {
    throw new ApiError(500, "Cloudinary credentials are not configured");
  }

  assertValidImageBuffer(req.file);

  const folder = sanitizeFolder(req.body.folder);
  const result = await uploadBufferToCloudinary(req.file.buffer, folder);

  return sendResponse(res, 201, "Image uploaded successfully", {
    url: result.secure_url,
    publicId: result.public_id,
  });
});

export const deleteUploadedImage = asyncHandler(async (req, res) => {
  const publicId = req.body.publicId || req.query.publicId;

  if (!publicId || typeof publicId !== "string" || publicId.includes("..")) {
    throw new ApiError(400, "A valid publicId is required");
  }

  await deleteImage(publicId);

  return sendResponse(res, 200, "Image deleted successfully");
});

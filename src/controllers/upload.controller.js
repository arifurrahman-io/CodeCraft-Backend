import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";
import { hasCloudinaryConfig } from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import deleteImage from "../utils/deleteImage.js";

const uploadBufferToCloudinary = (fileBuffer, folder = "codecraft-bd") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image"
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    Readable.from(fileBuffer).pipe(stream);
  });
};

export const uploadImage = asyncHandler(async (req, res) => {
  if (!hasCloudinaryConfig()) {
    throw new ApiError(500, "Cloudinary credentials are not configured");
  }

  if (!req.file) {
    throw new ApiError(400, "Image file is required");
  }

  const result = await uploadBufferToCloudinary(req.file.buffer, req.body.folder || "codecraft-bd");

  return sendResponse(res, 201, "Image uploaded successfully", {
    url: result.secure_url,
    publicId: result.public_id
  });
});

export const deleteUploadedImage = asyncHandler(async (req, res) => {
  const publicId = req.body.publicId || req.query.publicId;
  await deleteImage(publicId);

  return sendResponse(res, 200, "Image deleted successfully");
});

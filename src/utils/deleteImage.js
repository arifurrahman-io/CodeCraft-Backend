import cloudinary from "../config/cloudinary.js";
import { hasCloudinaryConfig } from "../config/env.js";
import ApiError from "./apiError.js";

const deleteImage = async (publicId) => {
  if (!publicId) {
    throw new ApiError(400, "Image publicId is required");
  }

  if (!hasCloudinaryConfig()) {
    throw new ApiError(500, "Cloudinary credentials are not configured");
  }

  return cloudinary.uploader.destroy(publicId);
};

export default deleteImage;

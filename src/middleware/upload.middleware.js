import multer from "multer";
import ApiError from "../utils/apiError.js";

const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const matchesMagicBytes = (buffer, mime) => {
  if (!buffer || buffer.length < 12) return false;

  if (mime === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mime === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  if (mime === "image/gif") {
    return (
      buffer[0] === 0x47 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x38
    );
  }

  if (mime === "image/webp") {
    return (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    );
  }

  return false;
};

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (!ALLOWED_MIMES.has(file.mimetype)) {
    cb(new ApiError(400, "Only JPEG, PNG, WebP, and GIF images are allowed"));
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const assertValidImageBuffer = (file) => {
  if (!file?.buffer) {
    throw new ApiError(400, "Image file is required");
  }

  if (!ALLOWED_MIMES.has(file.mimetype)) {
    throw new ApiError(400, "Only JPEG, PNG, WebP, and GIF images are allowed");
  }

  if (!matchesMagicBytes(file.buffer, file.mimetype)) {
    throw new ApiError(400, "Image content does not match its declared type");
  }
};

export default upload;

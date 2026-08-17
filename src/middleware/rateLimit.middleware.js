import ApiError from "../utils/apiError.js";

const visitors = new Map();

const rateLimit = ({
  windowMs = 15 * 60 * 1000,
  maxRequests = 30,
  message = "Too many requests. Please try again later."
} = {}) => {
  return (req, _res, next) => {
    const now = Date.now();
    const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const current = visitors.get(key);

    if (!current || current.resetAt <= now) {
      visitors.set(key, {
        count: 1,
        resetAt: now + windowMs
      });
      return next();
    }

    if (current.count >= maxRequests) {
      return next(new ApiError(429, message));
    }

    current.count += 1;
    visitors.set(key, current);
    return next();
  };
};

export default rateLimit;

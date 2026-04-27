import ApiError from "../utils/apiError.js";

const validate = (rules = []) => (req, _res, next) => {
  const errors = rules
    .map((rule) => rule(req))
    .flat()
    .filter(Boolean);

  if (errors.length) {
    return next(new ApiError(400, errors[0], errors));
  }

  return next();
};

export const isRequired = (field, label = field) => (req) => {
  const value = req.body[field];
  if (value === undefined || value === null || String(value).trim() === "") {
    return `${label} is required`;
  }
  return null;
};

export const isEmail = (field, label = field) => (req) => {
  const value = req.body[field];
  if (value && !/^\S+@\S+\.\S+$/.test(String(value))) {
    return `${label} must be a valid email`;
  }
  return null;
};

export const minLength = (field, length, label = field) => (req) => {
  const value = req.body[field];
  if (value && String(value).length < length) {
    return `${label} must be at least ${length} characters`;
  }
  return null;
};

export const isArray = (field, label = field) => (req) => {
  const value = req.body[field];
  if (value !== undefined && !Array.isArray(value)) {
    return `${label} must be an array`;
  }
  return null;
};

export const isIn = (field, allowed, label = field) => (req) => {
  const value = req.body[field];
  if (value !== undefined && !allowed.includes(value)) {
    return `${label} must be one of: ${allowed.join(", ")}`;
  }
  return null;
};

export default validate;

import { isArray, isRequired } from "../middleware/validate.middleware.js";

export const projectValidation = [
  isRequired("title", "Title"),
  isRequired("category", "Category"),
  isRequired("shortDescription", "Short description"),
  isRequired("description", "Description"),
  isArray("features", "Features"),
  isArray("technologies", "Technologies"),
  isArray("images", "Images")
];

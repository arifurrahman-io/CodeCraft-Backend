import { isArray, isRequired } from "../middleware/validate.middleware.js";

export const serviceValidation = [
  isRequired("title", "Title"),
  isRequired("shortDescription", "Short description"),
  isRequired("description", "Description"),
  isArray("features", "Features"),
  isArray("technologies", "Technologies")
];

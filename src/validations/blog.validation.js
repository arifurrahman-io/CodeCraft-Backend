import { isArray, isRequired } from "../middleware/validate.middleware.js";

export const blogValidation = [
  isRequired("title", "Title"),
  isRequired("excerpt", "Excerpt"),
  isRequired("content", "Content"),
  isRequired("category", "Category"),
  isArray("tags", "Tags")
];

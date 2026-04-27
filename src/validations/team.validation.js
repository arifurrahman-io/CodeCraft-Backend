import { isArray, isRequired } from "../middleware/validate.middleware.js";

export const teamValidation = [
  isRequired("name", "Name"),
  isRequired("designation", "Designation"),
  isArray("skills", "Skills")
];

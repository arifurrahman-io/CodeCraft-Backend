import { isIn, isRequired } from "../middleware/validate.middleware.js";

export const cvStatusValidation = [
  isRequired("status", "Status"),
  isIn(
    "status",
    ["new", "reviewing", "shortlisted", "rejected"],
    "Status"
  )
];

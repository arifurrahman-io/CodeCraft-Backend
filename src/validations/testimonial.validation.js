import { isRequired } from "../middleware/validate.middleware.js";

export const testimonialValidation = [
  isRequired("clientName", "Client name"),
  isRequired("review", "Review")
];

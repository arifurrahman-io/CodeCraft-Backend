import { isEmail, isRequired } from "../middleware/validate.middleware.js";

export const contactValidation = [
  isRequired("name", "Name"),
  isRequired("email", "Email"),
  isEmail("email", "Email"),
  isRequired("message", "Message")
];

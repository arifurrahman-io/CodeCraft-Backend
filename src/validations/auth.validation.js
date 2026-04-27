import { isEmail, isRequired, minLength } from "../middleware/validate.middleware.js";

export const loginValidation = [
  isRequired("email", "Email"),
  isEmail("email", "Email"),
  isRequired("password", "Password"),
  minLength("password", 6, "Password")
];

import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";
import generateToken from "../utils/generateToken.js";
import { isProduction } from "../config/env.js";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, cookieOptions);

  const safeUser = user.toJSON();
  delete safeUser.password;
  return sendResponse(res, 200, "Login successful", { token, user: safeUser });
});

export const getMe = asyncHandler(async (req, res) => {
  return sendResponse(res, 200, "User fetched successfully", { user: req.user });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
  });

  return sendResponse(res, 200, "Logout successful");
});

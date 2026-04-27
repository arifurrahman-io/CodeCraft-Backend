import ApiError from "../utils/apiError.js";

export const authorize = (...roles) => {
  return (req, _res, next) => {
    try {
      if (!req.user) {
        return next(new ApiError(401, "Unauthorized access"));
      }

      if (!roles.includes(req.user.role)) {
        return next(
          new ApiError(
            403,
            "You do not have permission to perform this action",
          ),
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;

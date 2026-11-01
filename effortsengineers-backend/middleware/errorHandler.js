// middleware/errorHandler.js
import ApiError from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode ||
    (err.name === "MulterError"
      ? err.code === "LIMIT_FILE_SIZE"
        ? 413
        : 400
      : 500);
  const message =
    err.name === "MulterError" && err.code === "LIMIT_FILE_SIZE"
      ? "File exceeds the 5 MB upload limit."
      : err.name === "MulterError"
        ? "Invalid file upload."
        : err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

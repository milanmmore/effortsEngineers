const ApiError = require('../utils/ApiError');

// 404 for unmatched routes
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// Final error handler - always returns { error: { message } }
const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && statusCode >= 500 ? { stack: err.stack } : {}),
    },
  });
};

module.exports = { notFound, errorHandler };

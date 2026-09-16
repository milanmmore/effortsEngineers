const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');

// Verifies the Bearer token and attaches { id, role, email } to req.user
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, 'Authentication token missing'));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { id, role, email }
    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

// Usage: requireRole('admin')  or  requireRole('admin', 'client')
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }
  next();
};

module.exports = { requireAuth, requireRole };

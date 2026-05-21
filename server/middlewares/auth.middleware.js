// middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/user');

const getCookieValue = (cookieHeader, key) => {
  if (!cookieHeader) return null;

  const cookie = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${key}=`));

  return cookie ? decodeURIComponent(cookie.slice(key.length + 1)) : null;
};

// ================= AUTHENTICATE =================
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;
    const cookieToken = getCookieValue(req.headers.cookie, 'token');
    const token = bearerToken || cookieToken;

    if (!token) {
      return next(new AppError('Unauthorized: No token provided', 401));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError('Unauthorized: User not found', 401));
    }

    req.user = user;
    next();

  } catch (err) {
    return next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};

// ================= AUTHORIZATION =================
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized: Please login first', 401));
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return next(new AppError('Forbidden: Access denied', 403));
    }

    next();
  };
};

// ================= COMBINED =================
exports.protect = (...roles) => [
  authenticate,
  restrictTo(...roles)
];



import env from '../config/env.js';

/**
 * Custom application error class for operational errors
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 Not Found middleware for unmatched routes
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`
  });
}

/**
 * Centralized error-handling middleware
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProduction = env.isProduction;

  // Log error details on server
  if (statusCode >= 500) {
    console.error(`[SERVER ERROR] ${req.method} ${req.originalUrl}:`, err);
  } else {
    console.warn(`[CLIENT ERROR] ${req.method} ${req.originalUrl} - ${statusCode}: ${err.message}`);
  }

  // Consistent response format
  const response = {
    success: false,
    message: isProduction && !err.isOperational
      ? 'Something went wrong.'
      : err.message || 'Something went wrong.'
  };

  // Only attach debug stack in non-production environments if requested
  if (!isProduction && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

export default {
  AppError,
  notFoundHandler,
  errorHandler
};

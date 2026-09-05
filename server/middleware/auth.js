import { AppError } from './errorHandler.js';

/**
 * Authentication middleware placeholder for admin-protected routes.
 * Will be fully implemented in the Admin phase.
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError('Unauthorized: Authentication required.', 401));
  }
  next();
}

export default {
  requireAuth
};

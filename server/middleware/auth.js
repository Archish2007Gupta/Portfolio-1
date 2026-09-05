/**
 * Authentication middleware ensuring request has an active authenticated admin session.
 * Validates session-stored admin credentials and rejects unauthenticated requests.
 */
export function requireAdmin(req, res, next) {
  if (!req.session || !req.session.admin || !req.session.admin.id) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  // Attach session admin data to request for controller convenience
  req.admin = req.session.admin;
  next();
}

// Keep requireAuth as an alias for consistency
export const requireAuth = requireAdmin;

export default {
  requireAdmin,
  requireAuth
};

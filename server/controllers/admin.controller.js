import bcrypt from 'bcrypt';
import { getDb } from '../db/database.js';
import { AppError } from '../middleware/errorHandler.js';

// Constant-time dummy hash to mitigate user enumeration timing attacks
const DUMMY_HASH = '$2b$10$wOdf8tV61hF7s7lB03gZ1u0KxIov8Ld44j5jZ7a0P7o9oZ3e3nO6q';

export const adminController = {
  /**
   * Handle admin login
   * POST /api/admin/login
   */
  async login(req, res, next) {
    try {
      const { username, password } = req.body || {};

      // Server-side input validation
      if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials.'
        });
      }

      // Enforce reasonable maximum lengths and trim username
      const cleanUsername = username.trim();
      if (cleanUsername.length === 0 || cleanUsername.length > 100 || password.length > 256) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials.'
        });
      }

      const db = getDb();

      // Parameterized SQL query - never string concatenation
      const adminUser = db.prepare(
        'SELECT id, username, password_hash FROM admin_users WHERE username = ?'
      ).get(cleanUsername);

      // Perform bcrypt comparison (against user hash or dummy hash to prevent timing attack)
      const targetHash = adminUser ? adminUser.password_hash : DUMMY_HASH;
      const isValid = await bcrypt.compare(password, targetHash);

      if (!adminUser || !isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
      }

      // Session regeneration prevents session fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          return next(new AppError('Failed to establish secure session.', 500));
        }

        // Store minimal, non-sensitive admin identity in session
        req.session.admin = {
          id: adminUser.id,
          username: adminUser.username,
          authenticatedAt: new Date().toISOString()
        };

        req.session.save((saveErr) => {
          if (saveErr) {
            return next(new AppError('Failed to save session.', 500));
          }

          return res.status(200).json({
            success: true,
            message: 'Login successful.'
          });
        });
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Handle admin logout
   * POST /api/admin/logout
   */
  async logout(req, res, next) {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            return next(new AppError('Failed to destroy session.', 500));
          }

          // Clear HTTP-only session cookie
          res.clearCookie('portfolio_sid', {
            path: '/',
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? (process.env.COOKIE_SAMESITE || 'lax') : 'lax',
            secure: process.env.NODE_ENV === 'production'
          });

          return res.status(200).json({
            success: true,
            message: 'Logged out successfully.'
          });
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully.'
        });
      }
    } catch (err) {
      next(err);
    }
  },

  /**
   * Check current session status
   * GET /api/admin/session
   */
  async getSession(req, res, next) {
    try {
      if (req.session && req.session.admin && req.session.admin.id) {
        return res.status(200).json({
          success: true,
          authenticated: true,
          admin: {
            username: req.session.admin.username
          }
        });
      }

      return res.status(200).json({
        success: true,
        authenticated: false
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Protected dashboard stats endpoint placeholder
   * GET /api/admin/stats
   */
  async getDashboardStats(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        message: 'Admin Dashboard: Future admin features will appear here.',
        admin: {
          username: req.admin.username
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

export default adminController;

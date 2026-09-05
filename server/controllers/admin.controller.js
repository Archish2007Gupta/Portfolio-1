import bcrypt from 'bcrypt';
import { getDb } from '../db/database.js';
import { AppError } from '../middleware/errorHandler.js';

// Constant-time dummy hash to mitigate user enumeration timing attacks
const DUMMY_HASH = '$2b$10$wOdf8tV61hF7s7lB03gZ1u0KxIov8Ld44j5jZ7a0P7o9oZ3e3nO6q';

// Allowed message status values
const ALLOWED_STATUSES = ['new', 'read', 'archived'];

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
   * Protected dashboard stats endpoint
   * GET /api/admin/stats
   */
  async getDashboardStats(req, res, next) {
    try {
      const db = getDb();
      const totalRow = db.prepare('SELECT COUNT(*) as count FROM contacts').get();
      const newRow = db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'").get();
      const readRow = db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'read'").get();
      const archivedRow = db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'archived'").get();

      res.status(200).json({
        success: true,
        stats: {
          newMessages: newRow ? newRow.count : 0,
          totalMessages: totalRow ? totalRow.count : 0,
          readMessages: readRow ? readRow.count : 0,
          archivedMessages: archivedRow ? archivedRow.count : 0
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Retrieve contact messages with filtering, searching, and pagination
   * GET /api/admin/messages
   */
  async getMessages(req, res, next) {
    try {
      const { status, search, page: pageQuery, limit: limitQuery } = req.query;

      // Status filter validation
      if (status && !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status filter. Allowed values: new, read, archived.'
        });
      }

      // Pagination defaults & limits
      const page = Math.max(1, parseInt(pageQuery, 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(limitQuery, 10) || 20));
      const offset = (page - 1) * limit;

      const db = getDb();
      const conditions = [];
      const params = [];

      // Filter by status
      if (status) {
        conditions.push('status = ?');
        params.push(status);
      }

      // Search across name, email, subject, and message
      if (search && typeof search === 'string' && search.trim().length > 0) {
        const cleanSearch = search.trim().slice(0, 100);
        const term = `%${cleanSearch}%`;
        conditions.push('(name LIKE ? OR email LIKE ? OR (subject IS NOT NULL AND subject LIKE ?) OR message LIKE ?)');
        params.push(term, term, term, term);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // Count total matching records
      const countRow = db.prepare(`SELECT COUNT(*) as total FROM contacts ${whereClause}`).get(...params);
      const total = countRow ? countRow.total : 0;

      // Fetch paged records ordered newest first
      const messages = db.prepare(`
        SELECT id, name, email, subject, message, status, created_at
        FROM contacts
        ${whereClause}
        ORDER BY created_at DESC, id DESC
        LIMIT ? OFFSET ?
      `).all(...params, limit, offset);

      res.status(200).json({
        success: true,
        messages,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit) || 1
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Update message status
   * PATCH /api/admin/messages/:id
   */
  async updateMessageStatus(req, res, next) {
    try {
      const messageId = parseInt(req.params.id, 10);
      if (isNaN(messageId) || messageId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid message ID.'
        });
      }

      const { status } = req.body || {};
      if (!status || !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Allowed values: new, read, archived.'
        });
      }

      const db = getDb();

      // Verify message exists
      const existing = db.prepare('SELECT id FROM contacts WHERE id = ?').get(messageId);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: 'Message not found.'
        });
      }

      // Update status
      db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, messageId);

      res.status(200).json({
        success: true,
        message: 'Message status updated successfully.'
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Delete message
   * DELETE /api/admin/messages/:id
   */
  async deleteMessage(req, res, next) {
    try {
      const messageId = parseInt(req.params.id, 10);
      if (isNaN(messageId) || messageId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid message ID.'
        });
      }

      const db = getDb();

      // Verify message exists
      const existing = db.prepare('SELECT id FROM contacts WHERE id = ?').get(messageId);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: 'Message not found.'
        });
      }

      // Delete message
      db.prepare('DELETE FROM contacts WHERE id = ?').run(messageId);

      res.status(200).json({
        success: true,
        message: 'Message deleted successfully.'
      });
    } catch (err) {
      next(err);
    }
  }
};

export default adminController;

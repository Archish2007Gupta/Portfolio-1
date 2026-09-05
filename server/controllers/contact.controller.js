import { getDb } from '../db/database.js';
import logger from '../utils/logger.js';

// Basic RFC 5322 compatible email format regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactController = {
  /**
   * Handle public contact form submissions
   * POST /api/contact
   */
  async submitContact(req, res, next) {
    try {
      const { name, email, message, subject, role } = req.body || {};

      // 1. Validation - Name
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid name.'
        });
      }
      const cleanName = name.trim();
      if (cleanName.length === 0 || cleanName.length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Name must be between 1 and 100 characters.'
        });
      }

      // 2. Validation - Email
      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.'
        });
      }
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail.length === 0 || cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.'
        });
      }

      // 3. Validation - Message
      if (!message || typeof message !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Please provide a message.'
        });
      }
      const cleanMessage = message.trim();
      if (cleanMessage.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Message cannot be empty.'
        });
      }
      if (cleanMessage.length > 5000) {
        return res.status(400).json({
          success: false,
          message: 'Message exceeds maximum allowed length of 5000 characters.'
        });
      }

      // Optional subject or role
      const rawSubject = subject || role || '';
      const cleanSubject = typeof rawSubject === 'string' ? rawSubject.trim().slice(0, 200) : null;

      const db = getDb();

      // 4. Duplicate submission protection (prevent rapid identical submission within 30 seconds)
      const recentDuplicate = db.prepare(`
        SELECT id FROM contacts 
        WHERE email = ? AND message = ? AND created_at >= datetime('now', '-30 seconds')
        LIMIT 1
      `).get(cleanEmail, cleanMessage);

      if (recentDuplicate) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate message detected. Please wait before submitting again.'
        });
      }

      // 5. Parameterized SQL query for insertion
      const stmt = db.prepare(`
        INSERT INTO contacts (name, email, subject, message, status, created_at)
        VALUES (?, ?, ?, ?, 'new', CURRENT_TIMESTAMP)
      `);

      stmt.run(cleanName, cleanEmail, cleanSubject, cleanMessage);

      logger.info(`New contact message logged from ${cleanEmail} (name: ${cleanName})`);

      // 6. Success response (201 Created)
      return res.status(201).json({
        success: true,
        message: 'Message sent successfully.'
      });

    } catch (err) {
      logger.error('Error inserting contact submission:', err);
      return res.status(500).json({
        success: false,
        message: 'Unable to send your message right now. Please try again later.'
      });
    }
  },

  /**
   * Placeholder for future admin message retrieval (Phase 4)
   * GET /api/contact
   */
  async getMessages(req, res, next) {
    try {
      res.status(501).json({
        success: false,
        message: 'Get messages endpoint not yet implemented.'
      });
    } catch (err) {
      next(err);
    }
  }
};

export default contactController;

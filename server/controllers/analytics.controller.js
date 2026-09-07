import analyticsService, { ALLOWED_EVENTS, ALLOWED_RANGES } from '../services/analytics.service.js';

export const analyticsController = {
  /**
   * Public event recording endpoint.
   * Rate limited, validated, privacy-conscious.
   * POST /api/analytics/events
   */
  async recordEvent(req, res) {
    try {
      const body = req.body;

      // 1. Validate payload presence and type
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request payload format.'
        });
      }

      // 2. Strict payload size limit (max 2KB)
      const rawString = JSON.stringify(body);
      if (rawString.length > 2048) {
        return res.status(400).json({
          success: false,
          message: 'Payload size exceeds limit.'
        });
      }

      // 3. Strict field whitelist (do not accept arbitrary metadata objects)
      const allowedKeys = new Set(['event', 'section', 'target', 'session_id', 'sessionId']);
      for (const key of Object.keys(body)) {
        if (!allowedKeys.has(key)) {
          return res.status(400).json({
            success: false,
            message: `Unexpected payload field: '${key}'.`
          });
        }
      }

      const { event, section, target } = body;
      const sessionId = body.session_id || body.sessionId;

      if (!event || typeof event !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Field "event" is required and must be a string.'
        });
      }

      if (!sessionId || typeof sessionId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Field "session_id" is required and must be a string.'
        });
      }

      if (!ALLOWED_EVENTS.includes(event.trim())) {
        return res.status(400).json({
          success: false,
          message: `Unknown event type '${event}'.`
        });
      }

      analyticsService.recordEvent({
        event: event.trim(),
        section: section ? String(section) : null,
        target: target ? String(target) : null,
        sessionId: String(sessionId)
      });

      return res.status(200).json({
        success: true
      });
    } catch (err) {
      console.error('[ANALYTICS CONTROLLER] Error recording event:', err.message);
      return res.status(400).json({
        success: false,
        message: err.message || 'Unable to record analytics event.'
      });
    }
  },

  /**
   * Admin-only summary metrics endpoint.
   * Requires requireAdmin middleware.
   * GET /api/admin/analytics/summary
   */
  async getSummary(req, res) {
    try {
      const summary = analyticsService.getSummary();
      return res.status(200).json({
        success: true,
        summary
      });
    } catch (err) {
      console.error('[ANALYTICS CONTROLLER] Error getting summary:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error calculating analytics summary.'
      });
    }
  },

  /**
   * Admin-only time-series endpoint.
   * Requires requireAdmin middleware.
   * GET /api/admin/analytics/timeseries?range=30d
   */
  async getTimeseries(req, res) {
    try {
      const range = (req.query.range || '30d').toLowerCase().trim();

      if (!ALLOWED_RANGES[range]) {
        return res.status(400).json({
          success: false,
          message: `Invalid range '${range}'. Allowed ranges: ${Object.keys(ALLOWED_RANGES).join(', ')}.`
        });
      }

      const timeseries = analyticsService.getTimeseries(range);
      return res.status(200).json({
        success: true,
        ...timeseries
      });
    } catch (err) {
      console.error('[ANALYTICS CONTROLLER] Error getting timeseries:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error calculating analytics time-series.'
      });
    }
  },

  /**
   * Admin-only recent events log endpoint.
   * Requires requireAdmin middleware.
   * GET /api/admin/analytics/events?limit=50
   */
  async getRecentEvents(req, res) {
    try {
      const limit = parseInt(req.query.limit, 10) || 50;
      const events = analyticsService.getRecentEvents(limit);
      return res.status(200).json({
        success: true,
        events
      });
    } catch (err) {
      console.error('[ANALYTICS CONTROLLER] Error getting recent events:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error retrieving recent events.'
      });
    }
  }
};

export default analyticsController;

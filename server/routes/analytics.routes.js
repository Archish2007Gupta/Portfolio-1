import { Router } from 'express';
import analyticsController from '../controllers/analytics.controller.js';
import { analyticsLimiter } from '../middleware/rateLimit.js';

const router = Router();

// Public event ingestion endpoint (rate-limited, non-blocking)
// POST /api/analytics/events
router.post('/events', analyticsLimiter, analyticsController.recordEvent);

export default router;

import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { contactLimiter } from '../middleware/rateLimit.js';

const router = Router();

// Public contact submission endpoint with dedicated rate limiter
router.post('/', contactLimiter, contactController.submitContact);

// Admin-facing endpoint placeholder (will require admin auth in future phase)
router.get('/', contactController.getMessages);

export default router;

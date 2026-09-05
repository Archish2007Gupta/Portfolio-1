import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { strictLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/login', strictLimiter, adminController.login);
router.get('/stats', requireAuth, adminController.getDashboardStats);

export default router;

import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { projectsController } from '../controllers/projects.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimit.js';

const router = Router();

// Public authentication endpoints (with dedicated brute-force rate limiter)
router.post('/login', loginLimiter, adminController.login);
router.post('/logout', adminController.logout);
router.get('/session', adminController.getSession);

// Protected admin endpoints
router.get('/stats', requireAdmin, adminController.getDashboardStats);
router.get('/messages', requireAdmin, adminController.getMessages);
router.patch('/messages/:id', requireAdmin, adminController.updateMessageStatus);
router.delete('/messages/:id', requireAdmin, adminController.deleteMessage);
router.post('/projects/refresh', requireAdmin, projectsController.refreshProjects);

export default router;

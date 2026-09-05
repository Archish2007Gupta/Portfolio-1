import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { strictLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/', strictLimiter, contactController.submitContact);
router.get('/', contactController.getMessages);

export default router;

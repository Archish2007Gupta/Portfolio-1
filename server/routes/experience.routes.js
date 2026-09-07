import { Router } from 'express';
import { experienceController } from '../controllers/experience.controller.js';

const router = Router();

// Public endpoint to retrieve experience records
router.get('/', experienceController.getExperience);

export default router;

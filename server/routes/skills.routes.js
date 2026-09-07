import { Router } from 'express';
import { skillsController } from '../controllers/skills.controller.js';

const router = Router();

// Public endpoint to retrieve skills
router.get('/', skillsController.getSkills);

export default router;

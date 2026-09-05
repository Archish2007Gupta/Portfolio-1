import { Router } from 'express';
import { projectsController } from '../controllers/projects.controller.js';

const router = Router();

// Public endpoint to retrieve projects
router.get('/', projectsController.getProjects);

export default router;

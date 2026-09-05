import { Router } from 'express';
import { projectsController } from '../controllers/projects.controller.js';

const router = Router();

router.get('/', projectsController.getProjects);
router.post('/sync', projectsController.syncProjects);

export default router;

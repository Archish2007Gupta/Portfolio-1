import { Router } from 'express';
import resumeController from '../controllers/resume.controller.js';

const router = Router();

// GET /api/resume - Safe resume metadata
router.get('/', resumeController.getResumeMetadata);

// GET /api/resume/download - Stream resume download
router.get('/download', resumeController.downloadResume);

export default router;

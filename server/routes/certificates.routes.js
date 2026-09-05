import { Router } from 'express';
import { certificatesController } from '../controllers/certificates.controller.js';

const router = Router();

router.get('/', certificatesController.getCertificates);

export default router;

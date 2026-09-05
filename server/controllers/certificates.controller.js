import certificateService from '../services/certificate.service.js';

export const certificatesController = {
  /**
   * Public endpoint to get automatically discovered certificates.
   * Single source of truth: public/certificates/
   * GET /api/certificates
   */
  async getCertificates(req, res, next) {
    try {
      const certificates = await certificateService.getCertificates();
      res.status(200).json({
        success: true,
        certificates
      });
    } catch (err) {
      console.error('[CERTIFICATES CONTROLLER] Error retrieving certificates:', err);
      next(err);
    }
  }
};

export default certificatesController;

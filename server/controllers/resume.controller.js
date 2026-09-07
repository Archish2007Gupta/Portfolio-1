import resumeService from '../services/resume.service.js';

export const resumeController = {
  /**
   * Public endpoint to get resume availability and safe metadata.
   * Single source of truth: public/resume/resume.pdf
   * GET /api/resume
   */
  async getResumeMetadata(req, res, next) {
    try {
      const metadata = await resumeService.getResumeMetadata();
      
      // Cache control to prevent stale resume caching while avoiding hammering
      res.setHeader('Cache-Control', 'public, max-age=60, must-revalidate');

      if (!metadata.available) {
        return res.status(200).json({
          success: true,
          available: false
        });
      }

      return res.status(200).json({
        success: true,
        available: true,
        url: metadata.url,
        filename: metadata.filename,
        updatedAt: metadata.updatedAt,
        size: metadata.size,
        downloadUrl: metadata.downloadUrl
      });
    } catch (err) {
      console.error('[RESUME CONTROLLER] Error getting resume metadata:', err);
      return res.status(200).json({
        success: true,
        available: false
      });
    }
  },

  /**
   * Public endpoint to securely download the active resume file.
   * GET /api/resume/download
   */
  async downloadResume(req, res, next) {
    try {
      const filePath = resumeService.getVerifiedFilePath();
      if (!filePath) {
        return res.status(404).json({
          success: false,
          message: 'Resume file is currently unavailable'
        });
      }

      // Serve as download attachment with clean friendly filename
      res.setHeader('Cache-Control', 'public, max-age=60, must-revalidate');
      return res.download(filePath, 'Archisha_Gupta_Resume.pdf', (downloadErr) => {
        if (downloadErr && !res.headersSent) {
          console.error('[RESUME CONTROLLER] Error during file download transmission:', downloadErr);
          return res.status(500).json({
            success: false,
            message: 'Unable to stream resume file'
          });
        }
      });
    } catch (err) {
      console.error('[RESUME CONTROLLER] Error processing resume download:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while retrieving resume'
      });
    }
  }
};

export default resumeController;

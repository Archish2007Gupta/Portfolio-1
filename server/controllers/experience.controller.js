import experienceService from '../services/experience.service.js';

export const experienceController = {
  /**
   * Public endpoint to retrieve experience & timeline entries.
   * Single source of truth: server/data/experience.json
   * GET /api/experience
   */
  async getExperience(req, res, next) {
    try {
      const experience = await experienceService.getExperience();
      res.status(200).json({
        success: true,
        experience
      });
    } catch (err) {
      console.error('[EXPERIENCE CONTROLLER] Error retrieving experience entries:', err);
      next(err);
    }
  }
};

export default experienceController;

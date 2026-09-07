import skillsService from '../services/skills.service.js';

export const skillsController = {
  /**
   * Public endpoint to retrieve aggregated technologies & skills.
   * Single source of truth: GitHub repositories + optional server/data/skills.json
   * GET /api/skills
   */
  async getSkills(req, res, next) {
    try {
      const skills = await skillsService.getSkills();
      res.status(200).json({
        success: true,
        skills
      });
    } catch (err) {
      console.error('[SKILLS CONTROLLER] Error retrieving skills:', err.message);
      res.status(500).json({
        success: false,
        message: 'Unable to load skills'
      });
    }
  }
};

export default skillsController;

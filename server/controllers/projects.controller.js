/**
 * Projects controller placeholder.
 * Logic will be implemented in the GitHub API integration phase.
 */
export const projectsController = {
  async getProjects(req, res, next) {
    try {
      res.status(501).json({
        success: false,
        message: 'Projects endpoint not yet implemented.'
      });
    } catch (err) {
      next(err);
    }
  },

  async syncProjects(req, res, next) {
    try {
      res.status(501).json({
        success: false,
        message: 'Projects sync endpoint not yet implemented.'
      });
    } catch (err) {
      next(err);
    }
  }
};

export default projectsController;

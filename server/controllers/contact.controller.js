/**
 * Contact controller placeholder.
 * Logic will be implemented in the Contact form integration phase.
 */
export const contactController = {
  async submitContact(req, res, next) {
    try {
      res.status(501).json({
        success: false,
        message: 'Contact submission endpoint not yet implemented.'
      });
    } catch (err) {
      next(err);
    }
  },

  async getMessages(req, res, next) {
    try {
      res.status(501).json({
        success: false,
        message: 'Get messages endpoint not yet implemented.'
      });
    } catch (err) {
      next(err);
    }
  }
};

export default contactController;

const { getAll, detail, create, update, remove } = require('../services/categories-service');
const statusCode = require('../constants/codes');
const messages = require('../constants/messages');

// ejemplo
module.exports = {
  list: async (req, res) => {

    try {
      const categories = await list();
      return res.status(statusCode.RESPONSE_OK).json(categories);

    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(messages.INTERNAL_SERVER_ERROR);

    }
  },

}
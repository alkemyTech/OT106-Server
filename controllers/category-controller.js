const { list, detail, create, update, remove } = require('../services/categories-service');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/message')

// ejemplo
module.exports = {
  list: async (req, res) => {

    try {
      const categories = await list();
      return res.status(httpStatus.OK).json(categories);

    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);

    }
  },

}
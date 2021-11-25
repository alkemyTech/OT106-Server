const { list, detail, create, update, remove } = require('../services/categories-service');
const httpStatus = require('../constants/httpStatus');

// ejemplo
module.exports = {
  list: async (req, res) => {

    try {
      const categories = await list();
      return res.status(httpStatus.OK.code).json(categories);

    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR.code).json(httpStatus.INTERNAL_SERVER_ERROR);

    }
  },

}
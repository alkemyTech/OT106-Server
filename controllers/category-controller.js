const { list, detail, create, update, remove } = require('../services/category-service');
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

  detail: async (req, res) => {
    let id  = req.params.id;

    try {

      const category = await detail(id);
      if (category) {
        return res.status(httpStatus.OK).json(category);
        
      } else {
        return res.status(httpStatus.NOT_FOUND).json(message.NO_CONTENT);
        
      }

    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);

    }
  },

}
const { list, detail, create, update, remove } = require('../services/category-service');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/message')


module.exports = {
  list: async (req, res) => {

    try {
      let categories = await list();
      return res.status(httpStatus.OK).json(categories);

    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);

    }
  },

  detail: async (req, res) => {
    let id  = req.params.id;

    try {

      let category = await detail(id);
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
  create: async (req, res) => {

    try {
      await create(req.body);
      return res.status(httpStatus.CREATED).json(message.CREATED);
        
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);

    }
  },

}
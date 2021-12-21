const { list, detail, create, update, remove } = require('../services/category-service');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/message')


module.exports = {
  list: async (req, res) => {
    let page = +req.params.page;

    try {
      let categories = await list(req,page);
      return res.status(httpStatus.OK).json({ message: message.OK, body: categories });
      
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR || error.status).json({ message:message.INTERNAL_SERVER_ERROR || error });

    }
  },

  detail: async (req, res) => {
    let id  = req.params.id;

    try {

      let category = await detail(id);
      if (category) {

        return res.status(httpStatus.OK).json({ message: message.OK, body: category });
        
      } else {
        return res.status(httpStatus.NOT_FOUND).json({ message: message.NO_CONTENT });
        
      }

    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR });

    }
  },
  create: async (req, res) => {

    req.body.image = req.file

    try {
      let category = await create(req.body);
      console.log( await category);
      return res.status(httpStatus.CREATED).json({ message: message.CREATED,body:category.dataValues});
        
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR });

    }
  },
  update: async (req, res) => {
    req.body.image = req.file
    try {
      let response = await update(req.params.id, req.body);
      console.log(response);
      if (response[0] === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({message : message.BAD_REQUEST});

      }
      
      return res.status(httpStatus.CREATED).json({message: message.CREATED,body:response})
        
    } catch (error) {

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR});

    }
  },
  remove: async (req, res) => {

    try {
      let response = await remove(req.params.id);
      console.log(response);
      if (response === 0) {
        return res.status(httpStatus.NOT_FOUND).json({message:message.NOT_FOUND,body:response});

      }
      
      return res.status(httpStatus.OK).json({message:message.OK,body:response})
        
    } catch (error) {

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR});

    }
  },

}
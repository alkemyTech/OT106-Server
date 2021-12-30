const { list, detail, create, update, remove } = require('../services/category-service');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/message')
const catchAsync = require('../functions/catchAsync')

module.exports = {
  list: catchAsync(async (req, res) => {
    let page = +req.params.page;

    let categories = await list(req, page);
    return res.status(httpStatus.OK).json({ message: message.OK, body: categories });
  }),

  detail: catchAsync(async (req, res) => {
    let id = req.params.id;

    let category = await detail(id);

    return res.status(httpStatus.OK).json({ message: message.OK, body: category });
  }),

  create: catchAsync(async (req, res) => {

    req.body.image = req.file

    let category = await create(req.body);
    console.log(await category);
    return res.status(httpStatus.CREATED).json({ message: message.CREATED, body: category.dataValues });

  }),
  
  update: catchAsync(async (req, res) => {
    req.body.image = req.file

    let response = await update(req.params.id, req.body);
    console.log(response);
    if (response[0] === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: message.BAD_REQUEST });
    }

    return res.status(httpStatus.CREATED).json({ message: message.CREATED, body: response })

  }),

  remove: catchAsync( async (req, res) => {

    let response = await remove(req.params.id);

    if (response === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ message: message.NOT_FOUND, body: response });

    }

    return res.status(httpStatus.OK).json({ message: message.OK, body: response })
  }),

}
const { UserService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { OK: OK_CODE, CREATED: CREATED_CODE } = require('../constants/httpStatus');

module.exports = {
  findAllUsers: catchAsync(async (req, res, next) => {
    const result = await UserService.findAllUsers();
    return res.status(OK_CODE).send(result);
  }),

  findUserByPk: catchAsync(async (req, res, next) => {
    const idToFind = req.params.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(OK_CODE).send(result);
  }),

  createUser: catchAsync(async (req, res, next) => {
    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
    };
    const result = await UserService.createUser(attributes);

    return res.status(CREATED_CODE).send(result);
  }),

  updateUser: catchAsync(async (req, res, next) => {
    const idToUpdate = req.params.id;
    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
    };
    const result = await UserService.updateUser(idToUpdate, attributes);

    return res.status(OK_CODE).send(result);
  }),

  destroyUser: catchAsync(async (req, res, next) => {
    const idToDelete = req.params.id;
    const result = await UserService.destroyUser(idToDelete);

    return res.status(OK_CODE).send(result);
  }),
};

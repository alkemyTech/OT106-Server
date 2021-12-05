const bcrypt = require('bcryptjs');
const { UserService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { OK: OK_CODE, CREATED: CREATED_CODE } = require('../constants/httpStatus');
const { OK: OK_MESSAGE } = require('../constants/message');

const removePassword = (x) => {
  return { ...x.dataValues, password: undefined };
};

module.exports = {
  findAllUsers: catchAsync(async (req, res, next) => {
    const result = await UserService.findAllUsers();

    // Removes the passwords of every result
    const resultWithoutPasswords = result.map(x => removePassword(x));

    return res.status(OK_CODE).send(resultWithoutPasswords);
  }),

  findUserByPk: catchAsync(async (req, res, next) => {
    const idToFind = req.params.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(OK_CODE).send(removePassword(result));
  }),

  createUser: catchAsync(async (req, res, next) => {
    // Hashs password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };
    const result = await UserService.createUser(attributes);

    return res.status(CREATED_CODE).send(removePassword(result));
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
    await UserService.updateUser(idToUpdate, attributes);

    // Finds the user updated and sent it as the result
    const result = await UserService.findUserByPk(idToUpdate);

    return res.status(OK_CODE).send(removePassword(result));
  }),

  destroyUser: catchAsync(async (req, res, next) => {
    const idToDelete = req.params.id;
    await UserService.destroyUser(idToDelete);

    return res.status(OK_CODE).send(OK_MESSAGE);
  }),
};

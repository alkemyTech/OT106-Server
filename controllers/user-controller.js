const { UserService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { generateAccesToken } = require('../functions/jsonwebtoken');
const { OK: OK_CODE, CREATED: CREATED_CODE, UNAUTHORIZED: UNAUTHORIZED_CODE } = require('../constants/httpStatus');
const { OK: OK_MESSAGE, UNAUTHORIZED: UNAUTHORIZED_MESSAGE } = require('../constants/message');
const passwordHelper = require('../helpers/password-helper');
const throwError = require('../functions/throw-error');
const userConstant = require('../constants/user-constant');

module.exports = {
  findAllUsers: catchAsync(async (req, res, next) => {
    const result = await UserService.findAllUsers();

    // Removes the passwords of every result
    const resultWithoutPasswords = result.map(x => passwordHelper.removePassword(x));

    return res.status(OK_CODE).send(resultWithoutPasswords);
  }),

  findUserByParamsId: catchAsync(async (req, res, next) => {
    const idToFind = req.params.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(OK_CODE).send(passwordHelper.removePassword(result));
  }),

  findUserByTokenId: catchAsync(async (req, res, next) => {
    const idToFind = req.tokenPayload.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(OK_CODE).send(passwordHelper.removePassword(result));
  }),

  createUser: catchAsync(async (req, res, next) => {
    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await passwordHelper.hashPassword(req.body.password),
    };
    const result = await UserService.createUser(attributes);

    return res.status(CREATED_CODE).send(passwordHelper.removePassword(result));
  }),

  updateUser: catchAsync(async (req, res, next) => {
    // it is verified if param id matches with token id
    if (req.tokenPayload.id !== Number(req.params.id)) {
      return res.status(UNAUTHORIZED_CODE).send(UNAUTHORIZED_MESSAGE);
    }

    const idToUpdate = req.params.id;
    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await passwordHelper.hashPassword(req.body.password),
      photo: req.body.photo,
    };
    await UserService.updateUser(idToUpdate, attributes);

    // Finds the user updated and sent it as the result
    const result = await UserService.findUserByPk(idToUpdate);

    return res.status(OK_CODE).send(passwordHelper.removePassword(result));
  }),

  destroyUser: catchAsync(async (req, res, next) => {
    const idToDelete = req.params.id;
    await UserService.destroyUser(idToDelete);

    return res.status(OK_CODE).send(OK_MESSAGE);
  }),

  loginUser: catchAsync(async (req, res, next) => {
    const user = await UserService.findUserByEmail(req.body.email);

    const validPassword = await passwordHelper.comparePassword(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      const responseBody = { ok: false };
      throwError(UNAUTHORIZED_CODE, UNAUTHORIZED_MESSAGE, responseBody);
    }

    const result = { ...passwordHelper.removePassword(user), token: generateAccesToken(user) };

    return res.status(OK_CODE).send(result);
  }),
};

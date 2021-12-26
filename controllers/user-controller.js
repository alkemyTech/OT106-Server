const { UserService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { generateAccessToken } = require('../functions/jsonwebtoken');
const httpStatus = require('../constants/httpStatus');
const httpMessage = require('../constants/message');
const passwordHelper = require('../helpers/password-helper');
const throwError = require('../functions/throw-error');
const userConstant = require('../constants/user-constant');

module.exports = {
  findAllUsers: catchAsync(async (req, res, next) => {
    const result = await UserService.findAllUsers();

    // Removes the passwords of every result
    const resultWithoutPasswords = result.map(x => passwordHelper.removePassword(x));

    return res.status(httpStatus.OK).send(resultWithoutPasswords);
  }),

  findUserByParamsId: catchAsync(async (req, res, next) => {
    const idToFind = req.params.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(httpStatus.OK).send(passwordHelper.removePassword(result));
  }),

  findUserByTokenId: catchAsync(async (req, res, next) => {
    const idToFind = req.tokenPayload.id;
    const user = await UserService.findUserByPk(idToFind);
    const result = {
      ...passwordHelper.removePassword(user),
      token: generateAccessToken(user),
    };

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: userConstant.userSuccessMessages.getInfo,
      body: result,
    });
  }),

  createUser: catchAsync(async (req, res, next) => {
    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await passwordHelper.hashPassword(req.body.password),
      photo: req.body.photo,
      roleId: 2,
    };

    await UserService.createUser(attributes);
    const newUser = await UserService.findUserByEmail(attributes.email);
    
    if (newUser === null) throwError(httpStatus.NOT_FOUND, httpMessage.NOT_FOUND); 

    const result = {
      ...passwordHelper.removePassword(newUser),
      token: generateAccessToken(newUser),
    };

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: userConstant.userSuccessMessages.register,
      body: result,
    });
  }),

  updateUser: catchAsync(async (req, res, next) => {
    // it is verified if param id matches with token id
    if (req.tokenPayload.id !== Number(req.params.id)) {
      return res.status(httpStatus.UNAUTHORIZED).send(httpMessage.UNAUTHORIZED);
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

    return res.status(httpStatus.OK).send(passwordHelper.removePassword(result));
  }),

  destroyUser: catchAsync(async (req, res, next) => {
    const idToDelete = req.params.id;
    await UserService.destroyUser(idToDelete);

    return res.status(httpStatus.OK).send(httpMessage.OK);
  }),

  loginUser: catchAsync(async (req, res, next) => {
    const user = await UserService.findUserByEmail(req.body.email);

    if (user === null)
      throwError(
        httpStatus.NOT_FOUND,
        userConstant.userFailureMessages.notFound
      );

    const validPassword = await passwordHelper.comparePassword(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      const responseBody = { ok: false };
      throwError(
        httpStatus.UNAUTHORIZED,
        userConstant.userFailureMessages.wrongPassword,
        responseBody
      );
    }

    const result = {
      ...passwordHelper.removePassword(user),
      token: generateAccessToken(user),
    };

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: userConstant.userSuccessMessages.login,
      body: result,
    });
  }),
};

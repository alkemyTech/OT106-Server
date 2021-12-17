const { UserService } = require('../services');
const catchAsync = require('../functions/catchAsync');
const { generateAccesToken } = require('../functions/jsonwebtoken');
const { OK: OK_CODE, CREATED: CREATED_CODE, UNAUTHORIZED: UNAUTHORIZED_CODE } = require('../constants/httpStatus');
const { OK: OK_MESSAGE, UNAUTHORIZED: UNAUTHORIZED_MESSAGE } = require('../constants/message');
const { generatePassword } = require('../functions/generate-password');
const bcrypt = require('bcryptjs');

const removePassword = (x) => {
  return { ...x, password: undefined };
};

module.exports = {
  findAllUsers: catchAsync(async (req, res, next) => {
    const result = await UserService.findAllUsers();

    // Removes the passwords of every result
    const resultWithoutPasswords = result.map(x => removePassword(x));

    return res.status(OK_CODE).send(resultWithoutPasswords);
  }),

  findUserByParamsId: catchAsync(async (req, res, next) => {
    const idToFind = req.params.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(OK_CODE).send(removePassword(result));
  }),

  findUserByTokenId: catchAsync(async (req, res, next) => {
    const idToFind = req.tokenPayload.id;
    const result = await UserService.findUserByPk(idToFind);

    return res.status(OK_CODE).send(removePassword(result));
  }),

  createUser: catchAsync(async (req, res, next) => {
    // Hashs password
    const hashedPassword = await generatePassword(req.body.password);

    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roleId: Number(req.body.roleId),
      password: hashedPassword,
    };
    const result = await UserService.createUser(attributes);

    return res.status(CREATED_CODE).send(removePassword(result));
  }),

  updateUser: catchAsync(async (req, res, next) => {
    // it is verified if param id matches with token id
    if (req.tokenPayload.id !== Number(req.params.id)) {
      return res.status(UNAUTHORIZED_CODE).send(UNAUTHORIZED_MESSAGE);
    }

    const hashedPassword = req.body.password
    ? await generatePassword(req.body.password)
    : null;

    const idToUpdate = req.params.id;
    const attributes = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
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

  loginUser: catchAsync(async (req, res, next) => {
    const user = await UserService.findUserByEmail(req.body.email);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(UNAUTHORIZED_CODE).send({ ok: false });
    }

    const result = { ...removePassword(user), token: generateAccesToken(user) };

    return res.status(OK_CODE).send(result);
  }),
};

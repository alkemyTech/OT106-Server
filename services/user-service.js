require("dotenv").config();
const { UserRepository } = require("../repositories");
const {
  BAD_REQUEST: BAD_REQUEST_CODE,
  NOT_FOUND: NOT_FOUND_CODE,
} = require("../constants/httpStatus");
const {
  BAD_REQUEST: BAD_REQUEST_MESSAGE,
  NOT_FOUND: NOT_FOUND_MESSAGE,
} = require("../constants/message");
const { generateAccessToken } = require("../functions/jsonwebtoken");
const sendEmail = require("../functions/mail-engine");
const throwError = require("../functions/throw-error");

module.exports = {
  findAllUsers: async () => {
    const result = await UserRepository.findAllUsers();

    const users = result.map((user) => user.dataValues);

    return users;
  },

  findUserByPk: async (id) => {
    const user = await UserRepository.findUserByPk(id);

    if (!user) throwError(NOT_FOUND_CODE, NOT_FOUND_MESSAGE);

    return user.dataValues;
  },

  findUserByEmail: async (email) => {
    const result = await UserRepository.findUserByEmail(email);
    if (result === null) return null;
    return result.dataValues;
  },

  createUser: async (attributes) => {
    const result = await UserRepository.createUser(attributes);

    if (result !== null) {
      // it add token when user is created
      sendEmail(result.dataValues.email, process.env.TEMPLATEID_WELCOME);
      const userWithToken = Object.assign(result.dataValues, {
        token: generateAccessToken(result.dataValues),
      });
      return userWithToken;
    }

    // The result as null means that the user can't be created
    // with that email (because the repository use findOrCreate)
    throwError(BAD_REQUEST_CODE, BAD_REQUEST_MESSAGE);
  },

  updateUser: async (id, attributes) => {
    const user = await UserRepository.findUserByPk(id);

    // If the user is not found, a 404 error is thrown
    if (!user) throwError(NOT_FOUND_CODE, NOT_FOUND_MESSAGE);

    const attributesToUpdate = attributes.password
      ? attributes
      : Object.assign(attributes, { password: user.dataValues.password });

    const updatedUser = await UserRepository.updateUser(id, attributesToUpdate);

    return updatedUser.dataValues;
  },

  destroyUser: async (id) => {
    const user = await UserRepository.findUserByPk(id);

    if (!user) throwError(NOT_FOUND_CODE, NOT_FOUND_MESSAGE);

    await UserRepository.destroyUser(id);
  },
};

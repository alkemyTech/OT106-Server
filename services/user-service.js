const { UserRepository } = require("../repositories");
const {
  BAD_REQUEST: BAD_REQUEST_CODE,
  NOT_FOUND: NOT_FOUND_CODE,
} = require("../constants/httpStatus");
const {
  BAD_REQUEST: BAD_REQUEST_MESSAGE,
  NOT_FOUND: NOT_FOUND_MESSAGE,
} = require("../constants/message");
const { generateAccesToken } = require("../functions/jsonwebtoken");
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

    if (!user) {
      const error = new Error();
      error.message = NOT_FOUND_MESSAGE;
      error.status = NOT_FOUND_CODE;
      throw error;
    }

    return user.dataValues;
  },

  findUserByEmail: UserRepository.findUserByEmail,

  createUser: async (attributes) => {
    const result = await UserRepository.createUser(attributes);

    if (result !== null) {
      // it add token when user is created
      sendEmail(result.email, process.env.TEMPLATEID_WELCOME);
      const userWithToken = Object.assign(result.dataValues, {
        token: generateAccesToken(result.dataValues),
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
    // CatchAsync function catch error and send it to handleError
    if (!user) {
      const error = new Error();
      error.message = NOT_FOUND_MESSAGE;
      error.status = NOT_FOUND_CODE;
      throw error;
    }

    const attributesToUpdate = attributes.password
      ? attributes
      : Object.assign(attributes, { password: user.dataValues.password });

    const updatedUser = await UserRepository.updateUser(id, attributesToUpdate);

    return updatedUser.dataValues;
  },

  destroyUser: async (id) => {
    const user = await UserRepository.findUserByPk(id);

    if (!user) {
      const error = new Error();
      error.message = NOT_FOUND_MESSAGE;
      error.status = NOT_FOUND_CODE;
      throw error;
    }

    await UserRepository.destroyUser(id);
  },
};

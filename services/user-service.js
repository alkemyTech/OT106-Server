const { UserRepository } = require('../repositories');
const { BAD_REQUEST: BAD_REQUEST_CODE, NOT_FOUND: NOT_FOUND_CODE } = require('../constants/httpStatus');
const { BAD_REQUEST: BAD_REQUEST_MESSAGE, NOT_FOUND: NOT_FOUND_MESSAGE } = require('../constants/message');

module.exports = {
  findAllUsers: UserRepository.findAllUsers,

  findUserByPk: UserRepository.findUserByPk,

  findUserByEmail: UserRepository.findUserByEmail,

  createUser: async (attributes) => {
    const result = await UserRepository.createUser(attributes);

    if (result !== null) return result;

    // The result as null means that the user can't be created
    // with that email (because the repository use findOrCreate)
    const err = new Error();
    err.message = BAD_REQUEST_MESSAGE;
    err.status = BAD_REQUEST_CODE;
    throw err;
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

    const updatedUser = await UserRepository.updateUser(id, attributes);

    return updatedUser;
  },

  destroyUser: UserRepository.destroyUser,
};
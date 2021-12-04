const { UserRepository } = require('../repositories');
const { BAD_REQUEST: BAD_REQUEST_CODE } = require('../constants/httpStatus');
const { BAD_REQUEST: BAD_REQUEST_MESSAGE } = require('../constants/message');

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

  updateUser: UserRepository.updateUser,

  destroyUser: UserRepository.destroyUser,
};

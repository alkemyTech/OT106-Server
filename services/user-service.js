const { UserRepository } = require('../repositories');

module.exports = {
  findAllUsers: UserRepository.findAllUsers,
  findUserByPk: UserRepository.findUserByPk,
  createUser: UserRepository.createUser,
  updateUser: UserRepository.updateUser,
  destroyUser: UserRepository.destroyUser,
};

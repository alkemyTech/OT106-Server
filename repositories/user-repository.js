/* eslint-disable no-return-await */
/* eslint-disable arrow-parens */

const { User } = require('../models');

module.exports = {
  findAllUsers: async () =>
    await User.findAll({ attributes: { exclude: ['id', 'password'] } }),

  findUserByPk: async (id) => await User.findByPk(id),

  createUser: async (attributes) => await User.create(attributes),

  updateUser: async (id, attributes) =>
    await User.update(attributes, { where: { id } }),

  destroyUser: async (id) => await User.destroy({ where: { id } }),
};

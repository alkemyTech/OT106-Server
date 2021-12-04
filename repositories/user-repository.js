/* eslint-disable no-return-await */
/* eslint-disable arrow-parens */

const { User } = require('../models');

module.exports = {
  findAllUsers: async () =>
    await User.findAll({ attributes: { exclude: ['id', 'password'] } }),

  findUserByPk: async (id) => await User.findByPk(id),

  findUserByEmail: async (email) => await User.findOne({ where: { email } }),

  createUser: async (attributes) => {
    // findOrCreate will fail if it find a user with the email of the new one
    const [userCreated, success] = await User.findOrCreate({
      where: { email: attributes.email },
      defaults: attributes,
    });

    return success ? userCreated : null;
  },

  updateUser: async (id, attributes) =>
    await User.update(attributes, { where: { id } }),

  destroyUser: async (id) => await User.destroy({ where: { id } }),
};

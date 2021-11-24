// General clarifications:
// - When adding/removing the NOT NULL contraint we will use changeColumn to
//   change the definition of the column. Why we didn't use addConstraint?
//   Because it can't add NOT NULL constraints.
// - In the changeColumn's dataTypeOrOptions argument we must add the type
//   property, because the lack of it causes an error when migrating. See at:
//   https://github.com/sequelize/sequelize/issues/9635#issuecomment-475198293

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      // Adds the new constraints
      queryInterface.changeColumn('Users', 'firstName', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      queryInterface.changeColumn('Users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      // Adds the UNIQUE constraint in email
      queryInterface.addConstraint('Users', {
        type: 'unique',
        fields: ['email'],
        name: 'unique_users_email',
      }),

      // Renames "image" column to "photo"
      queryInterface.renameColumn('Users', 'image', 'photo'),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      // Removes the new constraints
      await queryInterface.changeColumn('Users', 'firstName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      await queryInterface.changeColumn('Users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      await queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      await queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      // Removes the UNIQUE constraint in email
      await queryInterface.removeConstraint('Users', 'unique_users_email'),

      // Undoes column renaming
      await queryInterface.renameColumn('Users', 'photo', 'image'),
    ]);
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario',
          lastName: 'Demo',
          email: 'test@test.com',
          // Important: Password not encrypted yet!
          password: '1234',
          roleId: 1,
          photo:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario2',
          lastName: 'Demo2',
          email: 'test2@test.com',
          // Important: Password not encrypted yet!
          password: '1234',
          roleId: 2,
          photo:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      // As the email is unique, we can delete using it in the where condition
      email: { [Sequelize.Op.in]: ['test@test.com', 'test2@test.com'] },
    });
  },
};

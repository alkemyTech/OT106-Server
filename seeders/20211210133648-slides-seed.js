

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [{
      imgUrl: 'www.address.com',
      text: 'description',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      imgUrl: 'www.address2.com',
      text: 'description2',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Slides', null, {});
  }
};

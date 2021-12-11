

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [{
      name: 'ONG test',
      image: 'miImagen.jpg',
      address: 'test 123',
      phone: 123,
      email: 'test@test.com',
      welcomeText: 'welcome test',
      aboutUsText: 'we are a test',
      facebook: 'https://www.facebook.com/demo',
      instagram: 'https://www.instagram.com/demo',
      linkedin: 'https://www.linkedin.com/demo',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};

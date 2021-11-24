'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
      name: 'John Doe',
      facebookUrl: 'https://www.facebook.com/demo',
      instagramUrl: 'https://www.instagram.com/demo',
      linkedinUrl: 'https://www.linkedin.com/demo',
      image: 'miImagen.jpg',
      description: 'This is a description'
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

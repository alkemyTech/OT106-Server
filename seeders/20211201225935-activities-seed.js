'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [
      {
        name: 'actividad1',
        content: 'contenido1',
        image: 'imagen.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        name: 'actividad2',
        content: 'contenido2',
        image: 'imagen.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
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

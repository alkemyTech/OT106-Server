'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [
      {
        name: 'actividad1',
        content: 'contenido1',
        image: 'imagen.png',
      },
      {
        name: 'actividad2',
        content: 'contenido2',
        image: 'imagen.png',
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

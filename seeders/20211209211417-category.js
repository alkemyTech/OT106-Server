'use strict';
let categories = [
  {
    name:"prueba1",
    createdAt:new Date,
    updatedAt:new Date
  },
  {
    name:"prueba2",
    createdAt:new Date,
    updatedAt:new Date
  },
  {
    name:"prueba3",
    createdAt:new Date,
    updatedAt:new Date
  },
]
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  down: async (queryInterface, Sequelize) => {
    
     
    await queryInterface.bulkDelete('Categories', null, {});
     
  }
};

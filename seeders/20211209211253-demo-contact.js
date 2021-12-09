"use strict";

let contacts = [];

for (let i = 1; i < 41; i++) {
  contacts.push({
    name: `Contact ${i}`,
    phone: 54110000000 + i,
    email: `contact${i}@gmail.com`,
    message: `message from contact ${i}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Contacts", contacts);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};

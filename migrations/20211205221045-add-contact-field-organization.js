

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Organizations', 'facebook', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Organizations', 'instagram', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('Organizations', 'linkedin', {
          type: Sequelize.STRING,
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Organizations', 'facebook', { transaction: t }),
        queryInterface.removeColumn('Organizations', 'instagram', { transaction: t }),
        queryInterface.removeColumn('Organizations', 'linkedin', { transaction: t }),
      ]);
    });
  }
};

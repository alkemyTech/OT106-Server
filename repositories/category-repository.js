const db = require('../models');

module.exports = {
  list: async () => {
    return db.Category.findAll({
         attributes: ['name'] 
        });
  },

  detail: async (id) => {
    return db.Category.findByPk(id);
  },

  createCategory: async (body) => {
    return db.Category.create(body);
  },

  updateCategory: async (id, body) => {
    return db.Category.update(body, {
         where: { id } 
        });
  },

  deleteCategory: async (id) => {
    return db.Category.destroy({
         where: { id } 
        });
  },
};
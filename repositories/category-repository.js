const db = require('../models');

module.exports = {
  list: async (limit, offset) => {
    return db.Category.findAll({limit: limit,offset: offset ,attributes: ['name'] });
  },

  count: async () => {
    return db.Category.count();
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
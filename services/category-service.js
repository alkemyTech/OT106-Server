const categoriesRepository = require('../repositories/category-repository');

module.exports = {
  list: () => categoriesRepository.list(),
  detail: id => categoriesRepository.detail(id),
  create: body => categoriesRepository.createCategory(body),
  update: (id, body) => categoriesRepository.updateCategory(id, body),
  remove: id => categoriesRepository.deleteCategory(id)
};
const adminAuthentication = require('../middleware/admin-authentication');
const pagination = require('../middleware/pagination');
const categoryController = require('../controllers/category-controller');
const categoryValidation = require('../validations/category-validation');
const validator = require('../functions/validator');

const getAllCategories = [
  adminAuthentication,
  pagination.validate,
  categoryController.list
];

const getCategory = [
  adminAuthentication,
  categoryController.detail
];

const createCategory = [
  adminAuthentication,
  categoryValidation,
  validator,
  categoryController.create
];

const updateCategory = [
  adminAuthentication,
  categoryValidation,
  validator,
  categoryController.update
];

const deleteCategory = [
  adminAuthentication,
  categoryController.remove
];

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

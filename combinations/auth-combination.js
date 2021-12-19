const { UserController } = require('../controllers');
const { validateCreateUser, validateLoginUser } = require('../validations/user-validation');
const authentication = require('../middleware/authentication');

const createUser = [
  validateCreateUser,
  UserController.createUser
];

const getUser = [
  authentication,
  UserController.findUserByTokenId
];

const login = [
  validateLoginUser,
  UserController.loginUser
];

module.exports = {
  createUser,
  getUser,
  login
};

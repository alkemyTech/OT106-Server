const usersController = require('../controllers/user-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateUpdateUser } = require('../validations/update-user-validation');
const { validateCreateUser } = require('../validations/user-validation');
const ownerAtuhentication = require('../middleware/owner-authentication');

const createUser = [
  validateCreateUser,
  usersController.createUser
];

const findAllUsers = [
  adminAuthentication,
  usersController.findAllUsers
];

const updateUser = [
  validateUpdateUser,
  ownerAtuhentication,
  usersController.updateUser
];

const deleteUser = [
  ownerAtuhentication,
  usersController.destroyUser
];

module.exports = {
  createUser,
  findAllUsers,
  updateUser,
  deleteUser
};

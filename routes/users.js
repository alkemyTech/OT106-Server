var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const authentication = require('../middleware/authentication');
const { validateUpdateUser } = require('../validations/update-user-validation');

// List all the users
router.get('/', adminAuthentication, usersController.findAllUsers);

router.route('/:id')
  .patch(validateUpdateUser, usersController.updateUser)
  .delete(authentication, usersController.destroyUser);

module.exports = router;

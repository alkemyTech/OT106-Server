var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateCreateUser, validateUpdateUser } = require('../validations/user-validation');
const ownerAtuhentication = require('../middleware/owner-authentication');

// List all the users
router.get('/', adminAuthentication, usersController.findAllUsers);

router.route('/:id')
  .patch(validateUpdateUser, ownerAtuhentication, usersController.updateUser)
  .delete(ownerAtuhentication, usersController.destroyUser);

module.exports = router;

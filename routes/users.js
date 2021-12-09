var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateUpdateUser } = require('../validations/update-user-validation');

// List all the users
router.get('/', adminAuthentication, usersController.findAllUsers);

// PATCH
router.patch('/:id', validateUpdateUser, usersController.updateUser);

module.exports = router;

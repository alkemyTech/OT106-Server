var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user-controller');

const { validateUpdateUser } = require('../validations/update-user-validation');
const { validateCreateUser } = require('../validations/user-validation')
/* GET users listing. */
router.get('/',usersController.findAllUsers)

router.post('/',validateCreateUser,usersController.createUser)


// PATCH
router.patch('/:id', validateUpdateUser, usersController.updateUser);

module.exports = router;

const router = require('express').Router();
const { UserController } = require('../controllers');
const { validateCreateUser } = require('../validations/user-validation');

router.post('/register', validateCreateUser, UserController.createUser);

module.exports = router;

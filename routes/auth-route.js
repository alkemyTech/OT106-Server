const router = require('express').Router();
const { UserController } = require('../controllers');
const { validateCreateUser } = require('../validations/user-validation');
const authentication = require('../middleware/authentication');

router
    .post('/register', validateCreateUser, UserController.createUser)
    .get('/me', authentication, UserController.findUserByTokenId);

module.exports = router;

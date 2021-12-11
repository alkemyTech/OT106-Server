const router = require('express').Router();
const { UserController } = require('../controllers');
const { validateCreateUser, validateLoginUser } = require('../validations/user-validation');
const authentication = require('../middleware/authentication');

router
    .post('/register', validateCreateUser, UserController.createUser)
    .get('/me', authentication, UserController.findUserByTokenId);

// Login
router.post('/login', validateLoginUser, UserController.loginUser);

module.exports = router;

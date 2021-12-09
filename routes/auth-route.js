const router = require('express').Router();
const { UserController } = require('../controllers');
const { validateCreateUser, validateLoginUser } = require('../validations/user-validation');

router.post('/register', validateCreateUser, UserController.createUser);

// Login
router.post('/login', validateLoginUser, UserController.loginUser);

module.exports = router;

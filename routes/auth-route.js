const { createUser, getUser, login } = require('../combinations/auth-combination');

const router = require('express').Router();

router
    .post('/register', createUser)
    .get('/me', getUser);

// Login
router.post('/login', login);

module.exports = router;

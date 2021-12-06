var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user-controller');

const { validateUpdateUser } = require('../validations/update-user-validation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// PATCH
router.patch('/:id', validateUpdateUser, usersController.updateUser);

module.exports = router;

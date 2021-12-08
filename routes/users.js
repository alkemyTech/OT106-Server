var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user-controller');

const authentication = require('../middleware/authentication');
const { validateUpdateUser } = require('../validations/update-user-validation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/:id')
  .patch(validateUpdateUser, usersController.updateUser)
  .delete(authentication, usersController.destroyUser);

module.exports = router;

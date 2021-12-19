const { createUser, findAllUsers, updateUser, deleteUser } = require('../combinations/users-combination');

const router = require('express').Router();

router.post('/', createUser);

// List all users
router.get('/', findAllUsers);

router.route('/:id')
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;

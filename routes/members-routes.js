const express = require('express');
const memberValidation = require('../validations/members-validators');
const validate = require('../middleware/validate');
const router = express.Router();

const { create, getMembersAll } = require('../controllers/members-controller');

router.post('/', validate(memberValidation.createMember), create);
router.get('/', getMembersAll);

module.exports = router;

const express = require('express');
const memberValidate = require('../validations/members-validators');
const router = express.Router();

const { create, getMembersAll } = require('../controllers/members-controller');

router.post('/', memberValidate.memberIsValid, create);
router.get('/', getMembersAll);

module.exports = router;

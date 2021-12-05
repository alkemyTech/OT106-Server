const express = require('express');
const organizationController = require('../controllers/organization-controller');

const router = express.Router();

// list name, image, phone and address of organizations
router.get('/public', organizationController.listAll);

module.exports = router;

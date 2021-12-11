const express = require('express');
const organizationController = require('../controllers/organization-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateSchemaOrganization, validateSchemaUrls } = require('../validations/organizations-validations');

const router = express.Router();

// list name, image, phone, address and social networks links of organizations
router.get('/public', organizationController.listAll);


// update organization by id
router.post('/public/:id',
                adminAuthentication, // try validate admin user
                validateSchemaOrganization, // array of validations for organizations model
                organizationController.update
            );

// update contact fields for organization by id
router.post('/public/contact/:id',
                adminAuthentication, // try validate admin user
                validateSchemaUrls, // array of validations for organization's urls
                organizationController.update
            );


// create new organization
// router.post('/public', organizationController.create);

// show organization by id
// router.get('/public/:id', organizationController.findById);

// delete organization by id
// router.delete('/public/:id', organizationController.delete);


module.exports = router;

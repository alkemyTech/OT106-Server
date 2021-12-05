const express = require('express');
const organizationController = require('../controllers/organization-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validations, organizationValidador, validationsUrls } = require('../middleware/organization-validator');

const router = express.Router();

// list name, image, phone and address of organizations
router.get('/public', organizationController.listAll);


// update organization by id
router.post('/public/:id',
                adminAuthentication, // try validate admin user
                validations, // array of validations for organizations model
                organizationValidador, // verify validation's array
                organizationController.update
            );

// update contact fields for organization by id
router.post('/public/contact/:id',
                adminAuthentication, // try validate admin user
                validationsUrls, // array of validations for organizations model
                organizationValidador, // verify validation's array
                organizationController.update
            );


// create new organization
// router.post('/public', organizationController.create);

// show organization by id
// router.get('/public/:id', organizationController.findById);

// delete organization by id
// router.delete('/public/:id', organizationController.delete);


module.exports = router;

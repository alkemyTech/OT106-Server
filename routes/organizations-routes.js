const { listAll, updateOrganization, updateOrganizationContact } = require('../combinations/organizations-combination');

const router = require('express').Router();

// list name, image, phone, address and social networks links of organizations
router.get('/public', listAll);


// update organization by id
router.post('/public/:id', updateOrganization);

// update contact fields for organization by id
router.post('/public/contact/:id', updateOrganizationContact);


// create new organization
// router.post('/public', organizationController.create);

// show organization by id
// router.get('/public/:id', organizationController.findById);

// delete organization by id
// router.delete('/public/:id', organizationController.delete);


module.exports = router;

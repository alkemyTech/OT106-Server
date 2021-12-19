const organizationController = require('../controllers/organization-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateSchemaOrganization, validateSchemaUrls } = require('../validations/organizations-validations');

const listAll = organizationController.listAll;

const updateOrganization = [
  adminAuthentication, // try validate admin user
  validateSchemaOrganization, // array of validations for organizations model
  organizationController.update
];

const updateOrganizationContact = [
  adminAuthentication, // try validate admin user
  validateSchemaUrls, // array of validations for organization's urls
  organizationController.update
];

module.exports = { listAll, updateOrganization, updateOrganizationContact };

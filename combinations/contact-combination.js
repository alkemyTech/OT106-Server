const contactController = require('../controllers/contact-controller');
const {
    validateCreateContact,
    validateUpdateContact,
} = require('../middleware/contact-middleware');
const adminAuthentication = require('../middleware/admin-authentication');

const getAllContacts = [
  adminAuthentication,
  contactController.list
];

const getContact = [
  adminAuthentication,
  contactController.find
];

const createContact = [
  adminAuthentication,
  validateCreateContact,
  contactController.create
];

const updateContact = [
  adminAuthentication,
  validateUpdateContact,
  contactController.update
];

const deleteContact = [
  adminAuthentication,
  contactController.delete
];

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
};

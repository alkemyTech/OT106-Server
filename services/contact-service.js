const contactRepository = require("../repositories/contact-repository");

//http status
const code = require("../constants/httpStatus");

//Response messages
const { CONTACT_NOT_FOUND } = require("../constants/contact-constants");

const createContact = async (req, res) => {
  //Repository
  const create = await contactRepository.createContact(req);

  //Success?
  return create;
};

const getContacts = async (req, res) => {
  //Repository
  const contacts = await contactRepository.getContacts();

  //No contacts
  if (!contacts[0]) {
    return res.status(code.NOT_FOUND).json(CONTACT_NOT_FOUND);
  }

  //Success?
  return contacts;
};

const getContactById = async (req, res) => {
  let { id } = req.params;

  //Repository
  const contact = await contactRepository.getContactById(id);

  //No contact found
  if (!contact) {
    return res.status(code.NOT_FOUND).json(CONTACT_NOT_FOUND);
  }

  //Success?
  return contact;
};

const updateContact = async (req, res) => {
  let { id } = req.params;

  //Check if it exists
  const contact = await contactRepository.getContactById(id);
  if (!contact) {
    return res.status(code.NOT_FOUND).json(CONTACT_NOT_FOUND);
  }

  //Success?
  const update = await contactRepository.updateContact(req);
  return update;
};

const deleteContact = async (req, res) => {
  let { id } = req.params;

  //Check if it exists
  const contact = await contactRepository.getContactById(id);
  if (!contact) {
    return res.status(code.NOT_FOUND).json(CONTACT_NOT_FOUND);
  }

  //Success
  const remove = await contactRepository.deleteContact(id);
  return remove;
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};

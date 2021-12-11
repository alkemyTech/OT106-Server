const contactService = require("../services/contact-service");

//http status codes
const code = require("../constants/httpStatus");

//http status messages
const message = require("../constants/message.js");

//response messages
const {
  GOT_CONTACT,
  CREATED_CONTACT,
  UPDATED_CONTACT,
  DELETED_CONTACT,
} = require("../constants/contact-constants");

//POST a contact
const create = async (req, res) => {
  try {
    const contact = await contactService.createContact(req, res);
    res.status(code.OK).json({
      message: CREATED_CONTACT,
      body: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//Get all contacts
const list = async (req, res) => {
  try {
    const contacts = await contactService.getContacts(req, res);
    res.status(code.OK).json({
      message: GOT_CONTACT,
      body: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//Get contact by id
const find = async (req, res) => {
  try {
    const contact = await contactService.getContactById(req, res);
    res.status(code.OK).json({
      message: GOT_CONTACT,
      body: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//PATCH a contact by id
const update = async (req, res) => {
  let { id } = req.params;
  try {
    const contact = await contactService.updateContact(req, res);
    res.status(code.OK).json({
      message: UPDATED_CONTACT(id),
      body: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//DELETE contact by id
const remove = async (req, res) => {
  let { id } = req.params;
  try {
    await contactService.deleteContact(req, res);
    res.status(code.OK).json({
      message: DELETED_CONTACT(id),
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  create,
  list,
  find,
  update,
  delete: remove,
};

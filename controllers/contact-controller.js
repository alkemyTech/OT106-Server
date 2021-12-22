const contactService = require("../services/contact-service");
const catchAsync = require("../functions/catchAsync");

//http status codes
const code = require("../constants/httpStatus");

//response messages
const {
  GOT_CONTACT,
  CREATED_CONTACT,
  UPDATED_CONTACT,
  DELETED_CONTACT,
} = require("../constants/contact-constants");

//POST a contact
const create = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req, res);
  res.status(code.OK).json({
    message: CREATED_CONTACT,
    body: contact,
  });
});

//Get all contacts
const list = catchAsync(async (req, res) => {
  const contacts = await contactService.getContacts(req, res);
  res.status(code.OK).json({
    message: GOT_CONTACT,
    body: contacts,
  });
});

//Get contact by id
const find = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req, res);
  res.status(code.OK).json({
    message: GOT_CONTACT,
    body: contact,
  });
});

//PATCH a contact by id
const update = catchAsync(async (req, res) => {
  let { id } = req.params;
  const contact = await contactService.updateContact(req, res);
  res.status(code.OK).json({
    message: UPDATED_CONTACT(id),
    body: contact,
  });
});

//DELETE contact by id
const remove = catchAsync(async (req, res) => {
  let { id } = req.params;
  await contactService.deleteContact(req, res);
  res.status(code.OK).json({
    message: DELETED_CONTACT(id),
  });
});

module.exports = {
  create,
  list,
  find,
  update,
  delete: remove,
};

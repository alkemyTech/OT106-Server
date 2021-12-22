const code = require("../constants/httpStatus");
const {
  BAD_CREATE_CONTACT_REQUEST,
  BAD_UPDATE_CONTACT_REQUEST,
} = require("../constants/contact-constants");
const throwError = require("../functions/throw-error");

const validateCreateContact = (req, res, next) => {
  let { name, phone, email, message } = req.body;
  if (![name, phone, email, message].every(Boolean)) {
    return throwError(code.BAD_REQUEST, BAD_CREATE_CONTACT_REQUEST);
  }

  next();
};

const validateUpdateContact = (req, res, next) => {
  let { name, phone, email, message } = req.body;
  if (![name, phone, email, message].some(Boolean)) {
    return throwError(code.BAD_REQUEST, BAD_UPDATE_CONTACT_REQUEST);
  }

  next();
};

module.exports = {
  validateCreateContact,
  validateUpdateContact,
};

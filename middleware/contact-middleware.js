const code = require("../constants/httpStatus");
const {
  BAD_CREATE_CONTACT_REQUEST,
  BAD_UPDATE_CONTACT_REQUEST,
} = require("../constants/contact-constants");

const validateCreateContact = (req, res, next) => {
  let { name, phone, email, message } = req.body;
  if (![name, phone, email, message].every(Boolean)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: BAD_CREATE_CONTACT_REQUEST });
  }

  next();
};

const validateUpdateContact = (req, res, next) => {
  let { name, phone, email, message } = req.body;
  if (![name, phone, email, message].some(Boolean)) {
    return res
      .status(code.BAD_REQUEST)
      .json({ message: BAD_UPDATE_CONTACT_REQUEST });
  }

  next();
};

module.exports = {
  validateCreateContact,
  validateUpdateContact,
};

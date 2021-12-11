const { validationResult } = require('express-validator');
const status = require('../constants/httpStatus');


// verify all previous validations
function organizationValidator(req, res, next) {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(status.BAD_REQUEST).json({
      error: errorValidation.array()
    });
  }
  return next();
}

module.exports = {
  organizationValidator
};

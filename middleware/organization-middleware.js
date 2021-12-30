const { validationResult } = require('express-validator');
const status = require('../constants/httpStatus');
const message = require('../constants/message');
const throwError = require('../functions/throw-error');

// verify all previous validations
function validator(req, res, next) {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return throwError(status.BAD_REQUEST, message.BAD_REQUEST, errorValidation.array());
  }
  return next();
}

module.exports = {
  validator
};

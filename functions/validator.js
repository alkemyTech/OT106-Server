const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/message');
const throwError = require('../functions/throw-error')
const validator = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return throwError(httpStatus.BAD_REQUEST,message.BAD_REQUEST,errors)
  }
  next();
};

module.exports = validator;
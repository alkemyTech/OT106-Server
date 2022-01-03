const { check, validationResult } = require('express-validator');
const statusCode = require('../constants/httpStatus');
const message = require('../constants/message');

const error = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(message.UNPROCESSABLE_ENTITY);
  }
  next();
};

const memberIsValid = [
  check('name')
        .notEmpty()
        .withMessage('The name is required')
        .bail()
        .withMessage('Invalid name')
        .bail(),
  error
];

module.exports = { memberIsValid };

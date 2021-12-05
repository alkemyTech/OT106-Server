const { check, validationResult } = require('express-validator');
const status = require('../constants/httpStatus');

const validations = [
  check('name').notEmpty().withMessage('field name is required'),
  check('image').notEmpty().withMessage('field image is required'),
  check('address').notEmpty().withMessage('field address is required'),
  check('email')
    .notEmpty()
    .isEmail().withMessage('enter a valid email'),
  check('welcomeText')
    .notEmpty()
    .trim(),
];

function organizationValidador(req, res, next) {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(status.BAD_REQUEST).json({
      title: 'an error occured now',
      error: errorValidation.array()
    });
  }
  next();
}

module.exports = { validations, organizationValidador };

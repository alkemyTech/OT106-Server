const { check, validationResult } = require('express-validator');
const status = require('../constants/httpStatus');

// array of general validation
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
  check('facebook').isURL(),
  check('instagram').isURL(),
  check('linkedin').isURL(),
];

// array of validations for contact
const validationsUrls = [
  check('email')
    .notEmpty()
    .isEmail().withMessage('enter a valid email'),
  check('facebook').isURL(),
  check('instagram').isURL(),
  check('linkedin').isURL(),
];


// verify all previous validations
function organizationValidador(req, res, next) {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(status.BAD_REQUEST).json({
      error: errorValidation.array()
    });
  }
  next();
}

module.exports = {
  validations,
  validationsUrls,
  organizationValidador
};

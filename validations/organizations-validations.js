const { check } = require('express-validator');
const { validator } = require('../middleware/organization-middleware');
const msg = require('../constants/organization-constant');

// array of general validation
const validateSchemaOrganization = [
  check('name').notEmpty().withMessage(msg.VALIDATE_NAME),
  check('image').notEmpty().withMessage(msg.VALIDATE_IMG),
  check('address').notEmpty().withMessage(msg.VALIDATE_ADDRESS),
  check('email')
      .notEmpty()
      .isEmail().withMessage(msg.VALIDATE_EMAIL),
  check('welcomeText')
      .notEmpty()
      .trim(),
  (req, res, next) => {
    validator(req, res, next);
  }
];

// array of validations for contact
const validateSchemaUrls = [
  check('email')
      .notEmpty()
      .isEmail().withMessage(msg.VALIDATE_EMAIL),
  check('facebook').isURL().withMessage(msg.VALIDATE_URL),
  check('instagram').isURL().withMessage(msg.VALIDATE_URL),
  check('linkedin').isURL().withMessage(msg.VALIDATE_URL),
  (req, res, next) => {
    validator(req, res, next);
  }
];

module.exports = {
  validateSchemaOrganization,
  validateSchemaUrls
};

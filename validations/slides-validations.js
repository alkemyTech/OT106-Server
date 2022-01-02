const { check } = require('express-validator');
const { validator } = require('../middleware/organization-middleware');
const msg = require('../constants/slide-constant');

// array of general validation
const validateSchemaSlide = [
  check('text').notEmpty().withMessage(msg.VALIDATE_TEXT),
  check('organizationId').notEmpty().withMessage(msg.VALIDATE_ORG),
  check('image').notEmpty().withMessage(msg.VALIDATE_IMG),
  (req, res, next) => {
    // ////////////// ISSUE -> validations have redudants methods =>  refactorization
    validator(req, res, next);
  }
];

module.exports = {
  validateSchemaSlide
};

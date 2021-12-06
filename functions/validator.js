const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus');

const validator = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json(errors);
  }
  next();
};

module.exports = validator;
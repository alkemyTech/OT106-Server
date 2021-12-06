const { checkSchema, validationResult } = require('express-validator');
const { BAD_REQUEST: BAD_REQUEST_CODE } = require('../constants/httpStatus');

// This function will be used by validators to validate their schemas
// with express-validator. But this shouldn't be used directly in routes,
// only through validators

// https://express-validator.github.io/docs/running-imperatively.html
module.exports = schema => async (req, res, next) => {
  // Gets all the validations to do
  const validations = checkSchema(schema);

  // Resolves the validations (promises) with it's run method
  await Promise.all(validations.map(validation => validation.run(req)));

  // Continues with the next function, when the run was errorless
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  // Takes out the errors messages
  const errorsMessages = errors.errors.map(x => x.msg);

  // Removes duplicates
  const filteredErrors = errorsMessages.filter(
    (el, idx) => idx === errorsMessages.indexOf(el)
  );

  return res.status(BAD_REQUEST_CODE).json({ errors: filteredErrors });
};

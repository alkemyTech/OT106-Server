const validateSchema = require('../middleware/validateSchema');
const { userValidation } = require('../constants/user-constant');

const createUpdateUserSchema = {
  firstName: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidation.invalidFirstName,
  },
  lastName: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidation.invalidLastName,
  },
  email: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isEmail: true,
    errorMessage: userValidation.invalidEmail
  },
  password: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isLength: { options: { min: 8 } },
    errorMessage: userValidation.shortPassword,
  },
};

// Remember, validateSchema returns a middleware function
module.exports = {
  validateUpdateUser: validateSchema(createUpdateUserSchema),
};

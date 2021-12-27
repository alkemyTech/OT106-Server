const validateSchema = require('../middleware/validateSchema');
const { userValidationMessages, userFailureMessages } = require('../constants/user-constant');
const { findUserByEmail } = require('../services/user-service');

const createUserSchema = {
  firstName: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidationMessages.firstName.invalid,
  },
  lastName: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidationMessages.lastName.invalid,
  },
  email: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isEmail: true,
    errorMessage: userValidationMessages.email.invalid,
    custom: {
      options: async (value) => {
        const aux = await findUserByEmail(value);
        if (aux === null) return Promise.resolve();
        return Promise.reject();
      },
      errorMessage: userValidationMessages.email.registered,
    },
  },
  password: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isLength: { options: { min: 8 } },
    errorMessage: userValidationMessages.password.short,
  },
};

const updateUserSchema = {
  firstName: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidationMessages.firstName.invalid,
  },
  lastName: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidationMessages.lastName.invalid,
  },
  email: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isEmail: true,
    errorMessage: userValidationMessages.email.invalid,
  },
  password: {
    in: ['body'],
    optional: true,
    notEmpty: false,
    isLength: { options: { min: 8 } },
    errorMessage: userValidationMessages.password.short,
  },
};

const loginUserSchema = {
  email: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isEmail: true,
    errorMessage: userValidationMessages.email.invalid,
  },
  password: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidationMessages.password.invalid,
  },
};

// Remember, validateSchema returns a middleware function
module.exports = {
  validateCreateUser: validateSchema(createUserSchema, userFailureMessages.validation),
  validateUpdateUser: validateSchema(updateUserSchema),
  validateLoginUser: validateSchema(loginUserSchema, userFailureMessages.validation),
};

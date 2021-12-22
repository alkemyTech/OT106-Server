const validateSchema = require('../middleware/validateSchema');
const { userValidation } = require('../constants/user-constant');
const { findUserByEmail } = require('../services/user-service');

const createUserSchema = {
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
    errorMessage: userValidation.invalidEmail,
    custom: {
      options: async (value) => {
        const aux = await findUserByEmail(value);
        if (aux === null) return Promise.resolve();
        return Promise.reject();
      },
      errorMessage: userValidation.registeredEmail,
    },
  },
  password: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isLength: { options: { min: 8 } },
    errorMessage: userValidation.shortPassword,
  },
};

const updateUserSchema = {
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
    optional: true,
    notEmpty: false,
    isLength: { options: { min: 8 } },
    errorMessage: userValidation.shortPassword,
  },
};

const loginUserSchema = {
  email: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    isEmail: true,
    errorMessage: userValidation.invalidEmail,
    custom: {
      options: async (value) => {
        const aux = await findUserByEmail(value);
        if (aux !== null) return Promise.resolve();
        return Promise.reject();
      },
      errorMessage: userValidation.unregisteredEmail,
    },
  },
  password: {
    in: ['body'],
    optional: false,
    notEmpty: true,
    errorMessage: userValidation.invalidPassword,
  },
};

// Remember, validateSchema returns a middleware function
module.exports = {
  validateCreateUser: validateSchema(createUserSchema),
  validateUpdateUser: validateSchema(updateUserSchema),
  validateLoginUser: validateSchema(loginUserSchema),
};

module.exports = {
  userSuccessMessages: {
    register: 'The user has been registered',
    getInfo: 'My personal information',
    login: 'Successful login',
  },
  userFailureMessages: {
    validation: 'There are some validation problems',
    notFound: "The user wasn't found",
    needToken: 'An access token is needed',
    wrongPassword: 'The password is incorrect',
  },
  userValidationMessages: {
    firstName: {
      invalid: 'The firstName is invalid',
    },
    lastName: {
      invalid: 'The lastName is invalid',
    },
    email: {
      invalid: 'The email is invalid',
      registered: 'The email is already registered',
      unregistered: "The email wasn't registered",
    },
    password: {
      invalid: 'The password is invalid',
      short: 'The password must be at least 8 characters long',
    },
  },
};

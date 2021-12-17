const code = require("../constants/httpStatus");
const message = require("../constants/message.js");

//Shared variables between handlers
const hasCustomError = (err) => typeof err.customError !== "undefined";
let errorToSend = {};

const developmentErrorHandler = (err, req, res) => {
  if (!hasCustomError(err)) {
    console.error(err);
    errorToSend = {
      status: err.status || code.INTERNAL_SERVER_ERROR,
      message:
        err.status === code.NOT_FOUND
          ? message.NOT_FOUND
          : message.INTERNAL_SERVER_ERROR,
      rawMessage: err.message,
      stack: err.stack,
    };

    return res.status(err.status).json(errorToSend);
  }

  console.error(err.customError);
  return res.status(err.customError.status).json(err.customError);
};

const testErrorHandler = (err, req, res) => {
  if (!hasCustomError(err)) {
    errorToSend = {
      status: err.status || code.INTERNAL_SERVER_ERROR,
      message:
        err.status === code.NOT_FOUND
          ? message.NOT_FOUND
          : message.INTERNAL_SERVER_ERROR,
      rawMessage: err.message,
      stack: err.stack,
    };
    return res.status(err.status).json(errorToSend);
  }

  return res.status(err.customError.status).json(err.customError);
};

const productionErrorHandler = (err, req, res) => {
  if (!hasCustomError(err)) {
    errorToSend = {
      status: err.status || code.INTERNAL_SERVER_ERROR,
      message:
        err.status === code.NOT_FOUND
          ? message.NOT_FOUND
          : message.INTERNAL_SERVER_ERROR,
    };
    return res.status(err.status).json(errorToSend);
  }

  return res.status(err.customError.status).json(err.customError);
};

const defaultErrorHandler = (err, req, res) => {
  console.error(
    "Something went wrong handling this error. 'process.env.NODE_ENV' should be set to 'development', 'test', or 'production'"
  );
  console.error(err);
  errorToSend = {
    status: code.INTERNAL_SERVER_ERROR,
    message: message.INTERNAL_SERVER_ERROR,
  };

  return res.status(code.INTERNAL_SERVER_ERROR).json(errorToSend);
};

module.exports = {
  developmentErrorHandler,
  testErrorHandler,
  productionErrorHandler,
  defaultErrorHandler,
};

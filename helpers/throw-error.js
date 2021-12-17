const {
  INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_CODE,
} = require("../constants/httpStatus");
const {
  INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_MESSAGE,
} = require("../constants/message");

module.exports = (status, message, body) => {
  const errorToThrow = new Error();
  errorToThrow.customError = { status, message, body };

  if (![status, message].every(Boolean)) {
    switch (process.env.NODE_ENV) {
      // This is an alert to the developer under a development environment
      case "development":
        console.log("An error was thrown with an incorrect format");
        console.log("All errors MUST have a status and a message");
        console.log(
          "Returning 500 status code and Internal Server Error Message"
        );
        break;

      case "test":
        //TODO
        break;

      case "production":
        //TODO
        break;

      default:
        console.log(
          "Something went wrong when checking 'process.env.NODE_ENV' "
        );
        console.log(
          "This variable should be set to 'test', 'development', or 'production'"
        );
        console.log(
          "Returning 500 status code and Internal Server Error Message"
        );
        break;
    }

    // When the error has a wrong format, throw a default one
    errorToThrow.customError = {
      status: INTERNAL_SERVER_ERROR_CODE,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    };
  }

  throw errorToThrow;
};

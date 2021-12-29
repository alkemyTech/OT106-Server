const code = require("../constants/httpStatus");
const codeMessage = require("../constants/message");

module.exports = (status, message, body) => {
  const { NODE_ENV } = process.env;
  const isUndefined = (prop) => typeof prop === "undefined";

  if ([status, message].some(isUndefined)) {
    switch (NODE_ENV) {
      case "development":
        console.error(
          "The response should include at least a 'status' and 'message' property"
        );
        console.error("Additionally, you can also include a 'body' property");
        break;
      default:
        break;
    }

    throwError(code.INTERNAL_SERVER_ERROR, codeMessage.INTERNAL_SERVER_ERROR);
  }

  const response = { status, message, body };
  return response;
};

const authentication = require("./authentication");
const { FORBIDDEN: FORBIDDEN_CODE } = require("../constants/httpStatus");
const { FORBIDDEN: FORBIDDEN_MESSAGE } = require("../constants/message");
const throwError = require("../functions/throw-error");

module.exports = [
  authentication,
  (req, res, next) => {
    // In order to access admin's content:
    //   - tokenPayload must be a property of the request (see authentication)
    //   - role must be a property of tokenPayload
    //   - role must be equal to ADMIN_ROLE_ID environment variable
    if (
      typeof req.tokenPayload === "undefined" ||
      req.tokenPayload.role !== parseInt(process.env.ADMIN_ROLE_ID, 10)
    ) {
      return throwError(FORBIDDEN_CODE, FORBIDDEN_MESSAGE);
    }

    return next();
  },
];

const authentication = require('./authentication');
const { FORBIDDEN: FORBIDDEN_CODE } = require('../constants/httpStatus');
const { FORBIDDEN: FORBIDDEN_MESSAGE } = require('../constants/message');

module.exports = [
  authentication,
  (req, res, next) => {
    // In order to access admin's content:
    //   - tokenPayload must be a property of the request (see authentication)
    //   - role must be a property of tokenPayload
    //   - role must be equal to ADMIN_ROLE_ID environment variable
    if (
      typeof req.tokenPayload === 'undefined' ||
      req.tokenPayload.role !== parseInt(process.env.ADMIN_ROLE_ID, 10)
    ) {
      return res.status(FORBIDDEN_CODE).send(FORBIDDEN_MESSAGE);
    }

    return next();
  },
];

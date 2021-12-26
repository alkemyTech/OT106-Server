const authentication = require('./authentication');
const { FORBIDDEN: FORBIDDEN_CODE } = require('../constants/httpStatus');
const { FORBIDDEN: FORBIDDEN_MESSAGE } = require('../constants/message');
const throwError = require('../functions/throw-error');

module.exports = [
  authentication,
  (req, res, next) => {
    // In order to access the content:
    //   - tokenPayload must exist (previous authentication)
    //   - user's id in the token must be equal to the id parameter sent OR
    //     the user sent has an admin role
    if (
      typeof req.tokenPayload === 'undefined' ||
      (req.tokenPayload.id !== parseInt(req.params.id, 10) &&
        req.tokenPayload.role !== parseInt(process.env.ADMIN_ROLE_ID, 10))
    ) {
      return throwError(FORBIDDEN_CODE, FORBIDDEN_MESSAGE);
    }

    return next();
  },
];

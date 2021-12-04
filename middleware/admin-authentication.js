const { validateToken } = require('../functions/jsonwebtoken');
const { FORBIDDEN: FORBIDDEN_CODE } = require('../constants/httpStatus');
const { FORBIDDEN: FORBIDDEN_MESSAGE } = require('../constants/message');

// Why this is very similar to middleware/authentication.js?
// Because this means to be used independently.
// If we only check here for roleId, we must be sure that authentication
// middleware ran before. Otherwise, tokenPayload won't be defined and
// this will return FORBIDDEN to any token that is sent

module.exports = (req, res, next) => {
  // Sends the request to validate the token
  const payload = validateToken(req);

  // The payload being null means of the follow:
  //   - the token didn't exist in the request
  //   - the token wasn't valid
  //   - the token expired
  if (payload === null) return res.status(FORBIDDEN_CODE).send(FORBIDDEN_MESSAGE);

  // In order to access admin's content, roleId must exists inside the
  // token's payload and be equal to ADMIN_ROLE_ID environment variable
  if (
    typeof payload.roleId === 'undefined' ||
    payload.roleId !== parseInt(process.env.ADMIN_ROLE_ID, 10)
  ) {
    return res.status(FORBIDDEN_CODE).send(FORBIDDEN_MESSAGE);
  }

  // Adds the payload of the token to the request. This will let access
  // it from another place without revalidating the token
  req.tokenPayload = payload;

  return next();
};

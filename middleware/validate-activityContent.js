const httpStatus = require('../constants/httpStatus');
const { NOT_ACCEPTABLE } = require('../constants/message');
const throwError = require('../functions/throw-error');

const checkActivity = (request, response, next) => {
  if (!request.body.name || !request.body.content || !request.file) {
    return throwError(httpStatus.NOT_ACCEPTABLE, NOT_ACCEPTABLE);
  }
  next();
};


module.exports = {
  checkActivity
};

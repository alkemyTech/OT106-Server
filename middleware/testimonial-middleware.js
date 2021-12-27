const code = require("../constants/httpStatus");
const {
  BAD_CREATE_TESTIMONIAL_REQUEST,
  BAD_UPDATE_TESTIMONIAL_REQUEST,
} = require("../constants/testimonial-constants");
const throwError = require("../functions/throw-error");

const validateCreateTestimonial = (req, res, next) => {
  let { name, image, content } = req.body;
  if (![name, image, content].every(Boolean)) {
    return throwError(code.BAD_REQUEST, BAD_CREATE_TESTIMONIAL_REQUEST);
  }

  next();
};

const validateUpdateTestimonial = (req, res, next) => {
  let { name, image, content } = req.body;
  if (![name, image, content].some(Boolean)) {
    return throwError(code.BAD_REQUEST, BAD_UPDATE_TESTIMONIAL_REQUEST);
  }

  next();
};

module.exports = {
  validateCreateTestimonial,
  validateUpdateTestimonial,
};

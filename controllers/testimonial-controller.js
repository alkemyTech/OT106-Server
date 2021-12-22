const testimonialService = require("../services/testimonial-service");
const catchAsync = require("../functions/catchAsync");

//http status codes
const code = require("../constants/httpStatus");

//http status messages
const message = require("../constants/message.js");

//response messages
const {
  GOT_TESTIMONIAL,
  CREATED_TESTIMONIAL,
  UPDATED_TESTIMONIAL,
  DELETED_TESTIMONIAL,
} = require("../constants/testimonial-constants.js");

//GET all testimonials
const list = catchAsync(async (req, res, next) => {
  const testimonials = await testimonialService.getTestimonials(req, res);
  res.status(code.OK).json({
    message: GOT_TESTIMONIAL,
    body: testimonials,
  });
});

//GET one testimonial by id
const find = catchAsync(async (req, res, next) => {
  const testimonial = await testimonialService.getTestimonialById(req, res);
  res.status(code.OK).json({
    message: GOT_TESTIMONIAL,
    body: testimonial,
  });
});

//POST a testimonial
const create = catchAsync(async (req, res, next) => {
  const testimonial = await testimonialService.createTestimonial(req, res);
  res.status(code.OK).json({
    message: CREATED_TESTIMONIAL,
    body: testimonial,
  });
});

//PATCH a testimonial by id
const update = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const testimonial = await testimonialService.updateTestimonial(req, res);
  res.status(code.OK).json({
    message: UPDATED_TESTIMONIAL(id),
    body: testimonial,
  });
});

//DELETE a testimonial by id
const remove = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  await testimonialService.deleteTestimonial(req, res);
  res.status(code.OK).json({
    message: DELETED_TESTIMONIAL(id),
  });
});

module.exports = {
  list,
  find,
  create,
  update,
  delete: remove,
};

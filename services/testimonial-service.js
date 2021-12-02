const testimonialRepository = require("../repositories/testimonial-repository.js");

//Response messages
const {
  BAD_CREATE_TESTIMONIAL_REQUEST,
  BAD_UPDATE_TESTIMONIAL_REQUEST,
  TESTIMONIAL_EXISTS,
  MISSING_TESTIMONIAL_ID,
  TESTIMONIAL_NOT_FOUND,
} = require("../constants/testimonials-constants");

//http status
const httpStatus = require("../constants/httpStatus");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = httpStatus;

const createTestimonials = async (req, res) => {
  //Incomplete request body
  //TODO: create a middleware for this logic
  let { name, image, content } = req.body;
  if (![name, image, content].every(Boolean)) {
    return res.status(BAD_REQUEST.code).send(BAD_CREATE_TESTIMONIAL_REQUEST);
  }

  const create = await testimonialRepository.createTestimonial(req);

  //Testimonial already exists
  if (create === false) {
    return res.status(INTERNAL_SERVER_ERROR).send(TESTIMONIAL_EXISTS);
  }

  //Success?
  return create;
};

const getTestimonials = async () => {
  const testimonials = await testimonialRepository.getTestimonials();

  //Couldn't find testimonial
  if (!testimonials[0]) {
    return res.status(NOT_FOUND.code).send(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  return testimonials;
};

const getTestimonialById = async (req, res) => {
  //Missing Id
  //TODO: create a middleware for this logic
  let { id } = req.params;
  if (!id) {
    return res.status(BAD_REQUEST.code).send(MISSING_TESTIMONIAL_ID);
  }

  const testimonial = await testimonialRepository.getTestimonialById(id);

  //Couldn't find testimonial
  if (!testimonial) {
    return res.status(NOT_FOUND.code).send(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  return testimonial;
};

const updateTestimonial = async (req, res) => {
  //Missing Id
  //TODO: create a middleware for this logic
  let { id } = req.params;
  if (!id) {
    return res.status(BAD_REQUEST.code).send(MISSING_TESTIMONIAL_ID);
  }

  //Incomplete request body
  //TODO: create a middleware for this logic
  let { name, image, content } = req.body;
  if (![name, image, content].some(Boolean)) {
    return res.status(BAD_REQUEST.code).send(BAD_UPDATE_TESTIMONIAL_REQUEST);
  }

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return res.status(NOT_FOUND.code).send(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  const update = await testimonialRepository.updateTestimonial(req);
  return update;
};

const deleteTestimonial = async (req, res) => {
  //Missing Id
  //TODO: create a middleware for this logic
  let { id } = req.params;
  if (!id) {
    return res.status(BAD_REQUEST.code).send(MISSING_TESTIMONIAL_ID);
  }

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return res.status(NOT_FOUND.code).send(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  const remove = await testimonialRepository.deleteTestimonial(id);
  return remove;
};

module.exports = {
  createTestimonials,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

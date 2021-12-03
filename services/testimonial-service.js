const testimonialRepository = require("../repositories/testimonial-repository.js");

//Response messages
const {
  BAD_CREATE_TESTIMONIAL_REQUEST,
  BAD_UPDATE_TESTIMONIAL_REQUEST,
  TESTIMONIAL_EXISTS,
  TESTIMONIAL_NOT_FOUND,
} = require("../constants/testimonial-constants");

//http status
const code = require("../constants/httpStatus");

const createTestimonials = async (req, res) => {
  //Incomplete request body
  //TODO: create a middleware for this logic
  let { name, image, content } = req.body;
  if (![name, image, content].every(Boolean)) {
    return res.status(code.BAD_REQUEST).json(BAD_CREATE_TESTIMONIAL_REQUEST);
  }

  const create = await testimonialRepository.createTestimonial(req);

  //Testimonial already exists
  if (create === false) {
    return res.status(code.INTERNAL_SERVER_ERROR).json(TESTIMONIAL_EXISTS);
  }

  //Success?
  return create;
};

const getTestimonials = async () => {
  const testimonials = await testimonialRepository.getTestimonials();

  //Couldn't find testimonial
  if (!testimonials[0]) {
    return res.status(code.NOT_FOUND).json(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  return testimonials;
};

const getTestimonialById = async (req, res) => {
  let { id } = req.params;
  const testimonial = await testimonialRepository.getTestimonialById(id);

  //Couldn't find testimonial
  if (!testimonial) {
    return res.status(code.NOT_FOUND).json(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  return testimonial;
};

const updateTestimonial = async (req, res) => {
  let { id } = req.params;

  //Incomplete request body
  //TODO: create a middleware for this logic
  let { name, image, content } = req.body;
  if (![name, image, content].some(Boolean)) {
    return res.status(code.BAD_REQUEST).json(BAD_UPDATE_TESTIMONIAL_REQUEST);
  }

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return res.status(code.NOT_FOUND).json(TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  const update = await testimonialRepository.updateTestimonial(req);
  return update;
};

const deleteTestimonial = async (req, res) => {
  let { id } = req.params;

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return res.status(code.NOT_FOUND).json(TESTIMONIAL_NOT_FOUND);
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

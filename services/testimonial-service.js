const testimonialRepository = require("../repositories/testimonial-repository.js");

//Response messages
const {
  TESTIMONIAL_NOT_FOUND,
} = require("../constants/testimonial-constants");

//http status
const code = require("../constants/httpStatus");

const createTestimonial = async (req, res) => {
  const create = await testimonialRepository.createTestimonial(req);

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
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

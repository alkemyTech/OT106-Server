const testimonialService = require("../services/testimonial-service");

//http status
const { OK, INTERNAL_SERVER_ERROR } = require("../constants/httpStatus");

//GET all testimonials
const list = async (req, res) => {
  try {
    const testimonials = await testimonialService.getTestimonials();
    res.status(OK.code).send(testimonials);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
  }
};

//GET one testimonial by id
const find = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req, res);
    res.status(OK.code).send(testimonial);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
  }
};

//POST a testimonial
const create = async (req, res) => {
  try {
    const testimonial = await testimonialService.createTestimonials(req, res);
    res.status(OK.code).send(testimonial);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
  }
};

//PATCH a testimonial by id
const update = async (req, res) => {
  try {
    const testimonial = await testimonialService.updateTestimonial(req, res);
    res.status(OK.code).send(testimonial);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
  }
};

//DELETE a testimonial by id
const remove = async (req, res) => {
  try {
    const testimonial = await testimonialService.deleteTestimonial(req, res);
    res.status(OK.code).send(testimonial);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR.message);
  }
};

module.exports = {
  list,
  find,
  create,
  update,
  delete: remove,
};

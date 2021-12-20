require("dotenv").config();
const testimonialRepository = require("../repositories/testimonial-repository.js");

//Response messages
const { TESTIMONIAL_NOT_FOUND } = require("../constants/testimonial-constants");

//http status
const code = require("../constants/httpStatus");

const createTestimonial = async (req, res) => {
  const create = await testimonialRepository.createTestimonial(req);

  //Success?
  return create;
};

const getTestimonials = async (req, res) => {
  //Query
  const pageQuery = req.query.page;

  //Default page is 0
  let page = 0;
  const pageAsNumber = parseInt(pageQuery);

  //Use page query if valid
  if (pageQuery > 0 && !isNaN(pageAsNumber)) {
    page = parseInt(pageQuery);
  }

  //Repository
  const testimonials = await testimonialRepository.getTestimonials(page);

  //Couldn't find testimonial
  if (!testimonials.rows[0]) {
    return res.status(code.NOT_FOUND).json({ message: TESTIMONIAL_NOT_FOUND });
  }

  //Env Variables
  const HOST = process.env.HOST;
  const PORT = process.env.PORT;
  const HTTP_OR_HTTPS = process.env.HOST_HTTP_OR_HTTPS;

  //Add links if possible
  if (page > 0) {
    testimonials.previousPage = `${HTTP_OR_HTTPS}://${HOST}:${PORT}/testimonials/?page=${
      page - 1
    }`;
  }

  if (page < testimonials.totalPages - 1) {
    testimonials.nextPage = `${HTTP_OR_HTTPS}://${HOST}:${PORT}/testimonials/?page=${
      page + 1
    }`;
  }
  //Success?
  return testimonials;
};

const getTestimonialById = async (req, res) => {
  let { id } = req.params;
  const testimonial = await testimonialRepository.getTestimonialById(id);

  //Couldn't find testimonial
  if (!testimonial) {
    return res.status(code.NOT_FOUND).json({ message: TESTIMONIAL_NOT_FOUND });
  }

  //Success?
  return testimonial;
};

const updateTestimonial = async (req, res) => {
  let { id } = req.params;

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return res.status(code.NOT_FOUND).json({ message: TESTIMONIAL_NOT_FOUND });
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
    return res.status(code.NOT_FOUND).json({ message: TESTIMONIAL_NOT_FOUND });
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

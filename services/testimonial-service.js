require("dotenv").config();
const testimonialRepository = require("../repositories/testimonial-repository.js");
const baseRepository = require("../repositories/_base-repository");
const throwError = require("../functions/throw-error");

//Response messages
const { TESTIMONIAL_NOT_FOUND } = require("../constants/testimonial-constants");

//http status
const code = require("../constants/httpStatus");

const createTestimonial = async (req, res) => {
  let filename = (req.body.name + Date.now()).toString().trim();
  filename = filename.replace(/\s+/g, "");
  const image = await baseRepository.uploadImage(req, filename);
  const body = {
    name: req.body.name,
    image,
    content: req.body.content,
  };
  const create = await testimonialRepository.createTestimonial(body);

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
    return throwError(code.NOT_FOUND, TESTIMONIAL_NOT_FOUND);
  }

  //Env Variables
  const { PORT, HOST, PROTOCOL } = process.env;

  //Add links if possible
  if (page > 0) {
    testimonials.previousPage = `${PROTOCOL}://${HOST}:${PORT}/testimonials/?page=${
      page - 1
    }`;
  }

  if (page < testimonials.totalPages - 1) {
    testimonials.nextPage = `${PROTOCOL}://${HOST}:${PORT}/testimonials/?page=${
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
    return throwError(code.NOT_FOUND, TESTIMONIAL_NOT_FOUND);
  }

  //Success?
  return testimonial;
};

const updateTestimonial = async (req, res) => {
  let { id } = req.params;

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return throwError(code.NOT_FOUND, TESTIMONIAL_NOT_FOUND);
  }
  let { body } = req;
  //Check for image file

  if (req.file) {
    let filename = (req.body.name + Date.now()).toString().trim();
    filename = filename.replace(/\s+/g, "");
    const url = await baseRepository.uploadImage(req, filename);
    body.image = url;
  }

  //Success?
  const update = await testimonialRepository.updateTestimonial(id, body);
  return update;
};

const deleteTestimonial = async (req, res) => {
  let { id } = req.params;

  //Check if it exists
  const testimonial = await testimonialRepository.getTestimonialById(id);
  if (!testimonial) {
    return throwError(code.NOT_FOUND, TESTIMONIAL_NOT_FOUND);
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

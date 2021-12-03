const testimonialService = require("../services/testimonial-service");

//http status codes
const code = require("../constants/httpStatus");

//http status messages 
const message = require("../constants/message.js");

//response messages
const { GOT_TESTIMONIAL, CREATED_TESTIMONIAL, UPDATED_TESTIMONIAL, DELETED_TESTIMONIAL } = require("../constants/testimonial-constants.js")

//GET all testimonials
const list = async (req, res) => {
  try {
    const testimonials = await testimonialService.getTestimonials();
    res.status(code.OK).json({
      message: GOT_TESTIMONIAL,
      body: testimonials
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//GET one testimonial by id
const find = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req, res);
    res.status(code.OK).json({
      message: GOT_TESTIMONIAL,
      body: testimonial
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//POST a testimonial
const create = async (req, res) => {
  try {
    const testimonial = await testimonialService.createTestimonials(req, res);
    res.status(code.OK).json({
      message: CREATED_TESTIMONIAL,
      body: testimonial
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//PATCH a testimonial by id
const update = async (req, res) => {
  let {id} = req.params;
  try {
    const testimonial = await testimonialService.updateTestimonial(req, res);
    res.status(code.OK).json({
      message: UPDATED_TESTIMONIAL(id),
      body: testimonial
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

//DELETE a testimonial by id
const remove = async (req, res) => {
  let {id} = req.params;
  try {
    await testimonialService.deleteTestimonial(req, res);
    res.status(code.OK).json({
      message: DELETED_TESTIMONIAL(id)
    });
  } catch (error) {
    console.error(error);
    res.status(code.INTERNAL_SERVER_ERROR).json(message.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  list,
  find,
  create,
  update,
  delete: remove,
};

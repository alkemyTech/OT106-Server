const testimonialController = require('../controllers/testimonial-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const {
  validateCreateTestimonial,
  validateUpdateTestimonial,
} = require('../middleware/testimonial-middleware');

const getTestimonials = testimonialController.list;

const getTestimonial = testimonialController.find;

const createTestimonial = [
  adminAuthentication,
  validateCreateTestimonial,
  testimonialController.create
];

const updateTestimonial = [
  adminAuthentication,
  validateUpdateTestimonial,
  testimonialController.update
];

const deleteTestimonial = [
  adminAuthentication,
  testimonialController.delete
];

module.exports = {
  getTestimonial,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};

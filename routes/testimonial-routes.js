const router = require('express').Router();

const {
  getTestimonial, getTestimonials,
  createTestimonial, updateTestimonial,
  deleteTestimonial
} = require('../combinations/testimonial-combination');

// GET
router.get('/:id', getTestimonial);
router.get('/', getTestimonials);

// POST
router.post('/', createTestimonial);

// PATCH
router.patch('/:id', updateTestimonial);

// DELETE
router.delete('/:id', deleteTestimonial);

module.exports = router;

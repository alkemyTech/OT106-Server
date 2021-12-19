const { getSlides, getSlide } = require('../combinations/slides-combination');

const router = require('express').Router();

// list imageUrl and order for all slides
router.get('/', getSlides);

// list details for slide
router.get('/:id', getSlide);

module.exports = router;

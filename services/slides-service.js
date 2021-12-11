const { SlideRepository } = require('../repositories');
const status = require('../constants/httpStatus');
const { SLIDE_NOT_FOUND } = require('../constants/slide-constant');

// validations for BODY and ID belongs to a middleware
async function createslide(body) {
  const newSlide = await SlideRepository.create(body);
  return newSlide;
}

async function findSlideById(id) {
  const slide = await SlideRepository.findOne(id);
  if (!slide) {
    const error = new Error();
    error.message = SLIDE_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }
  return slide;
}


async function findAllSlides() {
  const slides = await SlideRepository.findAll();
  return slides;
}

async function updateSlide(body, id) {
  const slide = await findSlideById(id);
  if (!slide) {
    const error = new Error();
    error.message = SLIDE_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }

  const updatedslide = await SlideRepository.update(body, id);
  return updatedslide;
}


async function destroySlide(id) {
  const slide = await SlideRepository.findeOne(id);
  if (!slide) {
    const error = new Error();
    error.message = SLIDE_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }
  const destroyed = await SlideRepository.destroy(id);
  return destroyed;
}


module.exports = {
  createslide,
  findSlideById,
  findAllSlides,
  updateSlide,
  destroySlide
};

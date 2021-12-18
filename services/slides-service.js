const { SlideRepository } = require('../repositories');
const { findOrganizationById } = require('../services/organization-service');
const status = require('../constants/httpStatus');
const { SLIDE_NOT_FOUND, ORG_NOT_FOUND } = require('../constants/slide-constant');
const { uploadFileToAmazonS3Bucket } = require('./amazon-s3-service');

// validations for BODY and ID belongs to a middleware
async function createslide(body, transactionT, buffer) {
  // find organization by id
  const org = await findOrganizationById(body.organizationId);
  if (!org) {
    const error = new Error();
    error.message = ORG_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }

  // image stored in req as a buffer (middleware/upload-base64)

  // generate url with S3service
  // filename + buffer
  const filename = (org.name + Date.now() /* + body.format */).toString();
  const urlS3 = await uploadFileToAmazonS3Bucket(filename.trim(), buffer);
  const newSlide = await SlideRepository.create({ ...body, imgUrl: urlS3 }, { transaction: transactionT });
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


async function findAllSlides(opt) {
  const slides = await SlideRepository.findAll(opt);
  return slides;
}

async function findByOrgId(id) {
  const slides = await SlideRepository.findByOrgId(id);
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

async function bulkUpdate(slides, transactionT) {
  const slidesUpdated = await SlideRepository.bulkUpdate(slides, transactionT);
  return slidesUpdated;
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
  findByOrgId,
  findAllSlides,
  updateSlide,
  bulkUpdate,
  destroySlide
};

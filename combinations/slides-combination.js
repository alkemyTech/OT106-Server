const { SlidesController } = require('../controllers/');
const adminAuthentication = require('../middleware/admin-authentication');

const getSlides = [
  adminAuthentication, // try to validate admin user
  SlidesController.findAllSlides
];

const getSlide = [
  adminAuthentication, // try to validate admin user
  SlidesController.findSlideByPk
];

module.exports = { getSlides, getSlide };

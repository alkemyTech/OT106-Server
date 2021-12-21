const express = require('express');
const { SlidesController } = require('../controllers/');
const adminAuthentication = require('../middleware/admin-authentication');
const { decodeImgBase64 } = require('../middleware/upload-base64');
const { validateSchemaSlide } = require('../validations/slides-validations');

const router = express.Router();

// list imageUrl and order for all slides
router.get('/',
    adminAuthentication, // try to validate admin user
    SlidesController.findAllSlides);

// list details for slide
router.get('/:id',
    adminAuthentication, // try to validate admin user
    SlidesController.findSlideByPk);

router.post('/',
    adminAuthentication, // try to validate admin user
    validateSchemaSlide,
    decodeImgBase64, // decode and save img in req object
    SlidesController.createSlide
    );


router.put('/:id',
    adminAuthentication, // try to validate admin user
    validateSchemaSlide,
    decodeImgBase64, // decode and save img in req object
    SlidesController.updateSlide
    );

module.exports = router;

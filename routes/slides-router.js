const express = require('express');
const { SlidesController } = require('../controllers/');
const adminAuthentication = require('../middleware/admin-authentication');
// const { } = require('../middleware');

const router = express.Router();

// list imageUrl and order for all slides
router.get('/',
    // adminAuthentication, // try to validate admin user
    SlidesController.findAllSlides);


module.exports = router;

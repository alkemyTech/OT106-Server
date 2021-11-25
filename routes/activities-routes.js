require('dotenv').config()
const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities-controller')
const activitiesValidation = require('../validations/activities-validators')
const validate = require('../middleware/validate')
const upload = require('../functions/uploadEngine')

router.route('/')
    .post(validate(activitiesValidation.createActivity),upload.single('image'), activitiesController.createActivity)

router.route('/:id')
    .get(activitiesController.getActivity)
module.exports =  router
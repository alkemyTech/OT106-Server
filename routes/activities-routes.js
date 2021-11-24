require('dotenv').config()
const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities-controller')
const activitiesValidation = require('../validations/activities-validators')
const validate = require('../middleware/validate')

router.route('/')
    .post(validate(activitiesValidation.createActivity), activitiesController.createActivity)


module.exports =  router
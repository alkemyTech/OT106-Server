require('dotenv').config()
const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities-controller')
const activitiesValidation = require('../validations/activities-validators')
const validate = require('../middleware/validate')
const upload = require('../functions/uploadEngine')

router.route('/')
    .post(validate(activitiesValidation.createActivity),upload.single('image'), activitiesController.createActivity)
    .get(activitiesController.getActivities)
    

router.route('/:id')
    .get(validate(activitiesController.getActivity), activitiesController.getActivity )
    .delete(validate(activitiesController.deleteActivity), activitiesController.deleteActivity)
    .patch(upload.single('image'),activitiesController.editActivity)

router.route('/image/:id')
    .get(validate(activitiesController.getActivity), activitiesController.getActivityimage)

module.exports =  router
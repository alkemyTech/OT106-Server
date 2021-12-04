require('dotenv').config()
const express = require('express')
const router = express.Router()
const activitiesController = require('../controllers/activities-controller')
const activitiesValidation = require('../validations/activities-validators')
const validate = require('../middleware/validate')
const upload = require('../functions/uploadEngine')
const adminPermission = require('../middleware/admin-authentication')

router.route('/')
    .post(adminPermission,validate(activitiesValidation.createActivity),upload.single('image'), activitiesController.createActivity)
    .get(activitiesController.getActivities)
    

router.route('/:id')
    .get(validate(activitiesController.getActivity), activitiesController.getActivity )
    .delete(adminPermission,validate(activitiesController.deleteActivity), activitiesController.deleteActivity)
    .patch(adminPermission,validate(activitiesValidation.editActivity),upload.single('image'),activitiesController.editActivity)

router.route('/image/:id')
    .get(validate(activitiesController.getActivity), activitiesController.getActivityimage)

module.exports =  router
require('dotenv').config()
const express = require('express')
const router = express.Router()
const activitiesCombination = require('../combinations/activities-combination')

router.route('/')
    .post(activitiesCombination.createActivity)
    .get(activitiesCombination.getActivities)
    

router.route('/:id')
    .get(activitiesCombination.getActivity )
    .delete(activitiesCombination.deleteActivity)
    .patch(activitiesCombination.editActivity)

router.route('/image/:id')
    .get(activitiesCombination.getActivityimage)

module.exports =  router
const activitiesController = require('../controllers/activities-controller')
const activitiesValidation = require('../validations/activities-validators')
const validate = require('../middleware/validate')
const upload = require('../functions/uploadEngine')
const adminPermission = require('../middleware/admin-authentication')
const {checkActivity} = require('../middleware/validate-activityContent')



const createActivity = [
    adminPermission, 
    validate(activitiesValidation.createActivity),
    checkActivity,
    upload.single('image'),
    activitiesController.createActivity
]

const getActivities = [
    activitiesController.getActivities
]

const getActivity = [
    validate(activitiesController.getActivity),
    activitiesController.getActivity,
]
const deleteActivity = [
    adminPermission,
    validate(activitiesController.deleteActivity),
    activitiesController.deleteActivity
]
const editActivity = [
    adminPermission,
    validate(activitiesValidation.editActivity),
    upload.single('image'),
    activitiesController.editActivity
]

const getActivityimage = [
    validate(activitiesController.getActivity),
    activitiesController.getActivityimage
]

module.exports={createActivity,
    getActivities,
    getActivity,
    deleteActivity,
    editActivity,
    getActivityimage}
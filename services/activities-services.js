require('dotenv').config()
const activitiesRepository = require('../repositories/activities-repository')
const {NOT_ACCEPTABLE,NOT_FOUND} = require('../constants/httpStatus')

async function createActivity(request,response){     
    if (!request.file) return response.status(NOT_ACCEPTABLE.code).send(NOT_ACCEPTABLE.message)
    if (!request.body.name) return response.status(NOT_ACCEPTABLE.code).send(NOT_ACCEPTABLE.message)
    if (!request.body.content) return response.status(NOT_ACCEPTABLE.code).send(NOT_ACCEPTABLE.message)

    const newActivity = await  activitiesRepository.createActivity(request)
    return newActivity
    };

async function getActivityimage(request,response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(NOT_FOUND.code).send(NOT_FOUND.message)
    return getActivity
}

async function getActivity(request,response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(NOT_FOUND.code).send(NOT_FOUND.message)
    return getActivity
}

async function getActivities(request,response){
    const activities = await activitiesRepository.getActivities()
    return activities

}
   
async function editActivity(request, response){
    const activity = await activitiesRepository.editActivity(request)
    return activity
}


async function deleteActivity(request, response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(400).send(ACITIVITY_NOT_FOUND)
    const activityDelete = await activitiesRepository.deleteActivity(request)
    return activityDelete
}


module.exports = {
    createActivity,
    getActivity,
    getActivities,
    getActivityimage,
    editActivity,
    deleteActivity
}
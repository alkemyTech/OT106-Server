require('dotenv').config()
const activitiesRepository = require('../repositories/activities-repository')
const {
    IMAGE_NOT_FOUND,
    NAME_NOT_FOUND,
    CONTENT_NOT_FOUND,
    ACITIVITY_NOT_FOUND} = require('../constants/activities-constan')

async function createActivity(request,response){     
    if (!request.file) return response.status(400).send(IMAGE_NOT_FOUND)
    if (!request.body.name) return response.status(400).send(NAME_NOT_FOUND)
    if (!request.body.content) return response.status(400).send(CONTENT_NOT_FOUND)

    const newActivity = await  activitiesRepository.createActivity(request)
    return newActivity
    };

async function getActivityimage(request,response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(400).send(ACITIVITY_NOT_FOUND)
    return getActivity
}

async function getActivity(request,response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(400).send(ACITIVITY_NOT_FOUND)
    return getActivity
}

async function getActivities(request,response){
    const activities = await activitiesRepository.getActivities()
    return activities

}
   
async function editActivity(request, response){

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
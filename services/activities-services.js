require('dotenv').config()
const httpStatus = require('http-status');
const {NOT_ACCEPTABLE,NOT_FOUND} = require('../constants/message')

const activitiesRepository = require('../repositories/activities-repository')

async function createActivity(request,response){     
   

    const newActivity = await  activitiesRepository.createActivity(request)
    return newActivity
    };

async function getActivityimage(request,response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(httpStatus.NOT_FOUND).send(NOT_FOUND)
    return getActivity
}

async function getActivity(request,response){
    const getActivity = await activitiesRepository.getActivity(request)
    if (!getActivity) return response.status(httpStatus.NOT_FOUND).send(NOT_FOUND)
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
    if (!getActivity) return response.status(httpStatus.NOT_FOUND).send(NOT_FOUND)
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
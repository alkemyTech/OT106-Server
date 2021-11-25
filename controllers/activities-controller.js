require('dotenv').config()
const activityService = require('../services/activities-services')
const catchAsync = require('../functions/catchAsync')
const path = require('path')
const {IMAGE_PATH} = require('../constants/activities-constan')


const createActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.createActivity(request,response)
    return response.status(200).send(activity)

})

const getActivityimage = catchAsync(async (request,response)=> {
    const activity = await activityService.getActivityimage(request,response)
    return response.status(200).sendFile(path.join(__dirname,IMAGE_PATH,activity.image))
})
const getActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.getActivity(request,response)
    return response.status(200).send(activity)
})

const getActivities = catchAsync(async (request,response)=> {
    const activities = await activityService.getActivities(request,response)
    return response.status(200).send(activities)

})

const deleteActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.deleteActivity(request,response)
    return response.status(200).send({message:"OK"})

})



module.exports = {
    createActivity,
    getActivity,
    getActivityimage,
    getActivities,
    deleteActivity

}
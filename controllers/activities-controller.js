require('dotenv').config()
const activityService = require('../services/activities-services')
const catchAsync = require('../functions/catchAsync')
const path = require('path')
const httpStatus = require('http-status');
const message = require('../constants/message')

const {OK} = require('../constants/message')


const createActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.createActivity(request,response)
    return response.status(httpStatus.CREATED).json({message:message.OK, body:activity})

})

const getActivityimage = catchAsync(async (request,response)=> {
    const activity = await activityService.getActivityimage(request,response)
    return response.status(httpStatus.OK).sendFile(path.join(__dirname,process.env.IMAGE_PATH,activity.image))
})
const getActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.getActivity(request,response)
    return response.status(httpStatus.OK).json({message:message.OK, body:activity})
})

const getActivities = catchAsync(async (request,response)=> {
    const activities = await activityService.getActivities(request,response)
    return response.status(httpStatus.OK).json({message:message.OK, body:activities})

})

const deleteActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.deleteActivity(request,response)
    return response.status(httpStatus.OK).json({message:message.OK})

})

const editActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.editActivity(request,response)
    return response.status(httpStatus.OK).json({message:message.OK,body:activity})

})

module.exports = {
    createActivity,
    getActivity,
    getActivityimage,
    getActivities,
    deleteActivity,
    editActivity

}
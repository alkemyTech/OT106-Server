require('dotenv').config()
const activityService = require('../services/activities-services')
const catchAsync = require('../functions/catchAsync')


const createActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.createActivity(request,response)
    return response.status(200).send(activity)

})

const getActivity = catchAsync(async (request,response)=> {
    const activity = await activityService.getActivity(request,response)
    return response.status(200).send(activity)

})


module.exports = {
    createActivity,
    getActivity,
    
}
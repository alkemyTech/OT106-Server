require('dotenv').config()
const activitiesRepository = require('../repositories/activities-repository')



async function createActivity(request,response){     
    
    const newActivity = await  activitiesRepository.createActivity(request.body)
    
    return newActivity
}

module.exports = {
    createActivity
}
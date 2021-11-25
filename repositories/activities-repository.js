'use strict'
require('dotenv').config()

const { sequelize } = require('../models');
const Activities = require('../models/activities-model');
const Activity = Activities(sequelize)

async function createActivity(request){     
    const newActivity = Activity.create(
        {
            name: request.body.name,
            content: request.body.content,
            image: request.file.filename 
        }
    )   
    return newActivity
}


async function getActivity(request){
    const activity = Activity.findOne({
        where: {
          id: request.params.id
        },
        paranoid: false

        })
    return activity
}

async function getActivities(){
    const activities = Activity.findAll({
        paranoid: false

    })

    return activities
}
async function editActivity(request){
  if (request.file !== undefined){
    const activityImage = await Activity.update({
        image:request.file.filename,
      },

            {where:{
                id : request.params.id } 
            }
        )
    } 
    const activity = await Activity.update(
        request.body,
        {where:{
            id : request.params.id } 
        }
        
    )
    
    return activity
}


async function deleteActivity(request){
    const activity = Activity.destroy({
        where: {
          id: request.params.id
        }
        })
    return activity
}

    

module.exports = {
    createActivity,
    getActivity,
    getActivities,
    editActivity,
    deleteActivity
}
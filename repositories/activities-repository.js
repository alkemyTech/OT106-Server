'use strict'
require('dotenv').config()

const { response } = require('express');
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
    const activity = findOne({
        where: {
          id: request.params.id
        }
        })
    return activity
}

    

module.exports = {
    createActivity
}
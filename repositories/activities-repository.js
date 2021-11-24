'use strict'
require('dotenv').config()

const { sequelize } = require('../models');
const Activities = require('../models/activities-model');
const Activity = Activities(sequelize)

async function createActivity(body){     
    const newActivity = Activity.create(
        body
    )   
    return newActivity
}
module.exports = {
    createActivity
}
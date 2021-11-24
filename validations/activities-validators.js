const Joi = require('joi')
const {isImage} = require('./customValidation')

const createActivity = {
    FormData: Joi.object({
        name: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.custom(isImage).required()

    }) 
}
module.exports = {
    createActivity
}
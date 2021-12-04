const Joi = require('joi');

const createMember = {
    FormData: Joi.object({
        name: Joi.string().required()
    }) 
}

module.exports = { createMember };
const Joi = require('joi')
const {isImage} = require('./customValidation')

const createActivity = {
    FormData: Joi.object({
        name: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.custom(isImage).required()

    }) 
}
const getActivity={
    params: Joi.object(),
        id: Joi.number().min(1).required()
}

const editActivity = {
    params: Joi.object().keys({
      id: Joi.number().min(1).required()
    }),
    body: Joi.object()
      .keys({
        title: Joi.string(),
        content: Joi.string(),
        image: Joi.custom(isImage),
      })
};

const deleteActivity={
    params: Joi.object(),
        id: Joi.number().min(1).required()
}  

module.exports = {
    createActivity, 
    getActivity,
    editActivity,
    deleteActivity
}
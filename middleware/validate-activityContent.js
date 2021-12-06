const httpStatus = require('http-status')
const {NOT_ACCEPTABLE} = require('../constants/message')
const checkActivity = (request,response,next) => {
    if (!request.body.name || !request.body.content || !request.file){
        return response.status(httpStatus.NOT_ACCEPTABLE).send(NOT_ACCEPTABLE)
    }
    next()
}


module.exports = {
    checkActivity
}
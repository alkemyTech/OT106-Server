const httpStatus = require('http-status')
const {NOT_ACCEPTABLE} = require('../constants/message')
const checkActivity = (request,response,next) => {
    if (!request.body.name || !request.body.content || !request.file){
        throwError(httpStatus.NOT_FOUND, NOT_FOUND)
        return throwError(httpStatus.NOT_ACCEPTABLE, NOT_ACCEPTABLE)
    }
    next()
}


module.exports = {
    checkActivity
}
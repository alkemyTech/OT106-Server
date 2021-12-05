const checkActivity = (request,response,next) => {
    if (!request.body.name || !request.body.content || !request.file){
        return response.status(200).send("NOT_ACCEPTABLE")
    }
    next()
}


module.exports = {
    checkActivity
}
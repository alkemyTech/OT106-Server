const {validationResult}= require("express-validator");

const validateResult= (req,res,next)=>{

    try{
        validationResult(req).throw()
        return next()
    }catch(e){
        res.status(403);
        console.log(e)
    }
}

module.exports={validateResult}
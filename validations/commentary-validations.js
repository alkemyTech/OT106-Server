const {check}= require("express-validator");
const {validateResult}= require("../helpers/validateHelper")

const validateCreate=[
    check('body')
    .exists()
    .not()
    .isEmpty(),
    check('NewsId')
    .exists()
    .not()
    .isEmpty(),
    check('UserId')
    .exists()
    .not()
    .isEmpty(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }

]

module.exports={validateCreate};
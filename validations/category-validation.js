const { check } = require('express-validator');


module.exports = [
  
 check("name")
 .notEmpty().bail()
 .isAlpha()

];
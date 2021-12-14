require('dotenv').config();
const express = require('express');
const router = express.Router();
const {addCommentary,deleteCommentary,modifyCommentary,getCommentary,getAllCommentaries} = require('../controllers/commentary-controller')
const {validateCreate}= require("../validations/commentary-validations")
const upload= require("../middleware/upload");
const adminAuthentication = require("../middleware/admin-authentication");
const authentication = require('../middleware/authentication');
router.route('/')
    .post(authentication,upload,validateCreate,addCommentary)
    .get(adminAuthentication,getAllCommentaries);

router.route('/:id')
    .get(authentication, getCommentary)
    .delete(authentication,deleteCommentary)
    .patch( authentication,upload,modifyCommentary)


module.exports =  router 
require('dotenv').config();
const express = require('express');
const router = express.Router();
const {addCommentary,deleteCommentary,modifyCommentary,getCommentary,getAllCommentaries} = require('../controllers/commentary-controller')
const {validateCreate}= require("../validations/commentary-validations")
const upload= require("../middleware/upload")
router.route('/')
    .post(upload,validateCreate,addCommentary,upload)
    .get(getAllCommentaries);

router.route('/:id')
    .get(getCommentary)
    .delete(deleteCommentary)
    .patch( upload,modifyCommentary)


module.exports =  router 
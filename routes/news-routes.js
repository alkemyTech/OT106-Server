require('dotenv').config();
const express = require('express');
const router = express.Router();
const {addNews,deleteNews,modifyNews,getNews,getAllNews} = require('../controllers/news-controller')
const {validateCreate}= require("../validations/news-validations")
const upload= require("../middleware/upload")
router.route('/')
    .post(upload,validateCreate,addNews)
    .get(getAllNews);

router.route('/:id')
    .get(getNews)
    .delete(deleteNews)
    .patch( upload,modifyNews)


module.exports =  router 
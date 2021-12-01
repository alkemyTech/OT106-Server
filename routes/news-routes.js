require('dotenv').config()
const express = require('express')
const router = express.Router()
const {addNews,deleteNews,modifyNews,getNews,getAllNews} = require('../controllers/news-controller')

router.route('/')
    .post(addNews)
    .get(getAllNews);
    

router.route('/:id')
    .get(getNews)
    .delete(deleteNews)
    .patch(modifyNews)


module.exports =  router
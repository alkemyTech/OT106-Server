require('dotenv').config();
const express = require('express');
const router = express.Router();
const {addNews,deleteNews,modifyNews,getNews,getAllNews} = require('../controllers/news-controller')
const {validateCreate}= require("../validations/news-validations")
const upload= require("../middleware/upload");
const adminAuthentication = require("../middleware/admin-authentication");
router.route('/')
    .post(adminAuthentication,upload,validateCreate,addNews)
    .get(adminAuthentication,getAllNews);// /?page=NUMBER

router.route('/:id')
    .get(adminAuthentication,getNews)
    .delete(adminAuthentication,deleteNews)
    .patch(adminAuthentication, upload,modifyNews)


module.exports =  router 
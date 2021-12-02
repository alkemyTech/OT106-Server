const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/category-controller');

// /categories
router.get('/',categoryController.list)







module.exports = router;
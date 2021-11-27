const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/category-controller');

// ejemplo
router.get('/',categoryController.list)







module.exports = router;
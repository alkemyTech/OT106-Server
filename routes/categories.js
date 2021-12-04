const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/category-controller');

const createValidation = require('../validations/category/create-validation')
const validator = require('../functions/validator')

// /categories
router.get('/',categoryController.list)
router.get('/:id',categoryController.detail)

router.post('/', createValidation,  validator,categoryController.create)








module.exports = router;
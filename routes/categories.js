const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/category-controller');
const createValidation = require('../validations/category/create-validation')
const validator = require('../functions/validator')
const adminPermission = require('../middleware/admin-authentication')


// /categories

router.get('/', adminPermission,categoryController.list)
router.get('/:id', adminPermission,categoryController.detail)

router.post('/', adminPermission, createValidation, validator, categoryController.create)







module.exports = router;
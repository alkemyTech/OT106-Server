const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/category-controller');
const categoryValidation = require('../validations/category-validation')
const validator = require('../functions/validator')
const adminPermission = require('../middleware/admin-authentication')
const pagination = require('../middleware/pagination');

// /categories

router.get('/',adminPermission,pagination.validate, categoryController.list)
router.get('/:id', adminPermission, categoryController.detail)

router.post('/', adminPermission, categoryValidation, validator, categoryController.create)
router.put('/:id', adminPermission, categoryValidation,validator,categoryController.update)

router.delete('/:id', adminPermission, categoryController.remove)







module.exports = router;
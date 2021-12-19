const { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../combinations/categories-combinations');

const router = require('express').Router();

// /categories

router.get('/', getAllCategories);
router.get('/:id', getCategory);

router.post('/', createCategory);
router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);


module.exports = router;

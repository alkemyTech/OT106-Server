const { createNew, getNews, getNew, updateNew, deleteNew } = require('../combinations/news-combinations');
const router = require('express').Router();

router.route('/')
    .post(createNew)
    .get(getNews);

router.route('/:id')
    .get(getNew)
    .delete(deleteNew)
    .patch(updateNew);

module.exports = router;

const newsController = require("../controllers/news-controller");
const adminAuthentication = require("../middleware/admin-authentication");
const upload = require("../middleware/upload");
const { validateCreate } = require("../validations/news-validations");

const createNew = [
  adminAuthentication,
  upload,
  validateCreate,
  newsController.addNews
];

const getNews = newsController.getAllNews;

const getNew = newsController.getNews;

const deleteNew = [
  adminAuthentication,
  newsController.deleteNews
];

const updateNew = [
  adminAuthentication,
  upload,
  newsController.modifyNews
];

module.exports = { getNews, createNew, getNew, deleteNew, updateNew };

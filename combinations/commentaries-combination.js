const commentariesController = require('../controllers/commentary-controller');
const { validateCreate } = require('../validations/commentary-validations');
const upload = require('../middleware/upload');
const adminAuthentication = require('../middleware/admin-authentication');
const authentication = require('../middleware/authentication');
const ownerAuthentication = require('../middleware/owner-authentication');

const addCommentary = [
  authentication,
  upload,
  validateCreate,
  commentariesController.addCommentary
];

const getAllCommentaries = [
  adminAuthentication,
  commentariesController.getAllCommentaries
];

const getCommentary = [
  authentication,
  commentariesController.getCommentary
];

const deleteCommentary = [
  ownerAuthentication,
  commentariesController.deleteCommentary
];

const updateCommentary = [
  ownerAuthentication,
  upload,
  commentariesController.modifyCommentary
];

module.exports = {
  addCommentary,
  getAllCommentaries,
  getCommentary,
  deleteCommentary,
  updateCommentary
};

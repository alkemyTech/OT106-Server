const membersController = require('../controllers/members-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const pagination = require('../middleware/pagination');
const { memberIsValid } = require('../validations/members-validators');

const createMember = [
  adminAuthentication,
  memberIsValid,
  membersController.create
];

const getAllMembers = [
  pagination.validate,
  membersController.getMembersAll
];

const updateMember = [
  adminAuthentication,
  membersController.updateMember
];

const deleteMember = [
  adminAuthentication,
  membersController.deleteMember
];

module.exports = {
  createMember,
  getAllMembers,
  updateMember,
  deleteMember
};

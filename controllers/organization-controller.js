const {
  createOrganization,
  findAllOrganizations,
  findOrganizationById,
  updateOrganization,
  destroyOrganization
} = require('../services/organization-service');
const catchAsync = require('../functions/catchAsync');
const throwError = require('../functions/throw-error');

const status = require('../constants/httpStatus');
const { NOT_FOUND } = require('../constants/message');
const message = require('../constants/organization-constant');

module.exports = {
  listAll: catchAsync(async (req, res) => {
    const result = await findAllOrganizations();
    return res.status(status.OK).json({
      message: message.ORGS_FOUND,
      body: result
    });
  }),

  findById: catchAsync(async (req, res) => {
    const id = req.params.id;
    if (!id) { return throwError(status.NOT_FOUND, NOT_FOUND); }
    const result = await findOrganizationById(id);
    return res.status(status.OK).json({
      message: message.ORG_FOUND,
      body: result
    });
  }),

  create: catchAsync(async (req, res) => {
    const body = req.body;
    const result = await createOrganization(body);
    return res.status(status.CREATED).json({
      message: message.CREATED_ORG,
      body: result
    });
  }),

  update: catchAsync(async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if (!id) { return throwError(status.NOT_FOUND, NOT_FOUND); }

    const result = await updateOrganization(body, id);
    return res.status(status.OK).json({
      message: message.UPDATED_ORG,
      body: result
    });
  }),

  delete: catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await destroyOrganization(id);
    return res.status(status.OK).json({
      message: message.DELETED_ORG,
      body: result
    });
  }),
};

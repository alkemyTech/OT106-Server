const {
  createOrganization,
  findAllOrganizations,
  findOrganizationById,
  updateOrganization,
  destroyOrganization
} = require('../services/organization-service');

const status = require('../constants/httpStatus');
const message = require('../constants/message');

module.exports = {
  listAll: async (req, res, next) => {
    try {
      const result = await findAllOrganizations();

      return res.status(status.OK).send(result);
    } catch (err) {
      // HandlerError shows de status and message error (if env=dev shows more details )
      err.status = err.status || status.INTERNAL_SERVER_ERROR;
      err.message = err.message || message.INTERNAL_SERVER_ERROR;
      next(err);
    }
  },

  findById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await findOrganizationById(id);

      return res.status(status.OK).send(result);
    } catch (err) {
      err.status = err.status || status.INTERNAL_SERVER_ERROR;
      err.message = err.message || message.INTERNAL_SERVER_ERROR;
      next(err);
    }
  },

  create: async (req, res, next) => {
    const body = req.body;
    try {
      const result = await createOrganization(body);

      return res.status(status.CREATED).send(result);
    } catch (err) {
      err.status = status.INTERNAL_SERVER_ERROR;
      err.message = message.INTERNAL_SERVER_ERROR;
      next(err);
    }
  },

  update: async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    try {
      const result = await updateOrganization(body, id);

      return res.status(status.OK).send(result);
    } catch (err) {
      err.status = status.INTERNAL_SERVER_ERROR;
      err.message = message.INTERNAL_SERVER_ERROR;
      next(err);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await destroyOrganization(id);
      return res.status(status.OK).send(result);
    } catch (err) {
      err.status = status.INTERNAL_SERVER_ERROR;
      err.message = message.INTERNAL_SERVER_ERROR;
      next(err);
    }
  },
};

const organizationRepository = require('../repositories/organization-repository');
const status = require('../constants/httpStatus');
const { ORG_NOT_FOUND } = require('../constants/organization-constant');

// validations for BODY and ID belongs to a middleware
async function createOrganization(body) {
  const newOrganization = await organizationRepository.create(body);
  return newOrganization;
}

async function findOrganizationById(id) {
  const organization = await organizationRepository.findOne(id);
  if (!organization) {
    const error = new Error();
    error.message = ORG_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }
  return organization;
}


async function findAllOrganizations() {
  const organizations = await organizationRepository.findAll();
  return organizations;
}

async function updateOrganization(body, id) {
  const organization = await findOrganizationById(id);
  if (!organization) {
    const error = new Error();
    error.message = ORG_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }

  const activity = await organizationRepository.update(body, id);
  return activity;
}


async function destroyOrganization(id) {
  const organization = await organizationRepository.findeOne(id);
  if (!organization) {
    const error = new Error();
    error.message = ORG_NOT_FOUND;
    error.status = status.NOT_FOUND;
    throw error;
  }
  const destroyed = await organizationRepository.destroy(id);
  return destroyed;
}


module.exports = {
  createOrganization,
  findOrganizationById,
  findAllOrganizations,
  updateOrganization,
  destroyOrganization
};

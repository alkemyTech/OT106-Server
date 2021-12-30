const organizationRepository = require('../repositories/organization-repository');
const status = require('../constants/httpStatus');
const { ORG_NOT_FOUND } = require('../constants/organization-constant');
const throwError = require('../functions/throw-error');


// validations for BODY and ID belongs to a middleware
async function createOrganization(body) {
  const newOrganization = await organizationRepository.create(body);
  return newOrganization;
}

async function findOrganizationById(id) {
  const organization = await organizationRepository.findOne(id);
  if (!organization) {
    return throwError(status.NOT_FOUND, ORG_NOT_FOUND);
  }
  return organization;
}


async function findAllOrganizations() {
  const organizations = await organizationRepository.findAll();
  return organizations;
}

async function updateOrganization(body, id) {
  await findOrganizationById(id);

  const updatedOrganization = await organizationRepository.update(body, id);
  return updatedOrganization;
}


async function destroyOrganization(id) {
  await findOrganizationById(id);

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

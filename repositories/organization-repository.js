const db = require('../models');

const organization = db.Organization;

// CONVENTION
// Repository functions have de same name of your equivalent operation in Sequelize

// body and id already verified with a middleware

// create a new organization
async function create(body) {
  const createdOrganization = await organization.create(body);
  return createdOrganization;
}


async function findOne(id) {
  const findedOrganization = await organization.findOne({ where: { id } });
  return findedOrganization;
}

async function findAll() {
  const allOrganizations = await organization.findAll({ attributes: ['name', 'image', 'phone', 'address'] });

  return allOrganizations;
}
async function update(body, id) {
  const updatedOrganization = await organization.update({ body }, { where: { id } });

  return updatedOrganization;
}


async function destroy(id) {
    // returns number of raws deleted
  const destroyedOrganization = await organization.destroy({ where: { id } });
  return destroyedOrganization;
}


module.exports = {
  create,
  findOne,
  findAll,
  update,
  destroy
};

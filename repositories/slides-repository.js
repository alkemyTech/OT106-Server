const db = require('../models');

const slide = db.Slide;

// CONVENTION
// Repository functions have de same name of your equivalent operation in Sequelize

// body and id already verified with a middleware

// create a new slide
async function create(body) {
  const createdSlide = await slide.create(body);
  return createdSlide;
}


async function findOne(id) {
  const findedSlide = await slide.findOne({ where: { id } });
  return findedSlide;
}

async function findAll() {
  const allSlides = await slide.findAll({ attributes: ['imgUrl', 'order'] });

  return allSlides;
}

async function findByOrgId(orgId) {
  const slides = await slide.findAll({ where: { organizationId: orgId } });

  return slides;
}

async function update(body, id, transactionT) {
  const updatedSlide = await slide.update(body, { where: { id }, transaction: transactionT });

  return updatedSlide;
}

async function bulkUpdate(slides, transactionT) {
  const updates = await slide.bulkCreate(slides, { updateOnDuplicate: ['order'], transaction: transactionT });
  return updates;
}


async function destroy(id) {
    // returns number of raws deleted
  const destroyedSlide = await slide.destroy({ where: { id } });
  return destroyedSlide;
}


module.exports = {
  create,
  findOne,
  findByOrgId,
  findAll,
  update,
  bulkUpdate,
  destroy
};

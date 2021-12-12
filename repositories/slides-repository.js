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
async function update(body, id) {
  const updatedSlide = await slide.update(body, { where: { id } });

  return updatedSlide;
}


async function destroy(id) {
    // returns number of raws deleted
  const destroyedSlide = await slide.destroy({ where: { id } });
  return destroyedSlide;
}


module.exports = {
  create,
  findOne,
  findAll,
  update,
  destroy
};

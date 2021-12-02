const db = require("../models/index");
const pick = require("../functions/pick");

const createTestimonial = async (req) => {
  let { name, image, content } = req.body;

  const create = await db.sequelize.transaction(async (t) => {
    const [testimonial, wasCreated] = await db.Testimonial.findOrCreate({
      where: { name },
      defaults: {
        name,
        image,
        content,
      },
      transaction: t,
    });

    if (!wasCreated) return false;
    return testimonial;
  });

  return create;
};

const getTestimonials = async () => {
  const list = await db.Testimonial.findAll({
    paranoid: false,
  });
  return list;
};

const getTestimonialById = async (id) => {
  const detail = await db.Testimonial.findOne({
    where: { id },
    paranoid: false,
  });
  return detail;
};

const updateTestimonial = async (req) => {
  let { id } = req.params;
  let { body } = req;
  let updateBodyObject = pick(body, Object.keys(body));

  const update = await db.sequelize.transaction(async (t) => {
    const testimonial = await db.Testimonial.update(updateBodyObject, {
      where: { id },
      transaction: t,
    });
    return testimonial;
  });

  return update;
};

const deleteTestimonial = async (id) => {
  const remove = await db.sequelize.transaction(async (t) => {
    const deletedTestimonial = await db.Testimonial.destroy({
      where: { id },
      transaction: t,
    });
    return deletedTestimonial;
  });

  return remove;
};

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

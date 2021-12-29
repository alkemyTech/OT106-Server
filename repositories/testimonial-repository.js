const db = require("../models/index");
const pick = require("../functions/pick");

const createTestimonial = async (body) => {
  let { name, image, content } = body;

  const create = await db.sequelize.transaction(async (t) => {
    const testimonial = await db.Testimonial.create(
      {
        name,
        image,
        content,
      },
      {
        transaction: t,
      }
    );
    return testimonial;
  });

  return create;
};

const getTestimonials = async (page) => {
  //Page size limit
  const limit = 10;

  //Find and count all testimonials
  const list = await db.Testimonial.findAndCountAll({
    limit,
    offset: page * limit,
    paranoid: false,
  });

  //Return object to service
  const { rows } = list;
  const totalPages = Math.ceil(list.count / limit);

  const result = {
    totalPages,
    rows,
  };

  return result;
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

  await db.sequelize.transaction(async (t) => {
    const testimonial = await db.Testimonial.update(updateBodyObject, {
      where: { id },
      transaction: t,
    });
    return testimonial;
  });

  const update = await db.Testimonial.findOne({
    where: { id },
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

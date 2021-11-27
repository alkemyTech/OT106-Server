//TODO: Create services for each function

//GET all testimonials
const list = async (req, res) => {
  try {
    let testimonials;
    return res.json({
      body: testimonials,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

//GET one testimonial by id
const find = async (req, res) => {
  try {
    let testimonial;
    return res.json({
      body: testimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

//POST a testimonial
const create = async (req, res) => {
  try {
    let createTestimonial;
    return res.json({
      body: createTestimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

//PATCH a testimonial by id
const update = async (req, res) => {
  try {
    let updateTestimonial;
    return res.json({
      body: updateTestimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

//DELETE a testimonial by id
const remove = async (req, res) => {
  try {
    let deleteTestimonial;
    return res.json({
      body: deleteTestimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

module.exports = {
  list,
  find,
  create,
  update,
  delete: remove,
};

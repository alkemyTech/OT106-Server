"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Testimonials", [
      {
        name: "Testimonial 1",
        image:
          "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/iconic-testimonials-social-media-post-design-template-05ca540b66bf63f9dbf9888c2c42b9df_screen.jpg",
        content: "This is a testimonial content example for Testimonial 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Testimonial 2",
        image:
          "https://image.shutterstock.com/image-vector/vector-testimonial-template-star-rating-260nw-1609269985.jpg",
        content: "This is a testimonial content example for Testimonial 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Testimonials", null, {});
  },
};

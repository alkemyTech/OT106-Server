"use strict";

let testimonials = [];

for(let i = 1; i < 45; i++) {
  testimonials.push({
    name: `Testimonial ${i}`,
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/iconic-testimonials-social-media-post-design-template-05ca540b66bf63f9dbf9888c2c42b9df_screen.jpg",
    content: `Mock data for testimonial ${i}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Testimonials', testimonials);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Testimonials", null, {});
  },
};
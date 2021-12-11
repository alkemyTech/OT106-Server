const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial-controller");
const adminAuthentication = require("../middleware/admin-authentication");
const {
  validateCreateTestimonial,
  validateUpdateTestimonial,
} = require("../middleware/testimonial-middleware");

//GET
router.get("/:id", testimonialController.find);
router.get("/", testimonialController.list);

//POST
router.post(
  "/",
  adminAuthentication,
  validateCreateTestimonial,
  testimonialController.create
);

//PATCH
router.patch(
  "/:id",
  adminAuthentication,
  validateUpdateTestimonial,
  testimonialController.update
);

//DELETE
router.delete("/:id", adminAuthentication, testimonialController.delete);

module.exports = router;

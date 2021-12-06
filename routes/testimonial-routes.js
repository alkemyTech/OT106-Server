const express = require('express');
const router = express.Router()
const testimonialController = require("../controllers/testimonial-controller");
const {validateCreateTestimonial, validateUpdateTestimonial} = require("../middleware/testimonial-middleware")

//GET
router.get("/:id", testimonialController.find)
router.get("/", testimonialController.list)

//POST
router.post("/", validateCreateTestimonial, testimonialController.create)

//PATCH
router.patch("/:id", validateUpdateTestimonial, testimonialController.update)

//DELETE
router.delete("/:id", testimonialController.delete)

module.exports = router;
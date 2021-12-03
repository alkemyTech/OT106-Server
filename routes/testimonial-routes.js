const express = require('express');
const router = express.Router()
const testimonialController = require("../controllers/testimonial-controller");

//GET
router.get("/:id", testimonialController.find)
router.get("/", testimonialController.list)

//POST
router.post("/", testimonialController.create)

//PATCH
router.patch("/:id", testimonialController.update)

//DELETE
router.delete("/:id", testimonialController.delete)

module.exports = router;
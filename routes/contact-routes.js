const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact-controller");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../middleware/contact-middleware");
const adminAuthentication = require("../middleware/admin-authentication");

//GET
router.get("/:id", adminAuthentication, contactController.find);
router.get("/", adminAuthentication, contactController.list);

//POST
router.post(
  "/",
  adminAuthentication,
  validateCreateContact,
  contactController.create
);

//PATCH
router.patch(
  "/:id",
  adminAuthentication,
  validateUpdateContact,
  contactController.update
);

//DELETE
router.delete("/:id", adminAuthentication, contactController.delete);

module.exports = router;

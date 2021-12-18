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

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: The contacts managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique key that identifies a contact
 *         name:
 *           type: string
 *           description: The contact name
 *         phone:
 *           type: integer
 *           description: the contact's phone
 *         message:
 *           type: string
 *           description: The message of the contact
 *         createdAt:
 *           description: Date of the contact creation
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           description: Date of the last modification of the contact
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           description: Date of contact deletion
 *           type: string
 *           format: date-time
 *           nulleable: true
 *   responses:
 *     InternalServerError:
 *       description: An unexpected error happened.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 description: An error message
 *                 type: string
 *             example:
 *               status: 500
 *               message: INTERNAL SERVER ERROR
 *     ContactNotFound:
 *       description: The contact wasn't found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 description: A message about the missing data
 *                 type: string
 *             example:
 *               status: 404
 *               message: Couldn't find any contact(s).
 */

/**
 * @swagger
 * /contacts/:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Gets all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: the response message
 *                 body:
 *                   type: array
 *                   description: the response body
 *                   $ref: #/components/schemas/Testimonial
 *               example:
 *                 message: Successfully fetched contact(s).
 *                 body:
 *                     -  id: 1
 *                        name: Contact 1
 *                        phone: 541100000000
 *                        message: Contact message 1
 *                        email: contact1@gmail.com
 *                        createdAt: 2021-12-17T23:15:15.453Z
 *                        updatedAt: 2021-12-18T23:15:15.453Z
 *                        deletedAt: 2021-12-19T23:15:15.453Z
 *                     -  id: 2
 *                        name: Contact 2
 *                        phone: 541100000001
 *                        email: contact2@gmail.com
 *                        message: Contact message 2
 *                        createdAt: 2021-12-18T23:15:15.453Z
 *                        updatedAt: 2021-12-19T23:15:15.453Z
 *                        deletedAt: 2021-12-20T23:15:15.453Z
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Gets a contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id for a single contact
 *     responses:
 *       200:
 *         description: The detail of a contact by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *             example:
 *               id: 1
 *               name: Contact 1
 *               phone: 541100000000
 *               message: Contact message 1
 *               email: contact1@gmail.com
 *               createdAt: 2021-12-17T23:15:15.453Z
 *               updatedAt: 2021-12-18T23:15:15.453Z
 *               deletedAt: 2021-12-19T23:15:15.453Z
 *       404:
 *         $ref: '#/components/responses/ContactNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Creates a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: the contact name
 *               phone:
 *                 type: integer
 *                 description: the contact's phone
 *               email:
 *                 type: string
 *                 description: the contact's email
 *               message:
 *                 type: string
 *                 description: the message of the contact
 *             example:
 *               name: Contact 1
 *               phone: 54110000001
 *               email: contact1@gmail.com
 *               message: the message of the contact
 *     responses:
 *       200:
 *         description: The contact was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 name:
 *                   type: string
 *                   description: the contact name
 *                 phone:
 *                   type: integer
 *                   description: the contact's phone
 *                 email:
 *                   type: string
 *                   description: the contact's email
 *                 message:
 *                   type: string
 *                   description: the message of the contact
 *               example:
 *                 message: Successfully created a contact.
 *                 body:
 *                   id: 1
 *                   name: Contact 1
 *                   phone: 54110000001
 *                   email: contact1@gmail.com
 *                   content: Content for contact 1
 *                   createdAt: 2021-12-18T23:15:15.453Z
 *                   updatedAt: 2021-12-19T23:15:15.453Z
 *                   deletedAt: 2021-12-20T23:15:15.453Z
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /contacts/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Updates a contact by id
 *    tags: [Contacts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: the contact id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                type: string
 *                description: the contact name
 *              phone:
 *                type: integer
 *                description: the contact's phone
 *              email:
 *                type: string
 *                description: the contact's email
 *              message:
 *                 type: string
 *                 description: the message of the contact
 *            example:
 *                name: Updated Contact 1
 *    responses:
 *      200:
 *        description: The contact was updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  description: A contact was updated
 *                body:
 *                  type: object
 *                  description: the response body
 *                  properties:
 *                    $ref: '#/components/schemas/Contact'
 *              example:
 *                message: Successfully updated contact with id of 1.
 *                body:
 *                  id: 1
 *                  name: Updated Contact 1
 *                  phone: 54110000001
 *                  email: contact1@gmail.com
 *                  content: Content for contact 1
 *                  createdAt: 2021-12-18T23:15:15.453Z
 *                  updatedAt: 2021-12-19T23:15:15.453Z
 *                  deletedAt: 2021-12-20T23:15:15.453Z*
 *      404:
 *        $ref: '#/components/responses/ContactNotFound'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a contact by id
 *     patch:
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The contact id
 *
 *     responses:
 *       200:
 *         description: The contact was deleted
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Successfully deleted contact with id of 1
 *       404:
 *         $ref: '#/components/responses/ContactNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

module.exports = router;

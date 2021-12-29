const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial-controller");
const adminAuthentication = require("../middleware/admin-authentication");
const {
  validateCreateTestimonial,
  validateUpdateTestimonial,
} = require("../middleware/testimonial-middleware");
const upload = require("../middleware/upload");

//GET
router.get("/:id", testimonialController.find);
router.get("/", testimonialController.list);

//POST
router.post(
  "/",
  adminAuthentication,
  upload,
  validateCreateTestimonial,
  testimonialController.create
);

//PATCH
router.patch(
  "/:id",
  adminAuthentication,
  upload,
  validateUpdateTestimonial,
  testimonialController.update
);

//DELETE
router.delete("/:id", adminAuthentication, testimonialController.delete);

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: The testimonials managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique key that identifies a testimonial
 *         name:
 *           type: string
 *           description: The testimonial name
 *         content:
 *           type: string
 *           description: The content of the testimonial
 *         image:
 *           type: string
 *           description: The testimonial image
 *         createdAt:
 *           description: Date of the testimonial creation
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           description: Date of the last modification of the testimonial
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           description: Date of testimonial deletion
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
 *     TestimonialNotFound:
 *       description: The testimonial wasn't found
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
 *               message: Couldn't find any testimonial(s).
 */

/**
 * @swagger
 * /testimonials/:
 *   get:
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: The page in the list of testimonials
 *     summary: Gets all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: A list of all testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: the response message
 *                 body:
 *                   type: object
 *                   description: the response body
 *                   properties:
 *                     totalPages:
 *                       type: integer
 *                       description: the number of total pages for the testimonials list
 *                     rows:
 *                       $ref: #/components/schemas/Testimonial
 *                     previousPage:
 *                       type: integer
 *                       description: the number of the previous page
 *                     nextPage:
 *                       type: integer
 *                       description: the number of the next page
 *               example:
 *                 message: Successfully fetched testimonial(s).
 *                 body:
 *                   totalPages: 10
 *                   rows:
 *                     -  id: 1
 *                        name: Testimonial 1
 *                        image: image.png
 *                        content: Testimonial content 1
 *                        createdAt: 2021-12-17T23:15:15.453Z
 *                        updatedAt: 2021-12-18T23:15:15.453Z
 *                        deletedAt: 2021-12-19T23:15:15.453Z
 *                     -  id: 2
 *                        name: Testimonial 2
 *                        image: image2.png
 *                        content: Testimonial content 2
 *                        createdAt: 2021-12-18T23:15:15.453Z
 *                        updatedAt: 2021-12-19T23:15:15.453Z
 *                        deletedAt: 2021-12-20T23:15:15.453Z
 *                   previousPage: http://localhost:3000/testimonials/?page=0
 *                   nextPage: http://localhost:3000/testimonials/?page=2
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Gets a testimonial by id
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id for a single testimonial
 *     responses:
 *       200:
 *         description: The detail of a testimonial by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       404:
 *         $ref: '#/components/responses/TestimonialNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /testimonials:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Creates a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: the testimonial name
 *               content:
 *                 type: string
 *                 description: the testimonial content
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: the testimonial image
 *     responses:
 *       200:
 *         description: The testimonial was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 name:
 *                   type: string
 *                   description: the testimonial name
 *                 image:
 *                   type: string
 *                   description: the testimonial image
 *                 content:
 *                   type: string
 *                   description: the testimonial content
 *               example:
 *                 message: Successfully created a testimonial.
 *                 body:
 *                   id: 1
 *                   name: Testimonial 1
 *                   image: image.png
 *                   content: Content for testimonial 1
 *                   createdAt: 2021-12-18T23:15:15.453Z
 *                   updatedAt: 2021-12-19T23:15:15.453Z
 *                   deletedAt: 2021-12-20T23:15:15.453Z
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 */

/**
 * @swagger
 * /testimonials/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Updates a testimonial by id
 *    tags: [Testimonials]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: the testimonial id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: the testimonial name
 *              content:
 *                type: string
 *                description: the testimonial content
 *              image:
 *                type: string
 *                format: binary
 *                description: the testimonial image
 *            example:
 *                name: Updated Testimonial 1
 *    responses:
 *      200:
 *        description: The testimonial was updated
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: the testimonial name
 *                image:
 *                  type: string
 *                  description: the testimonial image
 *                content:
 *                  type: string
 *                  description: the testimonial content
 *              example:
 *                message: Successfully updated testimonial with id of 1.
 *                body:
 *                  id: 1
 *                  name: Updated Testimonial 1
 *                  image: image.png
 *                  content: Content for testimonial 1
 *                  createdAt: 2021-12-18T23:15:15.453Z
 *                  updatedAt: 2021-12-19T23:15:15.453Z
 *                  deletedAt: 2021-12-20T23:15:15.453Z*
 *      404:
 *        $ref: '#/components/responses/TestimonialNotFound'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a testimonial by id
 *     patch:
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The testimonial id
 *
 *     responses:
 *       200:
 *         description: The testimonial was deleted
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Successfully deleted testimonial with id of 1
 *       404:
 *         $ref: '#/components/responses/TestimonialNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

module.exports = router;

require('dotenv').config();
const express = require('express');

const router = express.Router();
const activitiesCombination = require('../combinations/activities-combination');

router.route('/')
    .post(activitiesCombination.createActivity)
    .get(activitiesCombination.getActivities);


router.route('/:id')
    .get(activitiesCombination.getActivity)
    .delete(activitiesCombination.deleteActivity)
    .patch(activitiesCombination.editActivity);

router.route('/image/:id')
    .get(activitiesCombination.getActivityimage);


 /**
  * @swagger
  * tags:
  *   name: Activities
  *   description: The activities managing API
  */


/**
 * @swagger
 * components:
 *   schemas:
 *     Activities:
 *       type: object
 *       required:
 *         - name
 *         - content
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of activity
 *         name:
 *           type: string
 *           description: The activity name
 *         content:
 *           type: string
 *           description: The activity content
 *         image:
 *           type: string
 *           format: binary
 *           description: File activity
 *       example:
 *         name: reparto de juguetes
 *         image: juguetes.png
 *         content: algo que hacer con los
 */


/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Returns all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: The list of the activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activities'
 */

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Get the activity by id
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The activity id
 *     responses:
 *       200:
 *         description: The activity description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activities'
 *       404:
 *         description: The activity was not found
 */

/**
 * @swagger
 * /activities:
 *   post:
 *     security:
 *          - bearerAuth: []
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *           multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/Activities'
 *     responses:
 *       200:
 *         description: The activity was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activities'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /activities/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: update activity
 *    tags: [Activities]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        description: The activity id
 *    requestBody:
 *      require: false
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type:
 *              object
 *            properties:
 *              name:
 *                  type: string
 *                  description: The activity name
 *              content:
 *                  type: string
 *                  description: The activity content
 *              image:
 *                  type: string
 *                  format: binary
 *                  description: File activity
 *    responses:
 *      200:
 *        description: The activity was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Activities'
 *      404:
 *        description: The activity was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Remove the activity by id
 *     patch:
 *     security:
 *          - bearerAuth: []
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *
 *     responses:
 *       200:
 *         description: The activity was deleted
 *       404:
 *         description: The activity was not found
 */
module.exports = router;

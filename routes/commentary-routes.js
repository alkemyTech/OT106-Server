require('dotenv').config();
const express = require('express');

const router = express.Router();
const { addCommentary, deleteCommentary, modifyCommentary, getCommentary, getAllCommentaries } = require('../controllers/commentary-controller');
const { validateCreate } = require('../validations/commentary-validations');
const upload = require('../middleware/upload');
const adminAuthentication = require('../middleware/admin-authentication');
const authentication = require('../middleware/authentication');

router.route('/')
    .post(authentication, upload, validateCreate, addCommentary)
    .get(adminAuthentication, getAllCommentaries);

router.route('/:id')
    .get(authentication, getCommentary)
    .delete(authentication, deleteCommentary)
    .patch(authentication, upload, modifyCommentary);

 /**
  * @swagger
  * tags:
  *   name: Commentary
  *   description: The comentaries managing API
  */

 /**
 * @swagger
 * components:
 *   schemas:
 *     Commentary:
 *       type: object
 *       required:
 *         - NewsId
 *         - UserId
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of commentary
 *         NewsId:
 *           type: integer
 *           description: The id relationship with news
 *         UserId:
 *           type: integer
 *           description: The id relationship with user
 *         body:
 *           type: string
 *           description: the body of commentary
 *       example:
 *         NewsId: 3
 *         UserId: 6
 *         body: this a commentary
 */
/**
 * @swagger
 * /commentary:
 *   get:
 *     summary: Returns all commentaries
 *     security:
 *          - bearerAuth: []
 *     tags: [Commentary]
 *     responses:
 *       200:
 *         description: The list of the commentaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commentary'
 */
/**
 * @swagger
 * /commentary/{id}:
 *   get:
 *     summary: Get the commentary by id
 *     tags: [Commentary]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The commentary by id
 *     responses:
 *       200:
 *         description: The commentary description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commentary'
 *       404:
 *         description: The activity was not found
 */
/**
 * @swagger
 * /commentary:
 *   post:
 *     summary: Create a new comentary
 *     tags: [Commentary]
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commentary'
 *     responses:
 *       200:
 *         description: The commentary was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commentary'
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * /commentary/{id}:
 *  patch:
 *    summary: update activity
 *    tags: [Commentary]
 *     security:
 *          - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The Commentary id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Commentary'
 *    responses:
 *      200:
 *        description: The activity was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Commentary'
 *      404:
 *        description: The activity was not found
 *      500:
 *        description: Some error happened
 */
/**
 * @swagger
 * /commentary/{id}:
 *   delete:
 *     summary: Remove the commentary by id
 *     patch:
 *     security:
 *          - bearerAuth: []
 *     tags: [Commentary]
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

require('dotenv').config();
const express = require('express');

const router = express.Router();
const { addNews, deleteNews, modifyNews, getNews, getAllNews } = require('../controllers/news-controller');
const { validateCreate } = require('../validations/news-validations');
const upload = require('../middleware/upload');
const adminAuthentication = require('../middleware/admin-authentication');

router.route('/')
    .post(adminAuthentication, upload, validateCreate, addNews)
    .get(adminAuthentication, getAllNews);// /?page=NUMBER

router.route('/:id')
    .get(adminAuthentication, getNews)
    .delete(adminAuthentication, deleteNews)
    .patch(adminAuthentication, upload, modifyNews);


/**
  * @swagger
  * tags:
  *   name: News
  *   description: News API
  */


/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - name
 *         - content
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated news id
 *         name:
 *           type: string
 *           description: News name
 *         content:
 *           type: string
 *           description: News content
 *         image:
 *           type: string
 *           format: binary
 *           description: File News
 *       example:
 *         name: test title
 *         image: image.png
 *         content: test content
 */


/**
 * @swagger
 * /news:
 *   get:
 *     summary: Returns all news
 *     tags: [News]
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: The page in the list of news
 *     security:
 *          - bearerAuth: []
 *     responses:
 *       200:
 *         description: The news list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get the news by id
 *     tags: [News]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The news id
 *     responses:
 *       200:
 *         description: The news description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: The news was not found
 */

/**
 * @swagger
 * /news:
 *   post:
 *     security:
 *          - bearerAuth: []
 *     summary: Create a new news
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *           multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: The news was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /news/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: update news
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: integer
 *        description: The news id
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
 *                  description: The news name
 *              content:
 *                  type: string
 *                  description: The news content
 *              image:
 *                  type: string
 *                  format: binary
 *                  description: File news
 *    responses:
 *      200:
 *        description: The news was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/News'
 *      404:
 *        description: The news was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Remove the news by id
 *     patch:
 *     tags: [News]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news id
 *
 *     responses:
 *       200:
 *         description: The news was deleted
 *       404:
 *         description: The news was not found
 */


module.exports = router;

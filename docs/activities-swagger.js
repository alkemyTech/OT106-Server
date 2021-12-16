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
 *           description: the activity image
 *       example:
 *         name: reparto de juguetes
 *         image: juguetes.png
 *         content: algo que hacer con los
 */

 /**
  * @swagger
  * tags:
  *   name: Activities
  *   description: The activities managing API
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
 *     summary: Get the book by id
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
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activities'
 *       404:
 *         description: The book was not found
 */
/**
 * @swagger
 * /activities:
 *   post:
 *     security:
 *          - bearerAuth: []
 *     summary: Create a new activity
 *     tags: [activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activities'
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
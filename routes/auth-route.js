const router = require('express').Router();
const { UserController } = require('../controllers');
const { validateCreateUser, validateLoginUser } = require('../validations/user-validation');
const authentication = require('../middleware/authentication');

router
  .post('/register', validateCreateUser, UserController.createUser)
  .get('/me', authentication, UserController.findUserByTokenId)
  .post('/login', validateLoginUser, UserController.loginUser);

/**
 * @swagger
 * tags:
 *   name: Authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           description: Key that identifies unequivocally the user
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         photo:
 *           type: string
 *           nulleable: true
 *         roleId:
 *           description: Key that identifies the user's role
 *           type: integer
 *         token:
 *           description: A token to access restricted endpoints
 *           type: string
 *         createdAt:
 *           description: Date of the user registration
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           description: Date of the last modification
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           description: Date of account disablement
 *           type: string
 *           format: date-time
 *           nulleable: true
 *   responses:
 *     InternalServerError:
 *       description: An unexpected error happened
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 description: HTTP status
 *                 type: number
 *               message:
 *                 description: An error message
 *                 type: string
 *             example:
 *               status: 500
 *               message: INTERNAL SERVER ERROR
 *     UserNotFound:
 *       description: The user wasn't found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 description: HTTP status
 *                 type: number
 *               message:
 *                 description: A message about the request sent
 *                 type: string
 *             example:
 *               status: 404
 *               message: The user wasn't found
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User's information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *               lastName:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 required: true
 *               photo:
 *                 type: string
 *                 required: false
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@test.com
 *               password: a1b2c3d4
 *     responses:
 *       201:
 *         description: The user has been registered
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *                 body:
 *                   description: The user's information
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *               example:
 *                 status: 201
 *                 message: The user has been registered
 *                 body:
 *                   id: 1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: john.doe@test.com
 *                   photo: null
 *                   roleId: 2
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                   createdAt: 2000-01-01T00:00:00.000Z
 *                   updatedAt: 2000-01-01T00:00:00.000Z
 *                   deletedAt: null
 *       400:
 *         description: The request didn't pass the validations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *                 body:
 *                   description: Specific error message
 *                   type: array
 *                   items:
 *                     type: string
 *               example:
 *                 status: 400
 *                 message: There are some validation problems
 *                 body:
 *                   - The firstName is invalid
 *                   - The email is already registered
 *                   - The password must be at least 8 characters long
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Personal information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *                 body:
 *                   description: The user's information
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *               example:
 *                 status: 200
 *                 message: My personal information
 *                 body:
 *                   id: 1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: john.doe@test.com
 *                   photo: null
 *                   roleId: 2
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                   createdAt: 2000-01-01T00:00:00.000Z
 *                   updatedAt: 2000-01-01T00:00:00.000Z
 *                   deletedAt: null
 *       403:
 *         description: The request didn't have an access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number 
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *               example:
 *                 status: 403
 *                 message: An access token is needed
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Sign in
 *     tags: [Authentication]
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *             example:
 *               email: john.doe@test.com
 *               password: a1b2c3d4
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *                 body:
 *                   description: The user's information
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               status: 200
 *               message: Successful login
 *               body:
 *                 id: 1
 *                 firstName: John
 *                 lastName: Doe
 *                 email: john.doe@test.com
 *                 photo: null
 *                 roleId: 2
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 createdAt: 2000-01-01T00:00:00.000Z
 *                 updatedAt: 2000-01-01T00:00:00.000Z
 *                 deletedAt: null
 *       400:
 *         description: The request didn't pass the validations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *                 body:
 *                   description: Specific error messages
 *                   type: array
 *               example:
 *                 status: 400
 *                 message: There are some validation problems
 *                 body:
 *                   - The email is invalid
 *                   - The password is invalid
 *       401:
 *         description: The password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   description: HTTP status
 *                   type: number
 *                 message:
 *                   description: A message about the request sent
 *                   type: string
 *                 body:
 *                   type: object
 *               example:
 *                 status: 401
 *                 message: The password is incorrect
 *                 body:
 *                   ok: false
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

module.exports = router;

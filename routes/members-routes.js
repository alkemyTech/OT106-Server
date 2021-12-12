const express = require('express');
const memberValidate = require('../validations/members-validators');
const pagination = require('../middleware/pagination');
const router = express.Router();

const { create, getMembersAll, updateMember, deleteMember } = require('../controllers/members-controller');

/**
 *@swagger
 *{
 *   "components": {
 *     "schemas": {
 *       "Member": {
 *         "type": "object",
 *         "properties": {
 *           "name": {
 *             "type": "string",
 *             "description": "Name of a member"
 *           },
 *           "facebookUrl": {
 *             "type": "string",
 *             "description": "Facebook Url"
 *           },
 *           "instagramUrl": {
 *             "type": "string",
 *             "description": "Instagram Url"
 *           },
 *           "linkedinUrl": {
 *             "type": "string",
 *             "description": "LinkedIn Url"
 *           },
 *           "image": {
 *             "type": "string",
 *             "description": "Image Url"
 *           },
 *           "description": {
 *             "type": "string",
 *             "description": "Description"
 *           }
 *         },
 *        "required": [ "name" ],
 *         "example": {
 *           "name": "Isaias",
 *           "facebookUrl": "https://es-la.facebook.com/isaiasGoldman",
 *           "instagramUrl": "https://www.instagram.com/isaiasGoldman",
 *           "linkedinUrl": "https://www.linkedin.com/in/isaiasGoldman-link/",
 *           "image": "https://myImage.png",
 *           "description": "A good employee",
 *         }
 *      }
 *    }
 *  }
 *}
 */

 /**
 * @swagger
 *{
 *  "/members": {
 *    "post": {
 *      "summary": "Create a Member",
 *       "requestBody": {
 *        "required": true,
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/Member"
 *                }
 *            }
 *         }
 *      },
 *      "tags": [ "Members" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "Created" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */

router.post('/', memberValidate.memberIsValid, create);

/**
 * @swagger
 *{
 *  "/members": {
 *    "get": {
 *      "summary": "Get all Members",
 *      "parameters": [
 *               {
 *                 "name": "page",
 *                 "in": "query",
 *                 "description": "Page number",
 *                 "type": "integer"
 *               }
 *             ],
 *      "tags": [ "Members" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "All Members listed" }
 *      }
 *    }
 *  }
 *}
 */
router.get('/', pagination.validate, getMembersAll);

/**
 * @swagger
 *{
 *  "/members/{id}": {
 *    "put": {
 *      "summary": "Update a Member by id",
 *      "parameters": [{
 *        "name": "id",
 *        "in": "path",
 *        "description": "Member id update",
 *        "required": true,
 *        "type": "integer"
 *      }],
 *       "requestBody": {
 *        "required": true,
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/Member"
 *                }
 *            }
 *         }
 *      },
 *      "tags": [ "Members" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "OK" },
 *        "404": { "description": "Member not found" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */

router.put('/:id', updateMember);

/**
 * @swagger
 *{
 *  "/members/{id}": {
 *    "delete": {
 *      "summary": "Delete member by id",
 *      "parameters": [{
 *        "name": "id",
 *        "in": "path",
 *        "description": "Member id to destroy",
 *        "required": true,
 *        "type": "integer"
 *      }],
 *      "tags": [ "Members" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "Member delete" },
 *        "404": { "description": "Not found" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */

router.delete('/:id', deleteMember);

module.exports = router;

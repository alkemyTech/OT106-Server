const express = require('express');
const organizationController = require('../controllers/organization-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateSchemaOrganization, validateSchemaUrls } = require('../validations/organizations-validations');

const router = express.Router();


/**
 *@swagger
 *{
 *   "components": {
 *     "schemas": {
 *       "Organization": {
 *         "type": "object",
 *         "properties": {
 *           "name": {
 *             "type": "string",
 *             "description": "Organization's name"
 *           },
 *          "image": {
 *             "type": "string",
 *             "description": "Image of organization"
 *           },
 *          "address": {
 *             "type": "string",
 *             "description": "Address of organization"
 *           },
 *          "phone": {
 *             "type": "string",
 *             "description": "Name of organization"
 *           },
 *           "email": {
 *             "type": "string",
 *             "description": "email address of organization"
 *           },
 *           "welcomeText": {
 *             "type": "string",
 *             "description": "welcome text of organization"
 *           },
 *           "aboutUsText": {
 *             "type": "string",
 *             "description": "text about organization"
 *           },
 *           "facebook": {
 *             "type": "string",
 *             "description": "facebook page Url"
 *           },
 *           "instagram": {
 *             "type": "string",
 *             "description": "instagram page Url"
 *           },
 *           "linkedin": {
 *             "type": "string",
 *             "description": "linkedin page Url"
 *           }
 *         },
 *        "required": [ "name", "image" ],
 *         "example": {
 *           "name": "Isaias",
 *           "image": "imagen.jpg"
 *         }
 *      },
 *      "OrganizationUrls": {
 *         "type": "object",
 *         "properties": {
 *           "email": {
 *             "type": "string",
 *             "description": "email address of organization"
 *           },
 *           "facebook": {
 *             "type": "string",
 *             "description": "facebook page Url"
 *           },
 *           "instagram": {
 *             "type": "string",
 *             "description": "instagram page Url"
 *           },
 *           "linkedin": {
 *             "type": "string",
 *             "description": "linkedin page Url"
 *           }
 *         },
 *        "required": [ "email", "instagram", "linkedin", "facebook" ],
 *         "example": {
 *           "email": "ejemplo@ejemplo.com",
 *           "instagram": "http://www.instagram.com/ejemplo",
 *           "facebook": "http://www.facebook.com/ejemplo",
 *           "linkedin": "http://www.linkedin.com/ejemplo"
 *         }
 *      }
 *    }
 *  }
 *}
 */

 /**
 * @swagger
 *{
 *  "/organizations/public": {
 *    "get": {
 *      "summary": "Find all organizations",
 *      "tags": [ "Organizations" ],
 *      "responses": {
 *        "200": { "description": "Get all organizations" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */


// list name, image, phone, address and social networks links of organizations
router.get('/public', organizationController.listAll);


/**
 * @swagger
 *{
 *  "/public/{id}": {
 *    "post": {
 *      "summary": "Update data of organization",
 *      "parameters": [{
 *        "name": "id",
 *        "in": "path",
 *        "description": "organization id to update",
 *        "required": true,
 *        "type": "integer"
 *      }],
 *       "requestBody": {
 *        "required": true,
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/Organization"
 *                }
 *            }
 *         }
 *      },
 *      "tags": [ "Organizations" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "Updated" },
 *        "400": { "description": "Bad Request" },
 *        "403": { "description": "Invalid Token" },
 *        "404": { "description": "Not found Organization Id" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */


// update organization by id
router.post('/public/:id',
                adminAuthentication, // try validate admin user
                validateSchemaOrganization, // array of validations for organizations model
                organizationController.update
            );


/**
 * @swagger
 *{
 *  "/public/contact/{id}": {
 *    "post": {
 *      "summary": "Update contact fields of organization",
 *      "parameters": [{
 *        "name": "id",
 *        "in": "path",
 *        "description": "organization id to update",
 *        "required": true,
 *        "type": "integer"
 *      }],
 *       "requestBody": {
 *        "required": true,
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/OrganizationUrls"
 *                }
 *            }
 *         }
 *      },
 *      "tags": [ "Organizations" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "Updated" },
 *        "400": { "description": "Bad Request" },
 *        "403": { "description": "Invalid Token" },
 *        "404": { "description": "Not found Organization Id" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */


// update contact fields for organization by id
router.post('/public/contact/:id',
                adminAuthentication, // try validate admin user
                validateSchemaUrls, // array of validations for organization's urls
                organizationController.update
            );


// create new organization
// router.post('/public', organizationController.create);

// show organization by id
// router.get('/public/:id', organizationController.findById);

// delete organization by id
// router.delete('/public/:id', organizationController.delete);


module.exports = router;

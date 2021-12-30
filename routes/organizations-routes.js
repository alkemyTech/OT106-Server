const express = require('express');
const organizationController = require('../controllers/organization-controller');
const adminAuthentication = require('../middleware/admin-authentication');
const { validateSchemaOrganization, validateSchemaUrls } = require('../validations/organizations-validations');

const router = express.Router();

/**
 * @swagger
 *{
 *  "organizations/public": {
 *    "post": {
 *      "summary": "Create new organization",
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
 *        "201": { "description": "Created" },
 *        "400": { "description": "Bad Request" },
 *        "403": { "description": "Invalid Token" },
 *        "404": { "description": "Not found Organization Id" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */

// create new organization
router.post('/public',
    adminAuthentication, // try validate admin user
    validateSchemaOrganization,
    organizationController.create);


/**
 * @swagger
 *{
 *  "/organizations/public/{id}": {
 *    "get": {
 *      "summary": "Find a organization by Id",
 *      "tags": [ "Organizations" ],
 *      "responses": {
 *        "200": { "description": "Get details for organizations" },
 *        "404": { "description": "Not found Organization Id" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */

// show organization by id
router.get('/public/:id', organizationController.findById);

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
 *        "required": [ "name", "image", "address", "email", "welcomeText" ],
 *         "example": {
 *           "name": "Example",
 *           "image": "http://www.imagen.com/ejemplo.jpg",
 *           "address": "example 21",
 *           "email": "test@test.com",
 *           "welcomeText": "test for text"
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
 *  "organizations/public/{id}": {
 *    "put": {
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
router.put('/public/:id',
                adminAuthentication, // try validate admin user
                validateSchemaOrganization, // array of validations for organizations model
                organizationController.update
            );


/**
 * @swagger
 *{
 *  "organizations/public/{id}": {
 *    "delete": {
 *      "summary": "Delete an organization",
 *      "parameters": [{
 *        "name": "id",
 *        "in": "path",
 *        "description": "organization id to delete",
 *        "required": true,
 *        "type": "integer"
 *      }],
 *      "tags": [ "Organizations" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": { "description": "Deleted" },
 *        "400": { "description": "Bad Request" },
 *        "403": { "description": "Invalid Token" },
 *        "500": { "description": "Internal server error" }
 *      }
 *    }
 *  }
 *}
 */

// delete organization by id
router.delete('/public/:id',
    adminAuthentication, // try validate admin user
    validateSchemaOrganization,
    organizationController.delete);


/**
 * @swagger
 *{
 *  "organizations/public/contact/{id}": {
 *    "put": {
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
router.put('/public/contact/:id',
                // adminAuthentication, // try validate admin user
                validateSchemaUrls, // array of validations for organization's urls
                organizationController.update
            );


module.exports = router;

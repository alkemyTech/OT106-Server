const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
const categoryValidation = require("../validations/category-validation");
const validator = require("../functions/validator");
const adminPermission = require("../middleware/admin-authentication");
const pagination = require("../middleware/pagination");
const upload = require("../middleware/upload");

// /categories
/**
 *@swagger
 *{
 *   "components": {
 *     
 *     "schemas": {
 *       "Category": {
 *         "type": "object",
 *         "properties": {
 *           "name": {
 *             "type": "string",
 *             "description": "Nombre de la categoria"
 *           },
 *           "image": {
 *             "type": "string",
 *             "description": "Archivo de imagen"
 *           },
 *           "description": {
 *             "type": "string",
 *             "description": "Descripcion"
 *           }
 *         },
 *        "required": [ "name" ],
 *         "example": {
 *           "name": "Lorem",
 *           "description": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.",
 *         }
 *      }
 *    },
 * "responses":{
 *        "Ok":{"description": "Solicitud aceptada "},
 *        "Created":{"description": "Se guardo correctamente en la base de datos"},
 *        "Forbbiden":{"description": "No tiene acceso "},
 *        "InternalServerError":{"description": "Error del servidor "},
 *        "BadRequest":{"description": "Solicitud no válida "},
 *    },
 *    
 *  }
 *}
 */



/**
 * @swagger
 *{
 *  "/categories": {
 *    "get": {
 *      "summary": "Lista todas las categorias",
 *      "parameters": [
 *               {
 *                 "name": "page",
 *                 "in": "query",
 *                 "description": "Número de página",
 *                 "type": "integer"
 *               }
 *             ],
 *      "tags": [ "Category" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": {"$ref":"#/components/responses/Ok"},
 *        "403": {"$ref":"#/components/responses/Forbbiden"},
 *        "500": {"$ref":"#/components/responses/InternalServerError"}
 *      }
 *    }
 *  }
 *}
 */
router.get("/", adminPermission,pagination.validate, categoryController.list);


/**
 * @swagger
 *{
 *  "/categories/{id}": {
 *    "get": {
 *      "summary": "Trae la categoria según el ID",
 *      "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "Número id",
 *                 "required": true,
 *                 "type": "integer"
 *               }
 *             ],
 *      "tags": [ "Category" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": {"$ref":"#/components/responses/Ok"},
 *        "403": {"$ref":"#/components/responses/Forbbiden"},
 *        "500": {"$ref":"#/components/responses/InternalServerError"}
 *      }
 *    }
 *  }
 *}
 */
router.get("/:id", adminPermission,adminPermission, categoryController.detail);



/**
 * @swagger
 *{
 *  "/categories": {
 *    "post": {
 *      "summary": "Crea una nueva categoria",
 *      "requestBody":{
 *         "required":true,
 *           "content":{
 *             "application/json":{
 *               "schema":{
 *                  "type":"object",
 *                 "$ref":"#/components/schemas/Category"
 *                  }
 *                }
 *              }
 *          },
 *      "tags": [ "Category" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "201": {"$ref":"#/components/responses/Created"},
 *        "403": {"$ref":"#/components/responses/Forbbiden"},
 *        "500": {"$ref":"#/components/responses/InternalServerError"}
 *      }
 *    }
 *  }
 *}
 */



router.post(
  "/",
  upload,
  adminPermission,
  categoryValidation,
  validator,
  categoryController.create
);




/**
 * @swagger
 *{
 *  "/categories/{id}": {
 *    "put": {
 *      "summary": "Actualiza una categoria",
 *  "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "Número id",
 *                 "required": true,
 *                 "type": "integer"
 *               }
 *             ],
 *      "requestBody":{
 *         "required":true,
 *           "content":{
 *             "application/json":{
 *               "schema":{
 *                  "type":"object",
 *                 "$ref":"#/components/schemas/Category"
 *                  }
 *                }
 *              }
 *          },
 *      "tags": [ "Category" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "201": {"$ref":"#/components/responses/Created"},
 *        "400": {"$ref":"#/components/responses/BadRequest"},
 *        "403": {"$ref":"#/components/responses/Forbbiden"},
 *        "500": {"$ref":"#/components/responses/InternalServerError"}
 *      }
 *    }
 *  }
 *}
 */

router.put(
  "/:id",
  upload,
  adminPermission,
  categoryValidation,
  validator,
  categoryController.update
);



/**
 * @swagger
 *{
 *  "/categories/{id}": {
 *    "delete": {
 *      "summary": "Elimina una categoria",
 *  "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "Número id",
 *                 "required": true,
 *                 "type": "integer"
 *               }
 *             ],
 *      "tags": [ "Category" ],
 *      "security":[{"token":[]}],
 *      "responses": {
 *        "200": {"$ref":"#/components/responses/Ok"},
 *        "403": {"$ref":"#/components/responses/Forbbiden"},
 *        "500": {"$ref":"#/components/responses/InternalServerError"}
 *      }
 *    }
 *  }
 *}
 */



router.delete("/:id",adminPermission, categoryController.remove);





module.exports = router;

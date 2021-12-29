const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: "SOMOS MAS API",
      description: "API para ONG Somos MAS",
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: process.env.SWAGGER_SECURITY_TYPE,
          scheme: process.env.SECURITY_SCHEMA,
          bearerFormat: process.env.BEARER_FORMAT,
        }
      }
    },
    servers: [
      {
        url: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`,
        description: 'API server',
      },
    ]
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js']

  };
  
const swaggetSpect = swaggerJsdoc(options);
module.exports = swaggetSpect
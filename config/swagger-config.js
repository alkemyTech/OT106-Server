const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. for ong.',
      license: {
        name: 'Licensed Under MIT',
        url: '',
      },
      contact: {
        name: 'contacto',
        url: '',
      },
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: process.env.PROTOCOL,
            scheme: process.env.SECURITY_SCHEMA,
            bearerFormat: process.env.BEARER_FORMAT,
          }
        }
      },
      security: [{
        bearerAuth: []
    }],
    servers: [
      {
        url: `${process.env.PROTOCOL}://${process.env.ENVIRONMENT}:${process.env.PORT}`,
        description: 'Development server',
      },
    ]
  };
  
  const options = {
    swaggerDefinition,
    components: {
        securitySchemes: {
          bearerAuth: {
            type: process.env.PROTOCOL,
            scheme: process.env.SECURITY_SCHEMA,
            bearerFormat: process.env.BEARER_FORMAT,
          }
        }
      },
      security: [{
        bearerAuth: []
      }],

    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js']

  };
  
const swaggetSpect = swaggerJsdoc(options);
module.exports = swaggetSpect
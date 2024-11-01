const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const doc = {
  info: {
    title: "My Cirlce API",
    description: "Welcome, this is my circle API :D",
  },
  host: "localhost:5000",
  components: {
    "@schemas": {
      CreateThreadDTO: {
        type: "object",
        properties: {
          userId: {
            type: "number",
          },
          content: {
            type: "string",
          },
          file: {
            type: "file"
          }
        },
      },
      LoginDTO: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      RegisterDTO: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
            format: "password",
          },
          address: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["../index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

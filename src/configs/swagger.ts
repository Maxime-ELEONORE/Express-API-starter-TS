import { SwaggerDefinition } from "swagger-jsdoc";
// Import the JSON schema directly if you're using a module system that supports JSON imports
import userSchema from "../documentation/swagger/components/user.json";

const swaggerOptions: SwaggerDefinition = {
  apis: [`${__dirname}/../routers/*.ts`], // Ensure this path is correctly pointing to your routes
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: "Express API starter TS",
      description: "API basic avec authentification sécurisé par jwt",
      contact: {
        name: "Tydaks"
      },
      version: "1.0.0"
    },
    servers: [{
      url: "http://localhost:3000"
    }],
    components: {
      schemas: {
        User: userSchema.User
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez le token JWT:'
        }
      }
    },
    
  },

  info: {
    title: "Express API starter TS",
    description: "API basic avec authentification sécurisé par jwt",
    contact: {
      name: "Tydaks"
    },
    version: "1.0.0"
  },
};

export default swaggerOptions;

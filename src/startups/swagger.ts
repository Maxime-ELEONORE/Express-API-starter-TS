import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../configs/swagger';

const specs = swaggerJsdoc(swaggerOptions);

const docsSetup = (app: Express) =>
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
export default docsSetup;
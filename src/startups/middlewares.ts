import { Express } from 'express';
import { decodeJWT } from '../middlewares/auth';
import { loggerMiddleware } from '../middlewares/logger';

const MiddlewaresSetup = async (app: Express) => {
    app
    .use(decodeJWT)
    .use(loggerMiddleware)
};
  
export default MiddlewaresSetup;
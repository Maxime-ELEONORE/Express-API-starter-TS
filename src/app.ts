import express from 'express';
const app = express();
import dotenv from 'dotenv';
import appSetup from './startups/init';
import routerSetup from './startups/router';
import securitySetup from './startups/security';
import middlewaresSetup from './startups/middlewares';
dotenv.config();

appSetup(app);
securitySetup(app, express);
middlewaresSetup(app);
routerSetup(app);
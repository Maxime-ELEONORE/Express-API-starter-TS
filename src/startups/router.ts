import { Express, Request, Response } from 'express';
import userRouter from '../routers/user'
import authRouter from '../routers/auth'

const routerSetup = (app: Express) =>
  app
  .use('', authRouter)
  .use('/users', userRouter)

export default routerSetup;
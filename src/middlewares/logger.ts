import { Response, NextFunction } from 'express';
import moment from 'moment';

export const loggerMiddleware: (req: any, res: Response, next: NextFunction) => void = (req, res, next) => {
  const date = moment().format('YYYY-MM-DD HH:mm:ss');

  const userId = req.user ? req.user.userId : 'N/A';
  const userRole = req.user ? req.user.userRole : 'N/A';
  const method = req.method;
  const url = req.originalUrl;
  const body = JSON.stringify(req.body);


  let logMessage = `----------\n[${date}]\nUserID: ${userId}  UserRole: ${userRole}\nHTTP Method: ${method}, URL: ${url}`

  if (body !== "{}")
    logMessage += `\nBody: ${body}`;
  console.log(logMessage);

  next();
};

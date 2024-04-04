import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const decodeJWT: (req: any, res: Response, next: NextFunction) => void = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET || 'your_secret_key');
      req.user = decoded; 
    } catch (error) {
      console.error(error);
    }
  }
  next();
};

export const checkRole: (role: string) => (req: any, res: Response, next: NextFunction) => void = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.userRole === role) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
};

export const checkAdminOrOwnResource: (req: any, res: Response, next: NextFunction) => void = (req, res, next) => {
  const isAdmin = req.user && req.user.userRole === 'admin'; 
  const isOwner = req.user && req.user.userId === req.params.id;
  if (isAdmin || isOwner) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};
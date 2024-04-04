import { Request, Response } from 'express';
import userService from '../services/user';
import authService from '../services/auth';

const authController = {
  login: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      let user = await userService.getUserByEmail(email);
      if (!user) {
        user = await userService.getUserByUsername(username);
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await authService.comparePassword(user, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = authService.generateJWT(user);

      res.json({ token, 'role': user.role, '_id': user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: (req: Request, res: Response) => {
    res.json({ message: 'Logout successful' });
  },

};

export default authController;

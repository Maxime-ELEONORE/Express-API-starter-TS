// authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../database/interfaces/user';

const authService = {

  generateJWT: (userData: IUser): string => {
    const token = jwt.sign({ userId: userData._id, userRole: userData.role }, process.env.APP_SECRET || 'your_secret_key', {
      expiresIn: '1h',
    });
    return token;
  },

  comparePassword: async (userData: IUser, password: string): Promise<boolean> => {
    try {
      const isMatch = await bcrypt.compare(password, userData.password);
      return isMatch;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default authService;

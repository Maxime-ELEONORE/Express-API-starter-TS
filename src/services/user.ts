import UserModel from '../database/schemas/user';
import { IUser } from '../database/interfaces/user';

class UserService {
  // Create
  async createUser(userData: IUser): Promise<IUser> {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  // Read
  async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email }).select('password').select('role');
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error}`);
    }
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ username }).select('password').select('role');
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error}`);
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error(`Error getting all users: ${error}`);
    }
  }

  // Update
  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return null;
      }

      if (userData.username) {
        user.username = userData.username;
      }
      if (userData.email) {
        user.email = userData.email;
      }
      if (userData.password) {
        user.password = userData.password;
      }
      if (userData.role) {
        user.role = userData.role;
      }

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  // Delete
  async deleteUser(userId: string): Promise<boolean> {
    try {
      await UserModel.findByIdAndDelete(userId);
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}

export default new UserService();

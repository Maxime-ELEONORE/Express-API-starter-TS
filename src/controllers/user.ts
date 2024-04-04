import { Request, Response } from 'express';
import UserService from '../services/user';

class UserController {

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await UserService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const userData = req.body;
      const updatedUser = await UserService.updateUser(userId, userData);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default new UserController();

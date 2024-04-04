import express from 'express';
import UserController from '../controllers/user';
import { checkRole, checkAdminOrOwnResource } from '../middlewares/auth';

const router = express.Router();

router.post('/', checkRole('admin'), UserController.createUser);
router.get('/', checkRole('admin'), UserController.getAllUsers);
router.get('/:userId', checkAdminOrOwnResource, UserController.getUser);
router.put('/:userId', checkAdminOrOwnResource, UserController.updateUser);
router.delete('/:userId', checkAdminOrOwnResource, UserController.deleteUser);

export default router;

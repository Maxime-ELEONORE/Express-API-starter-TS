import express from 'express';
import UserController from '../controllers/user';
import { checkRole, checkAdminOrOwnResource } from '../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User Management]
 *     summary: Creates a new user
 *     description: Admins can create a new user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       403:
 *         description: Unauthorized, only admins can create users
 */
router.post('/', checkRole('admin'), UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User Management]
 *     summary: Retrieves all users
 *     description: Admins can retrieve all registered users.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized, only admins can retrieve users
 */
router.get('/', checkRole('admin'), UserController.getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [User Management]
 *     summary: Get a user by ID
 *     description: Admins or the user themself can retrieve their user details.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized, only admins or the user themself can access this
 */
router.get('/:userId', checkAdminOrOwnResource, UserController.getUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [User Management]
 *     summary: Updates a user by ID
 *     description: Admins or the user themself can update their user details.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Unauthorized, only admins or the user themself can update this
 */
router.put('/:userId', checkAdminOrOwnResource, UserController.updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [User Management]
 *     summary: Deletes a user by ID
 *     description: Admins or the user themself can delete their user account.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       403:
 *         description: Unauthorized, only admins or the user themself can delete this
 */
router.delete('/:userId', checkAdminOrOwnResource, UserController.deleteUser);

export default router;

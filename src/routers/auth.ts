import express from 'express';
import authController from '../controllers/auth';

const authRouter = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate a user
 *     description: This route authenticates a user by their credentials and returns a JWT token, role, and user ID upon success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Authentication successful. Returns JWT token, user role, and user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *                 role:
 *                   type: string
 *                   description: The role of the authenticated user.
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the authenticated user.
 *       401:
 *         description: Authentication failed. Invalid username or password.
 */
authRouter.post('/login', authController.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     tags: [Authentication]
 *     summary: Log out a user
 *     description: This route logs out a user by invalidating their authentication token.
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
authRouter.get('/logout', authController.logout);

export default authRouter;
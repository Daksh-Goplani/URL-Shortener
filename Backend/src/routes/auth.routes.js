import express from 'express';
const router = express.Router();
import authController from '../controller/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get('/me', authMiddleware, authController.getCurrentUser)

export default router
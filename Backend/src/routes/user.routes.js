import express from 'express';
const router = express.Router();
import userController from '../controller/user.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

router.post("/urls",authMiddleware, userController.getAllUserUrls)

export default router
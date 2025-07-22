import express from 'express';
import {
  registerUser,
  loginUser,
  sendResetPasswordToken,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Forgot Password Routes
router.post('/forgot-password', sendResetPasswordToken);
router.post('/reset-password/:token', resetPassword);

export default router;

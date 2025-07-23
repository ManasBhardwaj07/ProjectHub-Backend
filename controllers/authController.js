import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// Registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Send Password Reset Email
export const sendResetPasswordToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expireTime = Date.now() + 1000 * 60 * 15; // 15 minutes

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expireTime;
    await user.save();

    // ✅ Construct reset URL
   const resetLink =  `${process.env.FRONTEND_URL}/reset-password/${token}`;



    // ✅ Email content
    const html = `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
      <a href="${resetLink}" style="background-color:#3b82f6;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">Reset Password</a>
      <p>If you did not request this, you can ignore this email.</p>
    `;

    // ✅ Send email
    await sendEmail(email, 'ProjectHub – Password Reset Request', html);

    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error while sending reset email' });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;             // ✅ FIXED
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

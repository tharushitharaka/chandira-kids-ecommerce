import express from 'express';
import crypto from 'crypto';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { signToken } from '../utils/token.js';
import { passwordResetTemplate, sendEmail, welcomeTemplate } from '../utils/email.js';

const router = express.Router();

const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
});

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409);
      throw new Error('Email is already registered');
    }

    const user = await User.create({ name, email, password, phone });
    // Disabled email sending for development to prevent timeout
    // await sendEmail({ to: user.email, subject: 'Welcome to Chandira Kids', html: welcomeTemplate(user) });
    res.status(201).json({ user: userPayload(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    res.json({ user: userPayload(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
});

router.get('/me', protect, (req, res) => {
  res.json({ user: userPayload(req.user) });
});

router.post('/forgot-password', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const plainToken = crypto.randomBytes(32).toString('hex');
      user.passwordResetToken = crypto.createHash('sha256').update(plainToken).digest('hex');
      user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
      await user.save({ validateBeforeSave: false });
      // Disabled email sending for development
      // const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${plainToken}`;
      // await sendEmail({ to: user.email, subject: 'Reset your Chandira Kids password', html: passwordResetTemplate(user, resetUrl) });
    }
    res.json({ message: 'If that email exists, a reset link has been sent' });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password/:token', async (req, res, next) => {
  try {
    const passwordResetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } }).select('+password');
    if (!user) {
      res.status(400);
      throw new Error('Password reset link is invalid or expired');
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({ user: userPayload(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
});

export default router;

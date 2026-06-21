import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { signToken } from '../utils/token.js';

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

export default router;

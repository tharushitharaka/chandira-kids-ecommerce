import express from 'express';
import User from '../models/User.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/wishlist', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist.product');
    res.json(user.wishlist.map((item) => item.product).filter(Boolean));
  } catch (error) {
    next(error);
  }
});

router.post('/wishlist/:productId', protect, async (req, res, next) => {
  try {
    const exists = req.user.wishlist.some((item) => item.product.toString() === req.params.productId);
    if (!exists) req.user.wishlist.push({ product: req.params.productId });
    await req.user.save();
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (error) {
    next(error);
  }
});

router.delete('/wishlist/:productId', protect, async (req, res, next) => {
  try {
    req.user.wishlist = req.user.wishlist.filter((item) => item.product.toString() !== req.params.productId);
    await req.user.save();
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
});

router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/:id/role', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;

import express from 'express';
import Coupon from '../models/Coupon.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/validate', async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({ code: req.body.code?.toUpperCase(), isActive: true });
    res.json({ valid: Boolean(coupon), coupon });
  } catch (error) {
    next(error);
  }
});

router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await Coupon.find().sort('-createdAt'));
  } catch (error) {
    next(error);
  }
});

router.post('/admin', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.status(201).json(await Coupon.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/admin/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
  } catch (error) {
    next(error);
  }
});

router.delete('/admin/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;

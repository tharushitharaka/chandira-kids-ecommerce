import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import Promotion from '../models/Promotion.js';
import { getPaymentMethods } from '../services/paymentMethods.js';

const router = express.Router();

router.get('/promotions', async (req, res, next) => {
  try {
    const now = new Date();
    const promotions = await Promotion.find({
      isActive: true,
      $and: [
        { $or: [{ startsAt: null }, { startsAt: { $lte: now } }] },
        { $or: [{ endsAt: null }, { endsAt: { $gte: now } }] }
      ]
    }).populate('product').sort('-createdAt');
    res.json(promotions);
  } catch (error) {
    next(error);
  }
});

router.get('/payment-methods', (req, res) => {
  res.json(getPaymentMethods());
});

router.post('/newsletter', async (req, res, next) => {
  try {
    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: req.body.email },
      { ...req.body, isActive: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(subscriber);
  } catch (error) {
    next(error);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

export default router;

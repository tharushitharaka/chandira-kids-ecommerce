import express from 'express';
import Category from '../models/Category.js';
import ContactMessage from '../models/ContactMessage.js';
import Coupon from '../models/Coupon.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Promotion from '../models/Promotion.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import WholesaleApplication from '../models/WholesaleApplication.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, authorize('admin'), async (req, res, next) => {
  try {
    const [orders, products, users, wholesalePending] = await Promise.all([
      Order.find(),
      Product.find(),
      User.countDocuments(),
      WholesaleApplication.countDocuments({ status: 'pending' })
    ]);

    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStock = products.filter((product) => product.variants.reduce((sum, v) => sum + v.stock, 0) <= 5);

    res.json({
      revenue,
      orders: orders.length,
      users,
      products: products.length,
      wholesalePending,
      lowStock,
      outOfStock: products.filter((product) => product.variants.reduce((sum, v) => sum + v.stock, 0) === 0)
    });
  } catch (error) {
    next(error);
  }
});

router.get('/overview', protect, authorize('admin'), async (req, res, next) => {
  try {
    const [orders, products, customers, reviews, wholesaleAccounts, promotions, contacts, newsletters, coupons, categories] = await Promise.all([
      Order.find().populate('user', 'name email').sort('-createdAt').limit(20),
      Product.find().sort('-createdAt').limit(50),
      User.find().select('-password').sort('-createdAt').limit(50),
      Review.find().populate('user product', 'name email').sort('-createdAt').limit(50),
      WholesaleApplication.find().populate('user', 'name email').sort('-createdAt').limit(50),
      Promotion.find().populate('product').sort('-createdAt').limit(50),
      ContactMessage.find().sort('-createdAt').limit(50),
      NewsletterSubscriber.find().sort('-createdAt').limit(50),
      Coupon.find().sort('-createdAt').limit(50),
      Category.find().sort('name')
    ]);

    res.json({ orders, products, customers, reviews, wholesaleAccounts, promotions, contacts, newsletters, coupons, categories });
  } catch (error) {
    next(error);
  }
});

router.post('/categories', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.status(201).json(await Category.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.post('/promotions', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.status(201).json(await Promotion.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/promotions/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
  } catch (error) {
    next(error);
  }
});

router.put('/contacts/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    next(error);
  }
});

router.put('/reviews/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    next(error);
  }
});

export default router;

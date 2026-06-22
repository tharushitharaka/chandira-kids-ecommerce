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

router.get('/categories', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await Category.find().sort('name'));
  } catch (error) {
    next(error);
  }
});

router.put('/categories/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete('/categories/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
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

router.get('/promotions', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await Promotion.find().populate('product').sort('-createdAt'));
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

router.delete('/promotions/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.json({ message: 'Promotion deleted' });
  } catch (error) {
    next(error);
  }
});

router.get('/contacts', protect, authorize('admin'), async (req, res, next) => {
  try {
    res.json(await ContactMessage.find().sort('-createdAt'));
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

router.delete('/contacts/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const contact = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact message not found' });
    res.json({ message: 'Contact message deleted' });
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

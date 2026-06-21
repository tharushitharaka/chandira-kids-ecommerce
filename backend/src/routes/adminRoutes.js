import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
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
      lowStock
    });
  } catch (error) {
    next(error);
  }
});

export default router;

import express from 'express';
import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { authorize, optionalAuth, protect } from '../middleware/auth.js';
import { orderConfirmationTemplate, sendEmail } from '../utils/email.js';
import { createPaymentIntent } from '../services/paymentMethods.js';

const router = express.Router();

const getDiscount = async (couponCode, subtotal) => {
  if (!couponCode) return { discount: 0 };
  const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
  const now = new Date();
  const invalid =
    !coupon ||
    coupon.usedCount >= coupon.maxUses ||
    subtotal < coupon.minOrderValue ||
    (coupon.startsAt && coupon.startsAt > now) ||
    (coupon.expiresAt && coupon.expiresAt < now);

  if (invalid) return { discount: 0, coupon: null };

  const discount = coupon.type === 'percentage' ? subtotal * (coupon.value / 100) : coupon.value;
  return { discount: Math.min(discount, subtotal), coupon };
};

router.post('/quote', async (req, res, next) => {
  try {
    const { items = [], couponCode } = req.body;
    const pricedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error('A product in your cart is no longer available');
        const wholesale = Boolean(item.wholesale);
        return {
          product: product._id,
          name: product.name,
          quantity: Number(item.quantity),
          price: wholesale ? product.wholesalePrice : product.price,
          wholesale
        };
      })
    );
    const subtotal = pricedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const { discount } = await getDiscount(couponCode, subtotal);
    const shippingFee = subtotal > 15000 ? 0 : 650;
    res.json({ items: pricedItems, subtotal, discount, shippingFee, total: subtotal - discount + shippingFee });
  } catch (error) {
    next(error);
  }
});

router.post('/', optionalAuth, async (req, res, next) => {
  try {
    const { items = [], shippingAddress, couponCode, guestEmail, paymentMethod, notes } = req.body;
    if (!items.length) {
      res.status(400);
      throw new Error('Cart is empty');
    }

    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error('A product in your cart is no longer available');
      const variant = product.variants.find((v) => v.sku === item.sku);
      if (!variant || variant.stock < item.quantity) {
        throw new Error(`${product.name} does not have enough stock`);
      }
      variant.stock -= Number(item.quantity);
      await product.save();
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url,
        size: variant.size,
        color: variant.color,
        sku: variant.sku,
        quantity: Number(item.quantity),
        price: item.wholesale ? product.wholesalePrice : product.price,
        wholesale: Boolean(item.wholesale)
      });
    }

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const { discount, coupon } = await getDiscount(couponCode, subtotal);
    const shippingFee = subtotal > 15000 ? 0 : 650;
    const order = await Order.create({
      user: req.user?._id,
      guestEmail,
      items: orderItems,
      shippingAddress,
      subtotal,
      discount,
      shippingFee,
      total: subtotal - discount + shippingFee,
      couponCode: coupon?.code,
      paymentMethod,
      notes
    });

    const paymentIntent = await createPaymentIntent(paymentMethod, order);
    order.paymentReference = paymentIntent.reference;
    await order.save();

    if (coupon) {
      coupon.usedCount += 1;
      await coupon.save();
    }

    await sendEmail({
      to: req.user?.email || guestEmail,
      subject: `Chandira Kids order ${order.orderNumber}`,
      html: orderConfirmationTemplate(order)
    });

    res.status(201).json({ order, paymentIntent });
  } catch (error) {
    next(error);
  }
});

router.get('/mine/list', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', protect, authorize('admin'), async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/track/:orderNumber', async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json({ orderNumber: order.orderNumber, status: order.status, paymentStatus: order.paymentStatus, updatedAt: order.updatedAt });
  } catch (error) {
    next(error);
  }
});

export default router;

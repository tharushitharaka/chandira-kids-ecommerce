import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, isApproved: true })
      .populate('user', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post('/:productId', protect, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const review = await Review.findOneAndUpdate(
      { product: product._id, user: req.user._id },
      { rating: req.body.rating, title: req.body.title, comment: req.body.comment },
      { upsert: true, new: true, runValidators: true }
    );

    const stats = await Review.aggregate([
      { $match: { product: product._id, isApproved: true } },
      { $group: { _id: '$product', averageRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
    ]);

    product.averageRating = stats[0]?.averageRating || 0;
    product.reviewCount = stats[0]?.reviewCount || 0;
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const stats = await Review.aggregate([
      { $match: { product: review.product, isApproved: true } },
      { $group: { _id: '$product', averageRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
    ]);

    const product = await Product.findById(review.product);
    if (product) {
      product.averageRating = stats[0]?.averageRating || 0;
      product.reviewCount = stats[0]?.reviewCount || 0;
      await product.save();
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;

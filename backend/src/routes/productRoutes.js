import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

const buildProductFilter = (query, admin = false) => {
  const filter = admin ? {} : { isPublished: true };
  if (query.category) filter.category = query.category;
  if (query.ageCategory) filter.ageCategory = query.ageCategory;
  if (query.ageRange) filter.ageRange = query.ageRange;
  if (query.featured) filter.featured = query.featured === 'true';
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  if (query.search) filter.$text = { $search: query.search };
  return filter;
};

router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Number(req.query.limit || 12), 48);
    const sortMap = {
      newest: '-createdAt',
      price_asc: 'price',
      price_desc: '-price',
      rating: '-averageRating'
    };
    const sort = sortMap[req.query.sort] || '-createdAt';
    const filter = buildProductFilter(req.query);
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
      Product.countDocuments(filter)
    ]);

    res.json({ products, page, pages: Math.ceil(total / limit), total });
  } catch (error) {
    next(error);
  }
});

router.get('/featured/list', async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, isPublished: true }).limit(8);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    const products = await Product.find(buildProductFilter(req.query, true)).sort('-createdAt');
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isPublished: true });
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    const reviews = await Review.find({ product: product._id, isApproved: true })
      .populate('user', 'name')
      .sort('-createdAt');
    res.json({ product, reviews });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;

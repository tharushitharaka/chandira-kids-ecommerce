import mongoose from 'mongoose';
import slugify from 'slugify';

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: true },
    color: { type: String, required: true },
    sku: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 }
  },
  { _id: false }
);

const productCategories = [
  'Baby Frocks',
  'Party Dresses',
  'Casual Dresses',
  'Clothing Sets',
  'Tops',
  'Skirts',
  'T-shirts',
  'Leggings',
  'Hairbands',
  'Accessories',
  'Seasonal Collections'
];

const ageCategories = [
  'Infants (0-12 months)',
  'Toddlers (1-3 years)',
  'Little Girls (4-7 years)',
  'Kids (8-12 years)',
  'Teen Girls (13-15 years)'
];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: productCategories
    },
    ageCategory: { type: String, required: true, enum: ageCategories },
    ageRange: { type: String, required: true },
    images: [{ url: String, alt: String }],
    price: { type: Number, required: true, min: 0 },
    wholesalePrice: { type: Number, required: true, min: 0 },
    wholesaleMinQty: { type: Number, default: 6 },
    costPrice: { type: Number, min: 0 },
    variants: [variantSchema],
    tags: [String],
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    seoTitle: String,
    seoDescription: String,
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

productSchema.pre('validate', function makeSlug(next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.virtual('totalStock').get(function totalStock() {
  return this.variants.reduce((sum, variant) => sum + variant.stock, 0);
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);

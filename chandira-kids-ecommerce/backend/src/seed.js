import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Coupon from './models/Coupon.js';
import Product from './models/Product.js';
import User from './models/User.js';
import { catalogueProducts } from './data/catalogueProducts.js';

dotenv.config();

const images = [
  'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80'
];

const products = [
  ['Rose Garden Party Dress', 'Party Dresses', 'Little Girls (4-7 years)', '2-8 years', 4950, 3650, true],
  ['Cotton Bloom Baby Frock', 'Baby Frocks', 'Infants (0-12 months)', '0-12 months', 2850, 2100, true],
  ['Sunday Lace Frock', 'Party Dresses', 'Kids (8-12 years)', '4-12 years', 6500, 5200, true],
  ['Everyday Pastel Tee Set', 'Clothing Sets', 'Little Girls (4-7 years)', '3-10 years', 3450, 2600, false],
  ['Tiny Bow Hairband Pack', 'Hairbands', 'Infants (0-12 months)', '0-15 years', 1250, 900, true],
  ['Seasonal Cloud Sleepsuit', 'Seasonal Collections', 'Infants (0-12 months)', '0-6 months', 2450, 1800, false]
].map(([name, category, ageCategory, ageRange, salePrice, wholesalePrice, featured], index) => ({
  name,
  category,
  ageCategory,
  ageRange,
  salePrice,
  wholesalePrice,
  wholesaleMinQty: 6,
  featured,
  description:
    'Soft, carefully finished girls clothing designed for comfort, movement, and special family moments.',
  images: [{ url: images[index % images.length], alt: name }],
  tags: ['girls clothing', 'kids fashion', category.toLowerCase()],
  variants: ['XS', 'S', 'M'].map((size, variantIndex) => ({
    size,
    color: ['Blush', 'Ivory', 'Lilac'][variantIndex],
    sku: `CK-${index + 1}${variantIndex + 1}`,
    stock: 12 + variantIndex
  })),
  seoTitle: `${name} | Chandira Kids`,
  seoDescription: `Shop ${name} for girls ages ${ageRange}. Retail and wholesale pricing available.`
}));

products.push(...catalogueProducts);

const run = async () => {
  await connectDB();
  await Promise.all([Product.deleteMany(), Coupon.deleteMany()]);
  await Product.insertMany(products);
  await Coupon.create({ code: 'WELCOME10', type: 'percentage', value: 10, minOrderValue: 3000 });

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@chandira-kids.local';
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    await User.create({
      name: 'Chandira Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'Admin12345!',
      role: 'admin'
    });
  }

  console.log('Seed complete');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

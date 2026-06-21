import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { catalogueProducts } from '../data/catalogueProducts.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();

  for (const product of catalogueProducts) {
    await Product.findOneAndUpdate(
      { slug: product.slug },
      product,
      { upsert: true, new: true, runValidators: true }
    );
  }

  console.log(`Imported ${catalogueProducts.length} catalogue products`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

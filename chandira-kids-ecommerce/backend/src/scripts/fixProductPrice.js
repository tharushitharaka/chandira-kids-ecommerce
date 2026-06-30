import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const products = await Product.find({ price: { $exists: true } });
  console.log(`Found ${products.length} products with 'price' field`);
  
  let updated = 0;
  for (const product of products) {
    if (product.price && !product.salePrice) {
      product.salePrice = product.price;
      product.price = undefined;
      await product.save();
      updated++;
      console.log(`Updated: ${product.name}`);
    }
  }
  
  console.log(`Updated ${updated} products`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

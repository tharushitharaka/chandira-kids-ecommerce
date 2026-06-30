import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const products = await Product.find({});
  console.log(`Found ${products.length} products`);
  
  let updated = 0;
  for (const product of products) {
    let hasChanges = false;
    for (const variant of product.variants) {
      if (variant.stock < 50) {
        variant.stock = 50; // Set to 50 for testing
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      await product.save();
      updated++;
      console.log(`Updated stock for: ${product.name}`);
    }
  }
  
  console.log(`Updated stock for ${updated} products`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

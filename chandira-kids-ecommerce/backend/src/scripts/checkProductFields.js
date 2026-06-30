import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const product = await Product.findOne({ code: 'CK001' });
  console.log('Product fields:', Object.keys(product.toObject()));
  console.log('Product data:', JSON.stringify(product.toObject(), null, 2));
  
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

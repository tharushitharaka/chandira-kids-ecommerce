import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const products = await Product.find({});
  console.log(`Total products in database: ${products.length}`);
  console.log('\nProduct list:');
  products.forEach(p => {
    console.log(`- ${p.name} (Published: ${p.isPublished}, Code: ${p.code})`);
  });
  
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

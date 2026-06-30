import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  // Fix Rose Garden Party Dress
  const product = await Product.findOne({ code: 'CK001' });
  if (product) {
    product.salePrice = 4950;
    await product.save();
    console.log(`Updated ${product.name} salePrice to 4950`);
  }
  
  // Check for other products with salePrice: 0
  const zeroPriceProducts = await Product.find({ salePrice: 0 });
  console.log(`Found ${zeroPriceProducts.length} products with salePrice: 0`);
  
  for (const p of zeroPriceProducts) {
    if (p.code !== 'CK001') {
      console.log(`Product with zero price: ${p.name} (${p.code})`);
    }
  }
  
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

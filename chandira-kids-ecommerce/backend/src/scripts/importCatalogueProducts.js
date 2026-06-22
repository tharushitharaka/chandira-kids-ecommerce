import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { catalogueProducts } from '../data/catalogueProducts.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  await connectDB();

  // First, clean up any products with null codes
  await Product.deleteMany({ code: null });
  console.log('Cleaned up products with null codes');

  let importedCount = 0;
  let updatedCount = 0;

  for (const product of catalogueProducts) {
    const existing = await Product.findOne({ slug: product.slug });
    
    if (existing) {
      await Product.findOneAndUpdate(
        { slug: product.slug },
        product,
        { new: true, runValidators: true }
      );
      updatedCount++;
    } else {
      await Product.create(product);
      importedCount++;
    }
  }

  console.log(`Imported ${importedCount} new products`);
  console.log(`Updated ${updatedCount} existing products`);
  console.log(`Total processed: ${catalogueProducts.length} products`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

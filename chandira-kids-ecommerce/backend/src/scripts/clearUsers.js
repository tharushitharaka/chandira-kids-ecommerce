import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const result = await User.deleteMany({});
  console.log(`Deleted ${result.deletedCount} users from database`);
  
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

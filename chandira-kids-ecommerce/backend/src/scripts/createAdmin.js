import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  await connectDB();
  
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@chandira-kids.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin12345!';
  
  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    console.log('Admin user already exists:', adminEmail);
  } else {
    await User.create({
      name: 'Chandira Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    console.log('Admin user created successfully');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
  }
  
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

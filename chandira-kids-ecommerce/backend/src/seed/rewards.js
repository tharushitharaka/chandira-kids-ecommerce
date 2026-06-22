const mongoose = require('mongoose');
const Reward = require('../models/Reward');
const { connectDB } = require('../config/db');

const rewards = [
  {
    name: '10% Off Next Order',
    description: 'Get 10% off your next purchase',
    pointsRequired: 500,
    type: 'discount',
    value: 10,
    discountType: 'percentage',
    tier: 'All',
    isActive: true,
    terms: 'Valid for one-time use. Cannot be combined with other offers.'
  },
  {
    name: 'Free Shipping',
    description: 'Free shipping on your next order',
    pointsRequired: 300,
    type: 'free_shipping',
    value: 0,
    tier: 'Bronze',
    isActive: true,
    terms: 'Valid for orders within Sri Lanka only.'
  },
  {
    name: 'LKR 500 Gift Card',
    description: 'LKR 500 gift card for any purchase',
    pointsRequired: 1000,
    type: 'gift',
    value: 500,
    tier: 'Silver',
    isActive: true,
    terms: 'Gift card valid for 6 months from redemption date.'
  },
  {
    name: 'LKR 1000 Gift Card',
    description: 'LKR 1000 gift card for any purchase',
    pointsRequired: 2000,
    type: 'gift',
    value: 1000,
    tier: 'Silver',
    isActive: true,
    terms: 'Gift card valid for 6 months from redemption date.'
  },
  {
    name: '15% Off Next Order',
    description: 'Get 15% off your next purchase',
    pointsRequired: 1500,
    type: 'discount',
    value: 15,
    discountType: 'percentage',
    tier: 'Gold',
    isActive: true,
    terms: 'Valid for one-time use. Cannot be combined with other offers.'
  },
  {
    name: '20% Off Next Order',
    description: 'Get 20% off your next purchase',
    pointsRequired: 3000,
    type: 'discount',
    value: 20,
    discountType: 'percentage',
    tier: 'Gold',
    isActive: true,
    terms: 'Valid for one-time use. Cannot be combined with other offers.'
  },
  {
    name: 'LKR 2000 Gift Card',
    description: 'LKR 2000 gift card for any purchase',
    pointsRequired: 5000,
    type: 'gift',
    value: 2000,
    tier: 'Platinum',
    isActive: true,
    terms: 'Gift card valid for 6 months from redemption date.'
  },
  {
    name: '25% Off Next Order',
    description: 'Get 25% off your next purchase',
    pointsRequired: 4000,
    type: 'discount',
    value: 25,
    discountType: 'percentage',
    tier: 'Platinum',
    isActive: true,
    terms: 'Valid for one-time use. Cannot be combined with other offers.'
  },
  {
    name: 'Exclusive Access to New Arrivals',
    description: 'Get early access to new collections before anyone else',
    pointsRequired: 2500,
    type: 'exclusive_access',
    value: 0,
    tier: 'Gold',
    isActive: true,
    terms: 'Valid for 30 days from redemption. Early access via email notification.'
  },
  {
    name: 'Birthday Special',
    description: 'Special birthday discount during your birthday month',
    pointsRequired: 0,
    type: 'discount',
    value: 20,
    discountType: 'percentage',
    tier: 'All',
    isActive: true,
    terms: 'Automatically available during birthday month. No points required.'
  }
];

async function seedRewards() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing rewards
    await Reward.deleteMany({});
    console.log('Cleared existing rewards');

    // Insert new rewards
    const insertedRewards = await Reward.insertMany(rewards);
    console.log(`Inserted ${insertedRewards.length} rewards`);

    console.log('Rewards seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding rewards:', error);
    process.exit(1);
  }
}

seedRewards();

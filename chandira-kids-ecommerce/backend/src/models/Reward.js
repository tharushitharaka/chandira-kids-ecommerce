import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pointsRequired: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['discount', 'free_product', 'free_shipping', 'exclusive_access', 'gift'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed']
  },
  image: {
    type: String
  },
  tier: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'All'],
    default: 'All'
  },
  stock: {
    type: Number,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  terms: {
    type: String
  }
}, {
  timestamps: true
});

rewardSchema.index({ tier: 1, isActive: 1 });
rewardSchema.index({ pointsRequired: 1 });

export default mongoose.model('Reward', rewardSchema);

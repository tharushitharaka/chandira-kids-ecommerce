import mongoose from 'mongoose';

const loyaltySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 0
  },
  tier: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  history: [{
    type: {
      type: String,
      enum: ['earned', 'redeemed', 'expired', 'adjusted']
    },
    points: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  rewards: [{
    reward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward'
    },
    redeemedAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date
    }
  }]
}, {
  timestamps: true
});

// Tier thresholds
const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 1000,
  Gold: 5000,
  Platinum: 10000
};

// Method to update tier based on points
loyaltySchema.methods.updateTier = function() {
  const points = this.points;
  let newTier = 'Bronze';
  
  for (const [tier, threshold] of Object.entries(TIER_THRESHOLDS)) {
    if (points >= threshold) {
      newTier = tier;
    }
  }
  
  if (newTier !== this.tier) {
    this.tier = newTier;
    return true;
  }
  return false;
};

// Method to add points
loyaltySchema.methods.addPoints = function(points, description, orderId = null) {
  this.points += points;
  this.totalEarned += points;
  this.history.push({
    type: 'earned',
    points,
    description,
    orderId
  });
  this.updateTier();
};

// Method to redeem points
loyaltySchema.methods.redeemPoints = function(points, description, rewardId = null) {
  if (this.points < points) {
    throw new Error('Insufficient points');
  }
  
  this.points -= points;
  this.history.push({
    type: 'redeemed',
    points: -points,
    description,
    rewardId
  });
  this.updateTier();
};

export default mongoose.model('Loyalty', loyaltySchema);

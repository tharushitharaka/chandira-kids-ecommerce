import express from 'express';
import Loyalty from '../models/Loyalty.js';
import Reward from '../models/Reward.js';
import auth from '../middleware/auth-cjs.js';

const router = express.Router();

// Get user loyalty status
router.get('/status', auth, async (req, res) => {
  try {
    let loyalty = await Loyalty.findOne({ user: req.user._id });
    
    if (!loyalty) {
      // Create new loyalty account
      loyalty = new Loyalty({ user: req.user._id });
      await loyalty.save();
    }

    // Get tier progress
    const TIER_THRESHOLDS = {
      Bronze: 0,
      Silver: 1000,
      Gold: 5000,
      Platinum: 10000
    };

    const tierOrder = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    const currentIndex = tierOrder.indexOf(loyalty.tier);
    const nextTier = tierOrder[currentIndex + 1] || null;
    
    let tierProgress = null;
    if (nextTier) {
      tierProgress = {
        currentTier: loyalty.tier,
        nextTier,
        currentPoints: loyalty.points,
        requiredPoints: TIER_THRESHOLDS[nextTier]
      };
    }

    // Get available rewards
    const rewards = await Reward.find({
      isActive: true,
      $or: [
        { tier: 'All' },
        { tier: loyalty.tier }
      ],
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    }).sort({ pointsRequired: 1 });

    // Get recent history
    const history = loyalty.history
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20);

    res.json({
      points: loyalty.points,
      tier: loyalty.tier,
      tierProgress,
      totalEarned: loyalty.totalEarned,
      totalSpent: loyalty.totalSpent,
      rewards,
      history
    });
  } catch (error) {
    console.error('Error fetching loyalty status:', error);
    res.status(500).json({ message: 'Failed to fetch loyalty status' });
  }
});

// Get all rewards (public)
router.get('/rewards', async (req, res) => {
  try {
    const rewards = await Reward.find({
      isActive: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    }).sort({ pointsRequired: 1 });

    res.json({ rewards });
  } catch (error) {
    console.error('Error fetching rewards:', error);
    res.status(500).json({ message: 'Failed to fetch rewards' });
  }
});

// Redeem reward
router.post('/redeem', auth, async (req, res) => {
  try {
    const { rewardId } = req.body;
    
    const loyalty = await Loyalty.findOne({ user: req.user._id });
    if (!loyalty) {
      return res.status(404).json({ message: 'Loyalty account not found' });
    }

    const reward = await Reward.findById(rewardId);
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (!reward.isActive) {
      return res.status(400).json({ message: 'Reward is not active' });
    }

    if (reward.expiresAt && new Date(reward.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Reward has expired' });
    }

    if (reward.tier !== 'All' && reward.tier !== loyalty.tier) {
      return res.status(403).json({ message: 'Reward not available for your tier' });
    }

    if (loyalty.points < reward.pointsRequired) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    if (reward.stock !== null && reward.stock <= 0) {
      return res.status(400).json({ message: 'Reward out of stock' });
    }

    // Redeem the reward
    loyalty.redeemPoints(reward.pointsRequired, `Redeemed: ${reward.name}`, reward._id);
    loyalty.rewards.push({
      reward: reward._id,
      redeemedAt: new Date(),
      expiresAt: reward.expiresAt
    });

    // Update reward stock if applicable
    if (reward.stock !== null) {
      reward.stock -= 1;
      await reward.save();
    }

    await loyalty.save();

    res.json({ 
      message: 'Reward redeemed successfully',
      points: loyalty.points,
      reward
    });
  } catch (error) {
    console.error('Error redeeming reward:', error);
    res.status(500).json({ message: 'Failed to redeem reward' });
  }
});

// Add points (admin only)
router.post('/add-points', auth, async (req, res) => {
  try {
    const { userId, points, description, orderId } = req.body;
    
    // Only admin can add points to other users
    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const loyalty = await Loyalty.findOne({ user: userId });
    if (!loyalty) {
      return res.status(404).json({ message: 'Loyalty account not found' });
    }

    loyalty.addPoints(points, description, orderId);
    await loyalty.save();

    res.json({ 
      message: 'Points added successfully',
      points: loyalty.points 
    });
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).json({ message: 'Failed to add points' });
  }
});

// Get loyalty history
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const loyalty = await Loyalty.findOne({ user: req.user._id });
    if (!loyalty) {
      return res.status(404).json({ message: 'Loyalty account not found' });
    }

    const history = loyalty.history
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice((page - 1) * limit, page * limit);

    res.json({ 
      history,
      total: loyalty.history.length,
      currentPage: page,
      totalPages: Math.ceil(loyalty.history.length / limit)
    });
  } catch (error) {
    console.error('Error fetching loyalty history:', error);
    res.status(500).json({ message: 'Failed to fetch loyalty history' });
  }
});

export default router;

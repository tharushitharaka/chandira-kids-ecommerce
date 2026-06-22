import express from 'express';
import Newsletter from '../models/Newsletter.js';
import EmailCampaign from '../models/EmailCampaign.js';
import crypto from 'crypto';

const router = express.Router();

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email, source = 'footer', preferences } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.status === 'unsubscribed') {
        // Reactivate subscription
        subscriber.status = 'active';
        subscriber.unsubscribedAt = null;
        subscriber.preferences = { ...subscriber.preferences, ...preferences };
        await subscriber.save();
        return res.json({ message: 'Subscription reactivated successfully' });
      }
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Create new subscription
    subscriber = new Newsletter({
      email,
      source,
      preferences: preferences || {}
    });

    await subscriber.save();

    // TODO: Send welcome email using email service (SendGrid, Mailchimp, etc.)
    // await sendWelcomeEmail(email);

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    res.status(500).json({ message: 'Failed to subscribe to newsletter' });
  }
});

// Unsubscribe from newsletter (public)
router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const subscriber = await Newsletter.findOne({ unsubscribeToken: req.params.token });

    if (!subscriber) {
      return res.status(404).json({ message: 'Invalid unsubscribe link' });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.json({ message: 'Already unsubscribed' });
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ message: 'Failed to unsubscribe' });
  }
});

// Update preferences (authenticated)
router.put('/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    subscriber.preferences = { ...subscriber.preferences, ...preferences };
    await subscriber.save();

    res.json({ message: 'Preferences updated successfully', preferences: subscriber.preferences });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ message: 'Failed to update preferences' });
  }
});

// Get subscriber stats (admin)
router.get('/stats', async (req, res) => {
  try {
    const total = await Newsletter.countDocuments();
    const active = await Newsletter.countDocuments({ status: 'active' });
    const unsubscribed = await Newsletter.countDocuments({ status: 'unsubscribed' });
    const bounced = await Newsletter.countDocuments({ status: 'bounced' });

    const recent = await Newsletter.find({ status: 'active' })
      .sort({ subscribedAt: -1 })
      .limit(10);

    res.json({
      total,
      active,
      unsubscribed,
      bounced,
      recentSubscribers: recent
    });
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// Get all subscribers (admin)
router.get('/subscribers', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Newsletter.countDocuments(query);

    res.json({
      subscribers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
});

// Create email campaign (admin)
router.post('/campaigns', async (req, res) => {
  try {
    const campaign = new EmailCampaign(req.body);
    await campaign.save();
    res.status(201).json({ campaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Failed to create campaign' });
  }
});

// Get all campaigns (admin)
router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await EmailCampaign.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Failed to fetch campaigns' });
  }
});

// Send campaign (admin)
router.post('/campaigns/:id/send', async (req, res) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.status === 'sent') {
      return res.status(400).json({ message: 'Campaign already sent' });
    }

    // Get target audience
    let query = { status: 'active' };

    if (campaign.targetAudience === 'loyalty_tier' && campaign.targetTier) {
      // TODO: Filter by loyalty tier
      // This requires joining with Loyalty model
    }

    const subscribers = await Newsletter.find(query);
    campaign.recipientCount = subscribers.length;
    campaign.status = 'sent';
    campaign.sentAt = new Date();

    await campaign.save();

    // TODO: Send emails using email service
    // await sendCampaignEmails(campaign, subscribers);

    res.json({ message: 'Campaign sent successfully', campaign });
  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ message: 'Failed to send campaign' });
  }
});

export default router;

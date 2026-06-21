import express from 'express';
import User from '../models/User.js';
import WholesaleApplication from '../models/WholesaleApplication.js';
import { authorize, optionalAuth, protect } from '../middleware/auth.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

router.post('/apply', optionalAuth, async (req, res, next) => {
  try {
    const application = await WholesaleApplication.create({
      ...req.body,
      user: req.user?._id
    });
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Chandira Kids wholesale application',
      html: `<p>${application.businessName} submitted a wholesale application.</p>`
    });
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
});

router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    const applications = await WholesaleApplication.find().populate('user', 'name email').sort('-createdAt');
    res.json(applications);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const application = await WholesaleApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, reviewedBy: req.user._id, reviewedAt: new Date() },
      { new: true }
    );
    if (application?.status === 'approved' && application.user) {
      await User.findByIdAndUpdate(application.user, { role: 'wholesale' });
    }
    res.json(application);
  } catch (error) {
    next(error);
  }
});

export default router;

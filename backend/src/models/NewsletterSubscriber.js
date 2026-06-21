import mongoose from 'mongoose';
import validator from 'validator';

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, 'Please enter a valid email'] },
    name: String,
    source: { type: String, default: 'website' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);

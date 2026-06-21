import mongoose from 'mongoose';

const wholesaleApplicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    businessType: { type: String, required: true },
    monthlyVolume: String,
    websiteOrSocial: String,
    message: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('WholesaleApplication', wholesaleApplicationSchema);

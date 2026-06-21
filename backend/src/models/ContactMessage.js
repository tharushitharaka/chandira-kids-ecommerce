import mongoose from 'mongoose';
import validator from 'validator';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, validate: [validator.isEmail, 'Please enter a valid email'] },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);

import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['flash_sale', 'banner', 'featured_product'], required: true },
    description: String,
    image: String,
    discountPercent: { type: Number, min: 0, max: 100 },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    startsAt: Date,
    endsAt: Date,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Promotion', promotionSchema);

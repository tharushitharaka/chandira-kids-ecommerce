import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    image: String,
    size: String,
    color: String,
    sku: String,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    wholesale: { type: Boolean, default: false }
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    district: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'Sri Lanka' },
    phone: { type: String, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestEmail: String,
    items: [orderItemSchema],
    shippingAddress: addressSchema,
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'LKR' },
    couponCode: String,
    paymentMethod: { type: String, enum: ['cod', 'bank_transfer', 'card', 'stripe', 'paypal'], default: 'cod' },
    paymentReference: String,
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    notes: String
  },
  { timestamps: true }
);

orderSchema.pre('validate', function makeOrderNumber(next) {
  if (!this.orderNumber) {
    this.orderNumber = `CK-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);

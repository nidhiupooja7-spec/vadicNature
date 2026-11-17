import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        quantity: Number,
        price: Number
      }
    ],
    shippingAddress: {
      fullName: String,
      contact: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String
    },
    totalAmount: { type: Number, required: true },
    paymentInfo: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' }
    },
    shippingInfo: {
      bigshipOrderId: String,
      awbNumber: String,
      courierName: String,
      trackingStatus: { type: String, default: 'Order Placed' }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
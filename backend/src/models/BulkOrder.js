import mongoose from 'mongoose';

const bulkOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    orderQuantity: { type: Number, required: true },
    purpose: {
      type: String,
      enum: ['Resale', 'Gifting in Event/Function', 'Corporate Gifting'],
      required: true
    },
    message: { type: String, trim: true },
    status: { type: String, enum: ['Pending', 'Contacted', 'Closed'], default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('BulkOrder', bulkOrderSchema);
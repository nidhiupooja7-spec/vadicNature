import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String }, // e.g. "Pure Botanical Mogra Oil"
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Collections', 'Gifting'],
      default: 'Collections'
    },
    isNewArrival: { type: Boolean, default: false },
    oilNotes: {
      top: [String],
      heart: [String],
      base: [String]
    },
    volume: { type: String, default: '15ml' },
    price: { type: Number, required: true },
    stock: { type: Number, default: 50 },
    images: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
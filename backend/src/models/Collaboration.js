import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    socialMediaHandles: { type: String, required: true, trim: true },
    stateCity: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['New', 'Reviewed', 'Approved'], default: 'New' }
  },
  { timestamps: true }
);

export default mongoose.model('Collaboration', collaborationSchema);
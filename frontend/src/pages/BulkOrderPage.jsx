import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const BulkOrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    companyName: '',
    orderQuantity: '',
    purpose: 'Resale',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/inquiries/bulk-order', formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-vedic-green mb-3">Bulk & Corporate Orders</h1>
        <p className="text-xs uppercase tracking-widest text-vedic-muted">
          Partner with Vedic Nature for exclusive botanical oils and luxury gifting
        </p>
      </div>

      {submitted ? (
        <div className="bg-vedic-sand border border-vedic-gold/40 p-8 text-center">
          <h3 className="font-serif text-2xl text-vedic-green mb-2">Inquiry Received Successfully!</h3>
          <p className="text-sm text-vedic-muted">
            Thank you for reaching out. Our corporate team will get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-vedic-sand/40 border border-vedic-gold/30 p-8 space-y-6 shadow-sm">
          {error && <div className="p-3 bg-red-50 text-red-700 text-xs">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Email Address *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Country *</label>
              <input type="text" name="country" required value={formData.country} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Company Name *</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Order Quantity *</label>
              <input type="number" name="orderQuantity" required min="1" value={formData.orderQuantity} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Purpose *</label>
            <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm">
              <option value="Resale">Resale</option>
              <option value="Gifting in Event/Function">Gifting in Event/Function</option>
              <option value="Corporate Gifting">Corporate Gifting</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Message / Requirements</label>
            <textarea name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm"></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-vedic-green hover:bg-vedic-green-dark text-white py-3.5 text-xs uppercase tracking-[0.2em] transition cursor-pointer">
            {loading ? 'Submitting...' : 'Submit Bulk Order Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BulkOrderPage;
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const CollaborationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    socialMediaHandles: '',
    stateCity: '',
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
      await axiosInstance.post('/inquiries/collaboration', formData);
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
        <h1 className="font-serif text-4xl text-vedic-green mb-3">Influencer & Creator Collaboration</h1>
        <p className="text-xs uppercase tracking-widest text-vedic-muted leading-relaxed max-w-xl mx-auto">
          Thank you for your interest in collaborating with Vedic Nature. Please fill out the form below and we will get back to you shortly!!
        </p>
      </div>

      {submitted ? (
        <div className="bg-vedic-sand border border-vedic-gold/40 p-8 text-center">
          <h3 className="font-serif text-2xl text-vedic-green mb-2">Application Received!</h3>
          <p className="text-sm text-vedic-muted">
            Thank you for your interest in collaborating with Vedic Nature. Please fill out the form below and we will get back to you shortly!!
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
              <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">State / City *</label>
              <input type="text" name="stateCity" required value={formData.stateCity} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Social Media Handles (Instagram / YouTube) *</label>
            <input type="text" name="socialMediaHandles" required placeholder="@yourhandle (Instagram/YouTube)" value={formData.socialMediaHandles} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">Message / Bio *</label>
            <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm"></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-vedic-green hover:bg-vedic-green-dark text-white py-3.5 text-xs uppercase tracking-[0.2em] transition cursor-pointer">
            {loading ? 'Submitting...' : 'Submit Collaboration Request'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CollaborationPage;
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Search, Truck } from 'lucide-react';

const OrderTrackingPage = () => {
  const [awb, setAwb] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!awb.trim()) return;
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const { data } = await axiosInstance.get(`/shipping/track/${awb.trim()}`);
      setTrackingData(data.trackingData);
    } catch (err) {
      setError('Unable to fetch tracking details. Please check your AWB number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <Truck size={40} className="mx-auto text-vedic-green mb-3" strokeWidth={1.5} />
        <h1 className="font-serif text-4xl text-vedic-green mb-2">Order Tracking</h1>
        <p className="text-xs uppercase tracking-widest text-vedic-muted">
          Enter your Bigship AWB number to track your shipment
        </p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-vedic-muted" size={18} />
          <input
            type="text"
            placeholder="Enter AWB Number..."
            value={awb}
            onChange={(e) => setAwb(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-vedic-gold/40 bg-white text-sm focus:outline-hidden focus:border-vedic-green"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-vedic-green hover:bg-vedic-green-dark text-white px-6 py-3 text-xs uppercase tracking-widest transition cursor-pointer"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && <div className="p-4 bg-red-50 text-red-700 text-xs mb-4">{error}</div>}

      {trackingData && (
        <div className="bg-vedic-sand border border-vedic-gold/40 p-6 space-y-4">
          <h3 className="font-serif text-xl text-vedic-green border-b border-vedic-gold/20 pb-2">
            Shipment Status Details
          </h3>
          <pre className="text-xs text-vedic-charcoal bg-white p-4 overflow-x-auto border border-vedic-gold/20">
            {JSON.stringify(trackingData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
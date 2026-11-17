import { Link } from 'react-router-dom';

const PartnershipBanner = () => {
  return (
    <section className="bg-vedic-green text-vedic-cream py-16 px-4 mb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-vedic-gold mb-2">B2B & Partnerships</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">Looking for Bulk Orders or Collaborations?</h2>
          <p className="text-xs sm:text-sm text-vedic-cream/80 leading-relaxed mb-6">
            Partner with Vedic Nature for corporate gifting, event distribution, or join our exclusive creator community.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/bulk-orders"
              className="bg-vedic-gold hover:bg-white text-vedic-charcoal px-6 py-3 text-xs uppercase tracking-widest font-semibold transition"
            >
              Bulk Orders Form
            </Link>
            <Link
              to="/collaboration"
              className="border border-vedic-cream/60 hover:border-white px-6 py-3 text-xs uppercase tracking-widest transition"
            >
              Creator Collaboration
            </Link>
          </div>
        </div>

        <div className="bg-vedic-green-dark border border-vedic-gold/30 p-8 text-center">
          <h3 className="font-serif text-2xl text-vedic-gold mb-2">Track Your Shipment</h3>
          <p className="text-xs text-vedic-muted mb-6">
            Already placed an order? Use your Bigship AWB number for real-time tracking.
          </p>
          <Link
            to="/track-order"
            className="inline-block border border-vedic-gold text-vedic-gold hover:bg-vedic-gold hover:text-vedic-charcoal px-8 py-3 text-xs uppercase tracking-widest transition"
          >
            Track Order Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnershipBanner;
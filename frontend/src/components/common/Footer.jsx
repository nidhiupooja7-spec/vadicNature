import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-vedic-green-dark text-vedic-cream/90 border-t border-vedic-gold/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <img src="/assets/logo.webp" alt="Vedic Nature" className="h-16 mb-4 bg-white/95 rounded-full p-1" />
          <p className="text-xs text-vedic-cream/75 leading-relaxed">
            Pure botanical fragrance oils crafted with timeless Indian herbal wisdom and silent luxury.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-vedic-gold mb-4">Explore</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/collections" className="hover:text-vedic-gold">Collections / Shop</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-vedic-gold">New Arrivals</Link></li>
            <li><Link to="/gifting" className="hover:text-vedic-gold">Luxury Gifting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-vedic-gold mb-4">Partnerships</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/bulk-orders" className="hover:text-vedic-gold">Bulk & Corporate Orders</Link></li>
            <li><Link to="/collaboration" className="hover:text-vedic-gold">Influencer Collaboration</Link></li>
            <li><Link to="/track-order" className="hover:text-vedic-gold">Track Your Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-vedic-gold mb-4">Contact</h4>
          <p className="text-xs text-vedic-cream/75 leading-relaxed">
            Email: care@vedicnature.co.in<br />
            Mon – Sat: 10:00 AM – 7:00 PM IST
          </p>
        </div>
      </div>
      <div className="border-t border-vedic-gold/20 py-4 text-center text-[11px] text-vedic-cream/60">
        © {new Date().getFullYear()} Vedic Nature. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

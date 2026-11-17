import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';

const BULK_IMAGE = '/assets/products/bulk-orders-bottle.png';

const perks = [
  'Corporate gifting & event packs',
  'Wedding and return-gift chests',
  'Custom quantities for resellers',
];

const BulkOrdersSection = () => {
  return (
    <section className="relative overflow-hidden bg-vedic-cream py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14 lg:px-8">
        {/* Image */}
        <div className="group relative order-first overflow-hidden rounded-2xl border border-vedic-gold/25 bg-vedic-sand shadow-[0_12px_36px_-18px_rgba(31,51,39,0.45)] md:order-none">
          <img
            src={BULK_IMAGE}
            alt="Bulk botanical oil gift packs for corporate and wedding orders"
            loading="lazy"
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-vedic-green px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-vedic-cream shadow-sm">
            Bulk Orders
          </span>
        </div>

        {/* Copy */}
        <div className="text-center md:text-left">
          <div className="mb-3 flex items-center justify-center gap-2 text-vedic-gold md:justify-start">
            <Building2 size={16} strokeWidth={1.5} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em]">For Business & Events</p>
          </div>
          <h2 className="font-serif text-4xl italic leading-[1.15] text-vedic-green sm:text-5xl">
            Bulk Orders, Made Beautifully Simple
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-px w-12 bg-gradient-to-r from-transparent via-vedic-gold to-transparent md:mx-0 md:bg-gradient-to-r md:from-vedic-gold md:to-transparent"
          />
          <p className="mt-5 text-base leading-relaxed text-vedic-muted">
            Planning a wedding, corporate gift or resale order? Share your requirements and our team will
            prepare a curated quote for you.
          </p>

          <ul className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5 text-left md:mx-0">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-vedic-charcoal">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-vedic-gold" />
                {perk}
              </li>
            ))}
          </ul>

          <Link
            to="/bulk-orders"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-vedic-green px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-vedic-cream shadow-[0_8px_18px_-10px_rgba(31,51,39,0.7)] transition-colors hover:bg-vedic-green-dark"
          >
            Request a Bulk Quote
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BulkOrdersSection;

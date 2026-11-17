import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Gift } from 'lucide-react';

// `image` is null until a product photo is added. It will later come from the DB.
const oils = [
  {
    title: 'Jubilant',
    subtitle: 'Luxury of Nature · 10ml',
    price: '₹1,499',
    link: '/collections',
    tag: 'Bestseller',
    image: '/assets/products/jubilant-10ml.jpg',
    Icon: Droplets,
  },
  {
    title: 'Pure Tulsi',
    subtitle: 'Pure botanical tulsi oil',
    price: '₹2,199',
    link: '/new-arrivals',
    tag: 'New',
    image: '/assets/products/pure-tulsi.jpg',
    Icon: Droplets,
  },
  {
    title: 'Royal Vedic Gift Chest',
    subtitle: 'Assorted 5 botanical oil vials',
    price: '₹3,499',
    link: '/gifting',
    tag: 'Gift Set',
    image: '/assets/products/gift-chest.jpg',
    Icon: Gift,
  },
];

const SignatureOils = () => {
  return (
    <section className="relative overflow-hidden bg-vedic-sand/40 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center md:mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-vedic-gold">
            Curated Apothecary
          </p>
          <h2 className="mt-2 font-serif text-3xl italic text-vedic-green sm:text-4xl">
            Signature Botanical Oils
          </h2>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-12 bg-gradient-to-r from-transparent via-vedic-gold to-transparent"
          />
          <Link
            to="/collections"
            className="group mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-vedic-green transition-colors hover:text-vedic-gold"
          >
            View all oils
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* All products in one row: 3 on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {oils.map((item, index) => {
            const { Icon } = item;
            return (
              <article
                key={item.title}
                style={{ animationDelay: `${index * 120}ms` }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-vedic-gold/20 bg-white shadow-[0_4px_18px_-12px_rgba(31,51,39,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-18px_rgba(31,51,39,0.35)]"
              >
                {/* Image area: product photo when available, otherwise a styled placeholder */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-vedic-cream via-vedic-sand to-vedic-sand/70">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-6"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-vedic-gold/40 bg-white/60 text-vedic-green/70 transition-transform duration-700 group-hover:scale-110">
                        <Icon size={30} strokeWidth={1.25} />
                      </span>
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-vedic-green px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-vedic-cream shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-xl leading-snug text-vedic-charcoal transition-colors duration-300 group-hover:text-vedic-green sm:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-vedic-muted">{item.subtitle}</p>

                  <div className="mt-auto mt-5 flex items-center justify-between gap-3 border-t border-vedic-gold/15 pt-5">
                    <p className="font-serif text-2xl text-vedic-green">{item.price}</p>
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-2 rounded-full border border-vedic-green px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-vedic-green transition-all duration-300 hover:bg-vedic-green hover:text-vedic-cream"
                    >
                      Explore
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureOils;

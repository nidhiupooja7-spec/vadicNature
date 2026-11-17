import { Leaf, Sparkles, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    number: '01',
    icon: Leaf,
    subtitle: 'Pure Extraction',
    title: '100% Botanical Purity',
    description: 'Steam-distilled natural oils ethically harvested from pristine flora.',
  },
  {
    number: '02',
    icon: Sparkles,
    subtitle: 'Skin-First Elixir',
    title: 'Alcohol-Free Luxury',
    description: 'Concentrated, long-lasting formulations crafted without synthetics.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    subtitle: 'Curated Experiences',
    title: 'Bespoke Gifting & Bulk',
    description: 'Hand-packed luxury chests tailored for weddings and corporate events.',
  },
];

const BrandPillars = () => {
  return (
    <section className="relative overflow-hidden bg-vedic-cream pt-6 pb-10 md:pt-8 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex flex-col items-center text-center md:mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-vedic-gold">
            The Vedic Promise
          </span>
          <h2 className="mt-2 font-serif text-2xl italic text-vedic-green sm:text-3xl">
            Rooted in purity, crafted for luxury
          </h2>
          <span aria-hidden="true" className="mt-4 h-px w-12 bg-gradient-to-r from-transparent via-vedic-gold to-transparent" />
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.number}
                style={{ animationDelay: `${index * 120}ms` }}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-vedic-gold/20 bg-white/70 p-5 shadow-[0_4px_16px_-10px_rgba(31,51,39,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-vedic-gold/50 hover:bg-white hover:shadow-[0_18px_36px_-16px_rgba(31,51,39,0.3)] sm:p-6"
              >
                {/* Corner number watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 font-serif text-3xl italic text-vedic-gold/15 transition-colors duration-500 group-hover:text-vedic-gold/30"
                >
                  {item.number}
                </span>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-vedic-green text-vedic-cream shadow-[0_6px_14px_-8px_rgba(31,51,39,0.6)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                  <Icon size={20} strokeWidth={1.5} />
                </span>

                <div className="relative min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-vedic-gold">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-1.5 font-serif text-lg leading-snug text-vedic-charcoal transition-colors duration-300 group-hover:text-vedic-green sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-vedic-muted sm:text-[13px]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom gold accent that grows on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-25 rounded-full bg-gradient-to-r from-vedic-gold to-vedic-gold/20 transition-transform duration-500 group-hover:scale-x-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandPillars;

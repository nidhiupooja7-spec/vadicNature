import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Verified Unsplash photo, used for the third slide until a dedicated image is added.
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=1920';

const ROSE_IMAGE = '/assets/hero/rose-imperiale.jpg';
const PETITS_AMIS_IMAGE = '/assets/hero/petits-amis.jpg';

const slides = [
  {
    eyebrow: 'L’Essence De La Nature',
    title: 'The Silent Luxury of Scent',
    subtitle: 'Steam-distilled botanical oils sourced from pristine Indian flora.',
    cta: 'Discover Collection',
    link: '/collections',
    image: ROSE_IMAGE,
    overlay: 'from-black/60 via-black/40 to-vedic-green-dark/90'
  },
  {
    eyebrow: 'New Arrivals',
    title: 'Night-Blooming Florals',
    subtitle: 'Pure Mogra & Jasmine, crafted for quiet evenings.',
    cta: 'Shop New Arrivals',
    link: '/new-arrivals',
    image: PETITS_AMIS_IMAGE,
    overlay: 'from-vedic-charcoal/75 via-black/50 to-vedic-green-dark/85'
  },
  {
    eyebrow: 'Luxury Gifting',
    title: 'Curated Gift Chests',
    subtitle: 'Assorted botanical vials for weddings, events and partnerships.',
    cta: 'Explore Gifting',
    link: '/gifting',
    image: FALLBACK_IMAGE,
    overlay: 'from-vedic-green/70 via-black/40 to-vedic-green-dark/90'
  }
];

const INTERVAL_MS = 5000;

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden text-vedic-cream">
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 flex items-center justify-center text-center px-6 transition-opacity duration-700 ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Slow zoom (Ken Burns) on the active slide */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform ease-out ${
              i === index ? 'scale-110 duration-[7000ms]' : 'scale-100 duration-700'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${slide.overlay}`} />
          <div className="relative max-w-2xl">
            <p
              className={`text-[11px] uppercase tracking-[0.35em] text-vedic-gold mb-4 ${
                i === index ? 'hero-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              {slide.eyebrow}
            </p>
            <h2
              className={`font-serif text-4xl sm:text-6xl italic leading-tight mb-4 ${
                i === index ? 'hero-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.25s' }}
            >
              {slide.title}
            </h2>
            <p
              className={`text-sm sm:text-base text-vedic-cream/85 font-light mb-8 ${
                i === index ? 'hero-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              {slide.subtitle}
            </p>
            <Link
              to={slide.link}
              tabIndex={i === index ? 0 : -1}
              style={{ animationDelay: '0.55s' }}
              className={`inline-block border border-vedic-gold/60 hover:bg-vedic-gold/20 hover:border-vedic-gold text-vedic-cream px-8 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                i === index ? 'hero-fade-up' : 'opacity-0'
              }`}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-full transition cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-full transition cursor-pointer"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === index ? 'w-6 bg-vedic-gold' : 'w-2 bg-vedic-cream/50 hover:bg-vedic-cream/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

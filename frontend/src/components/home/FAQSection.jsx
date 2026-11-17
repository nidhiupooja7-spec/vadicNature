import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

// Placeholder questions. Replace the answers with confirmed store policies.
const faqs = [
  {
    question: 'Are your oils 100% natural?',
    answer:
      'Our oils are steam-distilled from botanical sources and are free from synthetic fragrances and alcohol.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Use the Order Tracking page with your order details to see the current status of your shipment.',
    link: { to: '/track-order', label: 'Track an order' },
  },
  {
    question: 'Do you offer bulk orders for weddings and events?',
    answer:
      'Yes. We create curated gift chests and bulk packs for weddings, corporate events and partnerships.',
    link: { to: '/bulk-orders', label: 'Explore bulk orders' },
  },
  {
    question: 'Can I choose a custom gift set?',
    answer:
      'Our gifting collection includes ready-made chests. For custom requirements, reach out through the Collaboration page.',
    link: { to: '/collaboration', label: 'Contact us' },
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-vedic-cream py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.6fr] md:gap-14 lg:px-8">
        {/* Intro */}
        <div className="text-center md:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-vedic-gold">
            Questions & Answers
          </p>
          <h2 className="mt-3 font-serif text-3xl italic leading-tight text-vedic-green sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-px w-12 bg-gradient-to-r from-transparent via-vedic-gold to-transparent md:mx-0 md:bg-gradient-to-r md:from-vedic-gold md:to-transparent"
          />
          <p className="mt-5 text-sm leading-relaxed text-vedic-muted">
            Can't find what you're looking for? Our team is happy to help.
          </p>
          <Link
            to="/collaboration"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-vedic-green px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-vedic-cream shadow-[0_8px_18px_-10px_rgba(31,51,39,0.7)] transition-colors hover:bg-vedic-green-dark"
          >
            <MessageCircleQuestion size={16} strokeWidth={1.75} />
            Contact us
          </Link>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-vedic-gold/20 overflow-hidden rounded-2xl border border-vedic-gold/20 bg-white shadow-[0_4px_18px_-12px_rgba(31,51,39,0.35)]">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-vedic-sand/40 sm:px-7 cursor-pointer"
                  >
                    <span
                      className={`font-serif text-lg leading-snug transition-colors duration-300 sm:text-xl ${
                        isOpen ? 'text-vedic-green' : 'text-vedic-charcoal group-hover:text-vedic-green'
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'rotate-180 border-vedic-green bg-vedic-green text-vedic-cream'
                          : 'border-vedic-gold/40 text-vedic-green'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-7">
                      <p className="text-sm leading-relaxed text-vedic-muted">{item.answer}</p>
                      {item.link && (
                        <Link
                          to={item.link.to}
                          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-vedic-green underline-offset-4 hover:text-vedic-gold hover:underline"
                        >
                          {item.link.label} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

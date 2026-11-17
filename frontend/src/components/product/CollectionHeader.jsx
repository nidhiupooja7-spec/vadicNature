import { LayoutGrid, Grid3X3, ChevronDown } from 'lucide-react';

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const ViewButton = ({ active, onClick, label, Icon }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={active}
    className={`flex h-8 w-8 items-center justify-center border transition ${
      active
        ? 'border-vedic-green bg-vedic-green text-vedic-cream'
        : 'border-vedic-gold/40 text-vedic-muted hover:border-vedic-green hover:text-vedic-green'
    }`}
  >
    <Icon size={15} strokeWidth={1.5} />
  </button>
);

const CollectionHeader = ({ title, count, sortBy, onSortChange, columns, onColumnsChange }) => {
  return (
    <header className="border-b border-vedic-gold/25 bg-white">
      {/* Title block */}
      <div
        className="relative flex h-[600px] items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero/collection-header.png')" }}
      >
        <div className="absolute inset-0 bg-vedic-green-dark/55" aria-hidden="true"></div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-vedic-gold">
            Vedic Nature Apothecary
          </p>
          <h1 className="mt-3 font-serif text-4xl italic text-white sm:text-6xl">{title}</h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-px w-14 bg-gradient-to-r from-transparent via-vedic-gold to-transparent"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-t border-vedic-gold/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-vedic-muted">
              <span className="font-semibold text-vedic-charcoal">{count}</span>{' '}
              {count === 1 ? 'Product' : 'Products'}
            </p>

            <div className="hidden items-center gap-1.5 sm:flex">
              <ViewButton
                active={columns === 2}
                onClick={() => onColumnsChange(2)}
                label="Show 2 columns"
                Icon={LayoutGrid}
              />
              <ViewButton
                active={columns === 3}
                onClick={() => onColumnsChange(3)}
                label="Show 3 columns"
                Icon={Grid3X3}
              />
            </div>
          </div>

          <label className="relative flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-vedic-muted">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="cursor-pointer appearance-none border border-vedic-gold/40 bg-white py-2 pl-3 pr-9 text-[11px] uppercase tracking-[0.15em] text-vedic-charcoal transition hover:border-vedic-green focus:border-vedic-green focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-vedic-muted"
              />
            </div>
          </label>
        </div>
      </div>
    </header>
  );
};

export default CollectionHeader;

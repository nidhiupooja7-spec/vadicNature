import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import CollectionHeader from '../components/product/CollectionHeader';
import ProductCard from '../components/product/ProductCard';

// Temporary sample items shown when the API returns no products yet.
// These use perfume images already in the project. Remove once real products exist.
const PLACEHOLDER_PRODUCTS = [
  { _id: 'demo-1', name: 'Night Queen', volume: '10 ml', images: ['/assets/products/perfume/night-queen-1.jpg'] },
  { _id: 'demo-2', name: 'Vrindavan Flower', volume: '10 ml', images: ['/assets/products/perfume/vrindavan-flower-1.jpg'] },
  { _id: 'demo-3', name: 'Mysore Sandal', volume: '10 ml', images: ['/assets/products/perfume/mysore-sandal.jpg'] },
  { _id: 'demo-4', name: 'Real Patchouli', volume: '10 ml', images: ['/assets/products/perfume/real-patchouli.jpg'] },
  { _id: 'demo-5', name: 'Night Queen', volume: '10 ml', images: ['/assets/products/perfume/night-queen-2.jpg'] },
  { _id: 'demo-6', name: 'Vrindavan Flower', volume: '10 ml', images: ['/assets/products/perfume/vrindavan-flower-2.jpg'] },
];

const sortProducts = (items, sortBy) => {
  const list = [...items];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    case 'price-desc':
      return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    case 'name-asc':
      return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    default:
      return list;
  }
};

const CollectionsPage = ({ title = 'Our Collections', category = '', isNewArrival = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [columns, setColumns] = useState(3);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (isNewArrival) params.isNewArrival = true;

        const { data } = await axiosInstance.get('/products', { params });
        setProducts(data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, isNewArrival]);

  // Use placeholders until real products come from the API
  const items = products.length > 0 ? products : PLACEHOLDER_PRODUCTS;
  const usingPlaceholders = products.length === 0;

  const sortedProducts = useMemo(() => sortProducts(items, sortBy), [items, sortBy]);

  // Show two rows first, then "View more" reveals the rest
  const perRow = columns === 2 ? 2 : 3;
  const initialCount = perRow * 2;
  const hasMore = sortedProducts.length > initialCount;
  const visibleProducts = showAll ? sortedProducts : sortedProducts.slice(0, initialCount);

  const gridClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3';

  return (
    <div className="bg-white">
      <CollectionHeader
        title={title}
        count={sortedProducts.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        columns={columns}
        onColumnsChange={(c) => {
          setColumns(c);
          setShowAll(false);
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {loading ? (
          <p className="py-20 text-center text-sm text-vedic-muted">Loading botanical collection...</p>
        ) : (
          <>
            <div className={`grid gap-x-6 gap-y-12 ${gridClass}`}>
              {visibleProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll((s) => !s)}
                  className="border border-vedic-green px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-vedic-green transition hover:bg-vedic-green hover:text-vedic-cream"
                >
                  {showAll ? 'Show Less' : 'View More'}
                </button>
              </div>
            )}

            {usingPlaceholders && (
              <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-vedic-muted">
                Sample products shown until new items are added
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ShareButton from '../components/common/ShareButton';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-sm">Loading oil details...</div>;
  if (!product) return <div className="py-20 text-center text-sm">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="bg-vedic-sand border border-vedic-gold/30 p-8 flex items-center justify-center">
        <img
          src={product.images?.[0] || '/assets/logo.webp'}
          alt={product.name}
          className="max-h-[420px] object-contain"
        />
      </div>

      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-vedic-gold">{product.category} • {product.volume}</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-vedic-green">{product.name}</h1>
        <p className="text-2xl font-medium text-vedic-charcoal">₹{product.price}</p>
        <p className="text-sm text-vedic-muted leading-relaxed">{product.description}</p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => navigate('/checkout', { state: { product } })}
            className="bg-vedic-green hover:bg-vedic-green-dark text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition cursor-pointer"
          >
            Buy Now
          </button>

          {/* Client Requirement: Share Button on Product Details Page */}
          <ShareButton productTitle={product.name} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const image = product.images?.[0] || '/assets/logo.webp';

  const isDemo = String(product._id).startsWith('demo-');
  const Wrapper = isDemo ? 'div' : Link;
  const wrapperProps = isDemo ? {} : { to: `/product/${product._id}` };

  return (
    <Wrapper {...wrapperProps} className="group block text-center">
      <div className="relative aspect-square overflow-hidden bg-vedic-sand">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-vedic-charcoal group-hover:text-vedic-green">
        {product.name}
      </h3>
      {product.volume && (
        <p className="mt-1 text-[10px] uppercase tracking-widest text-vedic-gold">{product.volume}</p>
      )}
      {product.price != null && product.price !== '' && (
        <p className="mt-1 text-sm text-vedic-muted">₹{product.price}</p>
      )}
    </Wrapper>
  );
};

export default ProductCard;

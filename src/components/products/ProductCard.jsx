import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Star, Check } from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product, onQuickView }) {
  const { formatAmount, getProductPrice, getProductOriginalPrice } = useRegion();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const price = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col bg-white border border-[#EFE8DF] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#DE6E4B]/40 shadow-luxury-card hover:shadow-luxury-card-hover transition-all duration-300 relative">
      
      {/* Product Image Area */}
      <div className="relative aspect-[4/4.2] bg-[#FAF6F0] p-4 flex items-center justify-center overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
          {product.isBestseller && (
            <span className="bg-[#DE6E4B] text-white text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="bg-[#FCEEE6] text-[#DE6E4B] text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#DE6E4B]/20">
              New Arrival
            </span>
          )}
          {product.discountPercent > 0 && !product.isBestseller && !product.isNew && (
            <span className="bg-[#251D1B] text-[#DFC066] text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-xs ${
            isWishlisted
              ? 'bg-[#DE6E4B] text-white'
              : 'bg-white/90 hover:bg-white text-neutral-600 hover:text-[#DE6E4B]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-sans text-[15px] sm:text-[16px] font-bold text-[#251D1B] hover:text-[#DE6E4B] transition-colors line-clamp-1 tracking-tight"
          >
            {product.name}
          </Link>

          {/* Subtitle / Key Benefit */}
          <p className="text-[12px] sm:text-[13px] text-[#7C726F] line-clamp-1 mt-0.5 font-sans">
            {product.shortDesc || product.category}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-[#F5A623]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[11px] text-[#7C726F] font-sans">
              ({product.reviewCount || 126})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart (+) Button */}
        <div className="pt-3 mt-2 flex items-center justify-between border-t border-[#F6F1EB]">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] sm:text-[17px] font-bold text-[#251D1B] tabular-nums font-sans">
              {formatAmount(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-[#9E9390] line-through tabular-nums font-sans">
                {formatAmount(originalPrice)}
              </span>
            )}
          </div>

          {/* Terracotta + Button from Reference Image */}
          <button
            onClick={handleQuickAdd}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-[#DE6E4B] hover:bg-[#C85633] text-white hover:scale-105 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
            title="Add to shopping bag"
          >
            {justAdded ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}

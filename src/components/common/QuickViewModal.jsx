import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const { formatAmount, getProductPrice, getProductOriginalPrice } = useRegion();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState(
    product.sizes?.[0] || product.shades?.[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const price = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-luxury-lg max-w-3xl w-full overflow-hidden border border-[#EFE8DF] z-10 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#7C726F] hover:text-[#251D1B] shadow-xs transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gallery / Image Left */}
        <div className="md:w-1/2 bg-[#FAF6F0] p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#EFE8DF]">
          <div className="w-full aspect-[4/4.2] rounded-2xl overflow-hidden shadow-2xs relative bg-white flex items-center justify-center p-4">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border transition-all p-1 bg-white ${
                    activeImageIndex === idx ? 'border-[#DE6E4B] shadow-xs ring-1 ring-[#DE6E4B]' : 'border-[#EFE8DF] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-[10.5px] uppercase tracking-wider text-[#7C726F] font-sans font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DE6E4B]" />
            <span>Guaranteed Authentic Formulation</span>
          </div>
        </div>

        {/* Details Right */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider font-bold text-[#DE6E4B] mb-1.5 font-sans">
              {product.brand} · {product.category}
            </div>

            <h2 className="font-serif text-2xl font-normal text-[#251D1B] leading-snug tracking-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-xs font-sans">
              <div className="flex items-center text-[#F5A623]">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold text-[#251D1B] tabular-nums">{product.rating}</span>
              <span className="text-[#9E9390]">·</span>
              <span className="text-[#7C726F]">{product.reviewCount} client reviews</span>
              <span className="text-[#9E9390]">·</span>
              <span className="text-emerald-700 font-bold">In Stock</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-sans text-2xl font-bold text-[#251D1B]">
                {formatAmount(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="font-sans text-sm text-[#9E9390] line-through">
                  {formatAmount(originalPrice)}
                </span>
              )}
            </div>

            {/* Short Desc */}
            <p className="mt-3 text-xs text-[#7C726F] leading-relaxed font-sans">
              {product.shortDesc || product.description}
            </p>

            {/* Shade Selector if any */}
            {product.shades && product.shades.length > 0 && (
              <div className="mt-5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#251D1B] block mb-2 font-sans">
                  Selected Shade: <span className="normal-case font-bold text-[#DE6E4B]">{selectedVariant}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedVariant(shade.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all font-sans ${
                        selectedVariant === shade.name
                          ? 'border-[#DE6E4B] bg-[#FCEEE6] text-[#DE6E4B] font-bold shadow-xs'
                          : 'border-[#EFE8DF] hover:border-[#DE6E4B] text-[#251D1B] bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="truncate max-w-[120px]">{shade.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector if any */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#251D1B] block mb-2 font-sans">
                  Flacon Volume:
                </span>
                <div className="flex gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedVariant(sz)}
                      className={`px-3.5 py-1.5 rounded-full border text-xs transition-all font-sans font-semibold ${
                        selectedVariant === sz
                          ? 'border-[#DE6E4B] bg-[#DE6E4B] text-white'
                          : 'border-[#EFE8DF] hover:border-[#DE6E4B] text-[#251D1B] bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#7C726F] font-sans">Quantity:</span>
              <div className="flex items-center border border-[#EFE8DF] rounded-full bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-[#7C726F] hover:text-[#251D1B]"
                >
                  -
                </button>
                <span className="font-sans text-xs px-3 font-bold text-[#251D1B]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-[#7C726F] hover:text-[#251D1B]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#EFE8DF] flex flex-col gap-2.5">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#DE6E4B] hover:bg-[#C85633] text-white text-xs uppercase tracking-wider font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-full border transition-colors ${
                  isWishlisted
                    ? 'border-[#DE6E4B] bg-[#DE6E4B] text-white'
                    : 'border-[#EFE8DF] text-[#7C726F] hover:text-[#DE6E4B] bg-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-center text-xs text-[#7C726F] hover:text-[#DE6E4B] font-bold transition-colors pt-1 font-sans"
            >
              View Full Product Specifications & Rituals →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

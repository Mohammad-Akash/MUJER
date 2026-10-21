import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useRegion } from '../context/RegionContext.jsx';

export default function Wishlist() {
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatAmount, getProductPrice } = useRegion();
  const { openQuickView } = useOutletContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="border-b border-[#EBE4DC] pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#8C1C40] block mb-1">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
            My Desired Formulations ({wishlistProducts.length})
          </h1>
        </div>
        <Link to="/shop" className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#3E0B1B] hover:text-[#540F25] transition-colors">
          Explore All Products →
        </Link>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white p-16 text-center border border-[#EBE4DC] max-w-lg mx-auto space-y-4 shadow-luxury-sm">
          <div className="w-16 h-16 border border-[#EBE4DC] bg-[#FAF8F5] flex items-center justify-center mx-auto text-[#3E0B1B]">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-neutral-900">
            Your sanctuary is currently unadorned
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto font-sans">
            Click the heart icon on any formulation to save items to your personal beauty sanctuary.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10.5px] uppercase tracking-[0.22em] font-medium transition-all shadow-luxury-sm hover:shadow-luxury-md"
            >
              Discover Formulations
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => {
            const price = getProductPrice(product);
            return (
              <div
                key={product.id}
                className="bg-white border border-[#EBE4DC] overflow-hidden flex flex-col justify-between hover:shadow-luxury-hover hover:border-[#C5A059]/60 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/4.5] bg-[#FAF8F5]">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-neutral-600 hover:text-rose-600 transition-colors shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C1C40] block mb-1">
                      {product.brand} · {product.category}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-serif text-base font-normal text-neutral-900 hover:text-[#540F25] transition-colors line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </Link>
                    <p className="font-mono text-base font-bold text-neutral-950 mt-2">
                      {formatAmount(price)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10px] uppercase tracking-[0.2em] font-medium py-3 flex items-center justify-center gap-1.5 transition-colors shadow-luxury-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Shopping Bag</span>
                  </button>
                  <button
                    onClick={() => openQuickView(product)}
                    className="w-full bg-[#FAF8F5] hover:bg-neutral-100 text-neutral-800 text-[10.5px] uppercase tracking-wider font-medium py-2.5 border border-[#EBE4DC] transition-colors"
                  >
                    Quick Inspect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

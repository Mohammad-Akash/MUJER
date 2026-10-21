import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useRegion } from '../context/RegionContext.jsx';
import { products } from '../data/products.js';

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    moveToCartFromSaved,
    removeSavedItem,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    meetsFreeShipping,
    remainingForFreeShipping,
    freeShippingProgress
  } = useCart();

  const { formatAmount, region } = useRegion();
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState({ error: '', success: '' });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoFeedback({ error: '', success: '' });
    const res = applyCouponCode(promoCodeInput);
    if (!res.success) {
      setPromoFeedback({ error: res.message, success: '' });
    } else {
      setPromoFeedback({ error: '', success: 'Privilege code successfully applied!' });
      setPromoCodeInput('');
    }
  };

  const recommendedItems = products
    .filter(p => !items.some(i => i.id === p.id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="border-b border-[#EBE4DC] pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#8C1C40] block mb-1">
            Maison Cart
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
            Your Selected Formulations ({items.length})
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#3E0B1B] hover:text-[#540F25] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Exploring</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-16 text-center border border-[#EBE4DC] max-w-xl mx-auto space-y-4 shadow-luxury-sm">
          <div className="w-16 h-16 border border-[#EBE4DC] bg-[#FAF8F5] flex items-center justify-center mx-auto text-[#3E0B1B]">
            <Sparkles className="w-7 h-7 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-neutral-900">
            Your shopping bag is currently vacant
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto font-sans">
            Explore our curated collections of botanical elixirs, couture lipsticks, and rare perfumes.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10.5px] font-medium uppercase tracking-[0.22em] transition-all shadow-luxury-sm hover:shadow-luxury-md"
            >
              Explore The Boutique
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bag Items (Col 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Meter */}
            <div className="bg-[#FAF4ED] p-4.5 border border-[#EBE2D5] text-xs shadow-luxury-sm">
              <div className="flex items-center justify-between font-medium text-neutral-800 mb-2 font-sans">
                <span className="flex items-center gap-2 text-[#3E0B1B]">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  {meetsFreeShipping ? (
                    <span className="font-medium text-emerald-800">Complimentary climate-controlled delivery unlocked!</span>
                  ) : (
                    <span>
                      Add <strong className="font-mono text-[#3E0B1B] font-bold">{formatAmount(remainingForFreeShipping)}</strong> more to receive free delivery
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-neutral-600">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#EAE2D8] h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#3E0B1B] to-[#C5A059] h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Table/Cards */}
            <div className="bg-white border border-[#EBE4DC] divide-y divide-[#EBE4DC] shadow-luxury-sm">
              {items.map((item) => {
                const unitPrice = item.prices ? (item.prices[region.code] ?? item.prices.PKR) : 0;
                const lineTotal = unitPrice * item.quantity;
                return (
                  <div key={`${item.id}-${item.variant}`} className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover bg-[#FAF8F5] shrink-0 border border-[#EBE4DC]"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C1C40] block font-sans">
                          {item.brand}
                        </span>
                        <Link
                          to={`/product/${item.id}`}
                          className="font-serif text-base font-normal text-neutral-900 hover:text-[#540F25] transition-colors leading-snug"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-neutral-500 mt-1 font-sans">
                          Allocation: <span className="font-medium text-neutral-800">{item.variant}</span>
                        </p>
                        <p className="font-mono text-xs text-neutral-600 mt-0.5">
                          {formatAmount(unitPrice)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EBE4DC]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#EBE4DC] bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs px-3 font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="font-mono text-base font-bold text-neutral-950 min-w-[90px] text-right">
                        {formatAmount(lineTotal)}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => saveForLaterItem(item.id, item.variant)}
                          className="p-2 text-neutral-400 hover:text-[#3E0B1B] transition-colors"
                          title="Save for Later"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.variant)}
                          className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saved for Later Section */}
            {savedForLater.length > 0 && (
              <div className="bg-white p-6 border border-[#EBE4DC] space-y-4 mt-8 shadow-luxury-sm">
                <h3 className="font-serif text-lg font-medium text-neutral-900 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#C5A059]" />
                  <span>Saved for Later ({savedForLater.length})</span>
                </h3>
                <div className="divide-y divide-[#EBE4DC]">
                  {savedForLater.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border border-[#EBE4DC]" />
                        <div>
                          <p className="font-serif text-sm font-medium text-neutral-900">{item.name}</p>
                          <p className="text-xs text-neutral-500 font-sans">{item.variant}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => moveToCartFromSaved(item.id, item.variant)}
                          className="px-4 py-2 bg-[#3E0B1B] text-white text-[10.5px] uppercase tracking-wider font-medium hover:bg-[#540F25] transition-colors"
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => removeSavedItem(item.id, item.variant)}
                          className="text-neutral-400 hover:text-rose-600 p-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Column (Col 4) */}
          <div className="lg:col-span-4 bg-white p-7 border border-[#EBE4DC] shadow-luxury-md space-y-6">
            <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-[#EBE4DC] pb-3">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div>
              <span className="text-[10.5px] uppercase tracking-[0.16em] font-medium text-neutral-700 block mb-2 font-sans">
                Privilege Promo Code
              </span>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#FDF2F4] border border-[#F7D6DE] text-xs text-[#3E0B1B] font-sans">
                  <span className="font-semibold">Code: {appliedCoupon.code} ({appliedCoupon.discountPercent}% off)</span>
                  <button onClick={removeCoupon} className="text-neutral-500 hover:text-rose-600 font-bold uppercase text-[10px] tracking-wider">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="e.g. WELCOME15"
                    className="flex-1 text-xs border border-[#EBE4DC] px-3 py-2.5 uppercase font-mono tracking-wider focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10.5px] font-medium uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoFeedback.error && (
                <p className="text-[11px] text-rose-600 mt-1 font-sans">{promoFeedback.error}</p>
              )}
              {promoFeedback.success && (
                <p className="text-[11px] text-emerald-600 mt-1 font-sans">{promoFeedback.success}</p>
              )}
            </div>

            {/* Calculation Lines */}
            <div className="space-y-2.5 text-xs text-neutral-600 pt-3 border-t border-[#EBE4DC] font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-neutral-900">{formatAmount(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#8C1C40] font-medium">
                  <span>Privilege Discount</span>
                  <span className="font-mono">-{formatAmount(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Climate-Insured Courier</span>
                <span className="font-mono font-medium text-neutral-900">
                  {shippingFee === 0 ? 'Complimentary' : formatAmount(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EBE4DC] flex justify-between text-base font-semibold text-neutral-900">
                <span>Total Due</span>
                <span className="font-mono text-xl text-[#3E0B1B] font-bold">
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10.5px] uppercase tracking-[0.22em] font-medium py-4 flex items-center justify-center gap-2 shadow-luxury-sm hover:shadow-luxury-md transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-[#EBE4DC] space-y-2.5 text-[11px] text-neutral-500 font-sans">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Complimentary luxury velvet gift pouch included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Trackable express dispatch with thermal regulation</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Recommended Formulations Carousel/Strip */}
      {recommendedItems.length > 0 && (
        <section className="pt-10 border-t border-[#EBE4DC] space-y-4">
          <h3 className="font-serif text-2xl font-normal text-neutral-900">
            Recommended Additions to Your Ritual
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recommendedItems.map((prod) => (
              <div key={prod.id} className="bg-white p-4.5 border border-[#EBE4DC] shadow-luxury-sm flex items-center gap-4 hover:border-[#C5A059] transition-all">
                <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 object-cover border border-[#EBE4DC]" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-medium text-neutral-900 truncate">{prod.name}</p>
                  <p className="font-mono text-xs font-bold text-[#3E0B1B] mt-0.5">
                    {formatAmount(prod.prices[region.code])}
                  </p>
                  <Link
                    to={`/product/${prod.id}`}
                    className="text-[10.5px] text-[#3E0B1B] hover:text-[#540F25] font-semibold uppercase tracking-wider block mt-1"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

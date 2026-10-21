import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Bookmark } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useRegion } from '../../context/RegionContext.jsx';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    remainingForFreeShipping,
    freeShippingProgress,
    meetsFreeShipping
  } = useCart();

  const { formatAmount, region } = useRegion();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setPromoError('');
    const res = applyCouponCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F5] shadow-luxury-lg flex flex-col z-50 border-l border-[#EBE4DC] animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-[#EBE4DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-xl font-medium text-neutral-900 tracking-wide">
              Your Shopping Bag
            </h3>
            <span className="text-[11px] font-mono bg-[#FAF8F5] px-2 py-0.5 rounded-xs text-neutral-600 border border-[#EBE4DC]">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF4ED] p-4 border-b border-[#EBE4DC] text-xs">
          <div className="flex items-center justify-between font-medium text-neutral-800 mb-2">
            <span className="flex items-center gap-1.5 text-[#5A0E24]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              {meetsFreeShipping ? (
                <span className="font-semibold">Complimentary Climate Delivery Unlocked!</span>
              ) : (
                <span>
                  Add <strong className="font-mono text-[#5A0E24]">{formatAmount(remainingForFreeShipping)}</strong> more for free delivery
                </span>
              )}
            </span>
            <span className="text-neutral-500 font-mono text-[11px]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#EAE2D8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#5A0E24] to-[#C5A059] h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <div className="w-16 h-16 rounded-full bg-white border border-[#EBE4DC] flex items-center justify-center mb-4 text-[#5A0E24] shadow-luxury-sm">
                <Sparkles className="w-7 h-7 text-[#C5A059]" />
              </div>
              <p className="font-serif text-2xl font-normal text-neutral-900">Your bag is vacant</p>
              <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed">
                Explore our couture lipsticks, active botanical serums, and rare perfumes to begin your ritual.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="mt-6 px-7 py-3 bg-[#420B1C] hover:bg-[#5A0E24] text-white text-[11px] uppercase tracking-[0.2em] font-medium rounded-xs transition-colors shadow-luxury-sm"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.prices ? (item.prices[region.code] ?? item.prices.PKR) : 0;
              return (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="bg-white p-4 rounded-xs border border-[#EBE4DC] flex gap-4 relative shadow-luxury-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xs bg-[#FAF8F5] border border-[#EBE4DC] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.id}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-serif text-[15px] font-semibold text-neutral-900 hover:text-[#5A0E24] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id, item.variant)}
                          className="text-neutral-400 hover:text-rose-700 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {item.variant}
                      </p>
                      <p className="font-mono text-xs font-bold text-neutral-900 mt-1">
                        {formatAmount(unitPrice)}
                      </p>
                    </div>

                    {/* Stepper + Save for Later */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                      <div className="flex items-center border border-[#EBE4DC] rounded-xs bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-600 hover:text-neutral-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-semibold px-2 text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-600 hover:text-neutral-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => saveForLaterItem(item.id, item.variant)}
                        className="text-[11px] text-neutral-500 hover:text-[#5A0E24] flex items-center gap-1 transition-colors"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save for later</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Order Totals */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EBE4DC] shadow-luxury-md space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#FDF2F4] border border-[#F7D6DE] p-2.5 rounded-xs text-xs">
                  <div className="flex items-center gap-1.5 text-[#5A0E24] font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Privilège <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-500 hover:text-rose-700 font-semibold text-[11px] ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Voucher code (e.g. WELCOME15)"
                    className="flex-1 text-xs border border-[#EBE4DC] rounded-xs px-3.5 py-2 uppercase font-mono tracking-wider focus:outline-none focus:border-[#5A0E24] bg-[#FAF8F5]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 hover:bg-[#5A0E24] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-neutral-900">{formatAmount(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#8B263E] font-medium">
                  <span>Privilege Savings</span>
                  <span className="font-mono">-{formatAmount(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Courier</span>
                <span className="font-mono font-medium text-neutral-900">
                  {shippingFee === 0 ? 'Complimentary' : formatAmount(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EBE4DC] flex justify-between text-sm font-semibold text-neutral-900">
                <span>Total Amount</span>
                <span className="font-mono text-lg text-[#5A0E24] font-bold">
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#420B1C] hover:bg-[#5A0E24] text-white text-[11px] uppercase tracking-[0.2em] font-medium py-3.5 rounded-xs flex items-center justify-center gap-2 shadow-luxury-sm transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="w-full bg-[#FAF8F5] hover:bg-neutral-100 text-neutral-800 text-[11px] uppercase tracking-wider font-medium py-2.5 rounded-xs border border-[#EBE4DC] transition-colors"
              >
                Review Full Bag & Saved Formulations
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Complimentary insured shipping & temperature guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Tag, 
  ArrowRight, 
  ShoppingBag,
  Percent,
  ShieldCheck
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { offers, bundles, promoCodes } from '../data/offers.js';
import { products } from '../data/products.js';
import { useRegion } from '../context/RegionContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Offers() {
  const { openQuickView } = useOutletContext();
  const { formatAmount, regionCode } = useRegion();
  const { addToCart, applyCouponCode } = useCart();
  const { addToast } = useToast();

  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    addToast(`Privilege Code "${code}" applied to your shopping bag.`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleAddBundle = (bundle) => {
    const matchingProd = products.find(p => p.id === (bundle.id === 'bundle-masterpiece-coffret' ? 'coffret-prestige-holiday-collection' : 'lumiere-elixir-serum')) || products[0];
    addToCart(matchingProd, 1);
    addToast(`Added "${bundle.title}" to your shopping bag.`);
  };

  const offerProducts = products.filter(p => p.isOffer || p.discountPercent > 0);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Campaign Banner */}
      <section className="bg-[#1B040B] text-[#FAF8F5] py-16 border-b border-[#3E0B1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Maison Privileges' }]} />
          
          <div className="mt-6 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3E0B1B] text-[#DFC066] text-[10px] font-semibold uppercase tracking-[0.22em] border border-[#C5A059]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Cosmétique Privilège</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              {offers.hero.title}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-xl">
              {offers.hero.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCopyCode(offers.hero.code)}
                className="bg-[#DFC066] hover:bg-[#C5A059] text-neutral-950 text-[10.5px] font-medium uppercase tracking-[0.2em] px-7 py-3.5 flex items-center gap-2 transition-all shadow-luxury-sm hover:shadow-luxury-md"
              >
                {copiedCode === offers.hero.code ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === offers.hero.code ? 'Code Applied to Bag' : `Apply Privilege Code: ${offers.hero.code}`}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Promo Code Voucher Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-1 mb-10">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40]">
            Maison Vouchers
          </span>
          <h2 className="font-serif text-3xl font-normal text-neutral-900">
            Active Privilege Codes
          </h2>
          <p className="text-xs text-neutral-500 font-sans">
            Apply any certified voucher code to redeem private seasonal savings instantly at checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {promoCodes.map((promo) => {
            const minSpend = regionCode === 'PKR' ? promo.minOrderPKR : promo.minOrderAED;
            return (
              <div
                key={promo.code}
                className="bg-white p-6 border border-[#EBE4DC] hover:border-[#C5A059] transition-all flex flex-col justify-between space-y-4 shadow-luxury-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#3E0B1B] bg-[#FDF2F4] px-3 py-1 border border-[#F7D6DE]">
                      {promo.code}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8C1C40] bg-[#FDF2F4] px-2.5 py-0.5 uppercase tracking-wider">
                      {promo.discountPercent ? `${promo.discountPercent}% OFF` : 'COMPLIMENTARY'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 mt-4 leading-relaxed font-sans">
                    {promo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBE4DC] flex items-center justify-between">
                  <span className="text-[10.5px] text-neutral-400 font-sans">
                    Min order: {formatAmount(minSpend)}
                  </span>
                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    className="text-[11px] font-medium text-[#540F25] hover:text-[#8C1C40] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Applied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Curated Ritual Bundles */}
      <section className="bg-[#FAF4ED] py-16 border-y border-[#EBE2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40] block mb-1">
              Synergistic Formulations
            </span>
            <h2 className="font-serif text-3xl font-normal text-neutral-900">
              Curated Gift & Ritual Bundles
            </h2>
            <p className="text-xs text-neutral-600 mt-1 font-sans">
              Harmoniously paired formulations bundled with exclusive seasonal price privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bundles.map((bundle) => {
              const bundlePrice = bundle.prices[regionCode] || bundle.prices.PKR;
              const bundleOriginalPrice = bundle.originalPrices[regionCode] || bundle.originalPrices.PKR;
              return (
                <div
                  key={bundle.id}
                  className="bg-white border border-[#EBE4DC] overflow-hidden shadow-luxury-sm hover:shadow-luxury-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-neutral-100 overflow-hidden relative">
                    <img 
                      src={bundle.image} 
                      alt={bundle.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1B040B] text-[#DFC066] text-[9px] uppercase font-medium tracking-[0.22em]">
                      {bundle.badge}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-neutral-900 leading-snug">
                        {bundle.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 font-sans">{bundle.subtitle}</p>

                      <ul className="mt-4 space-y-1.5 text-xs text-neutral-600 font-sans">
                        {bundle.items.map((it, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#540F25] shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#EBE4DC] flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xl font-bold text-[#3E0B1B] block">
                          {formatAmount(bundlePrice)}
                        </span>
                        <span className="font-mono text-xs text-neutral-400 line-through">
                          {formatAmount(bundleOriginalPrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddBundle(bundle)}
                        className="px-4 py-2.5 bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10px] font-medium uppercase tracking-[0.18em] flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bundle</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Discounted Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-[#EBE4DC] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40] block mb-1">
              Seasonal Markdowns
            </span>
            <h2 className="font-serif text-3xl font-normal text-neutral-900">
              Formulations with Privileged Pricing
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-[11px] font-semibold text-[#540F25] hover:text-[#8C1C40] uppercase tracking-[0.2em] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

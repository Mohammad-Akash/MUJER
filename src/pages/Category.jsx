import React, { useMemo } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Category() {
  const { slug } = useParams();
  const { openQuickView } = useOutletContext();

  const currentCategory = useMemo(() => {
    return categories.find(c => c.slug === slug) || {
      slug: slug || 'skincare',
      name: (slug || 'Category').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      headline: 'Refined Formulations for Haute Care',
      description: 'Discover specialized formulas, luxurious pigments, and restorative botanical actives created for lasting radiance.',
      heroImage: '/src/assets/images/product_serum_elixir_1792565254298.jpg',
      tags: ['Bestsellers', 'New Arrivals', 'Signature']
    };
  }, [slug]);

  // Find products belonging to this category or subcategory
  const categoryProducts = useMemo(() => {
    const s = slug ? slug.toLowerCase() : '';
    return products.filter(p => {
      const cat = p.category.toLowerCase().replace(/\s+/g, '-');
      const subcat = p.subcategory ? p.subcategory.toLowerCase().replace(/\s+/g, '-') : '';
      return cat === s || subcat === s || p.category.toLowerCase() === s;
    });
  }, [slug]);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Category Editorial Hero Banner */}
      <section className="relative bg-[#1B040B] text-[#FAF8F5] overflow-hidden border-b border-[#3E0B1B]">
        <div className="absolute inset-0 opacity-25">
          <img
            src={currentCategory.heroImage}
            alt={currentCategory.name}
            className="w-full h-full object-cover object-center filter blur-xs"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B040B] via-[#290812]/90 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-xl space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Shop', to: '/shop' },
                { label: currentCategory.name }
              ]}
            />

            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-semibold text-[#DFC066]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>MUJER Salon de Beauté</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              {currentCategory.headline}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {currentCategory.description}
            </p>

            {/* Sub-tags */}
            {currentCategory.tags && currentCategory.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans">
                {currentCategory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 text-neutral-200 border border-white/15 text-[11px] uppercase tracking-wider font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#EBE4DC] pb-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
              {currentCategory.name} Formulations
            </h2>
            <p className="text-xs text-neutral-500 mt-1 font-sans">
              Showing {categoryProducts.length} certified items
            </p>
          </div>

          <Link
            to="/shop"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3E0B1B] hover:text-[#540F25] flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-none border border-[#EBE4DC] shadow-luxury-sm">
            <h3 className="font-serif text-xl font-normal text-neutral-800">
              No items currently listed in this subcategory.
            </h3>
            <p className="text-xs text-neutral-500 mt-2 font-sans">
              Explore our full catalog to discover available formulas.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-4 px-6 py-3 bg-[#3E0B1B] text-white text-[10.5px] uppercase tracking-[0.2em] font-medium"
            >
              Browse Complete Boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

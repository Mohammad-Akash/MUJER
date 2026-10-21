import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Droplet, 
  Sun, 
  Feather, 
  Clock, 
  ChevronRight,
  Heart,
  Search,
  SlidersHorizontal,
  Flame,
  Award,
  Sparkle
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard.jsx';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { customerReviews } from '../data/reviews.js';
import { blogPosts } from '../data/blogPosts.js';
import { useRegion } from '../context/RegionContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Home() {
  const { openQuickView } = useOutletContext();
  const { formatAmount } = useRegion();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductTab, setActiveProductTab] = useState('bestsellers');
  const [selectedConcern, setSelectedConcern] = useState('radiance');

  // Hero carousel slide state
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'NEW ARRIVALS',
      title: 'Glow Naturally, ✨',
      subtitle: 'Shine Beautifully',
      description: 'Explore our premium beauty collection crafted with rare Grasse botanicals for a radiant you.',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
      image: '/src/assets/images/hero_mujer_campaign_1792565253091.jpg',
      featuredProduct: 'Lumière Radiance Botanical Elixir'
    },
    {
      badge: 'LIMITED EDITION',
      title: 'Le Coffret Prestige, 🎁',
      subtitle: 'The Holiday Masterpiece',
      description: 'An opulent coffret of our most coveted formulations nestled in silk and gold foil.',
      ctaText: 'Explore Coffret',
      ctaLink: '/offers',
      image: '/src/assets/images/luxury_gift_set_1792567974413.jpg',
      featuredProduct: 'Holiday Masterpiece Coffret'
    }
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const bestsellers = products.filter(p => p.isBestseller);
  const newArrivals = products.filter(p => p.isNew);
  const trending = products.filter(p => p.isTrending);

  const displayedProducts = 
    activeProductTab === 'bestsellers' 
      ? bestsellers 
      : activeProductTab === 'new' 
      ? newArrivals 
      : trending;

  const skinConcerns = [
    {
      id: 'radiance',
      name: 'Dullness & Radiance',
      icon: Sun,
      description: 'Awaken an incandescent glass-skin glow with triple-action active Vitamin C and wild rose hydrosol.',
      recommendedProductId: 'lumiere-elixir-serum',
      productName: 'Lumière Radiance Botanical Elixir'
    },
    {
      id: 'hydration',
      name: 'Dehydration & Barrier',
      icon: Droplet,
      description: 'Reinforce the lipid barrier with five skin-identical ceramides and copper tripeptides.',
      recommendedProductId: 'cellular-repair-creme-veloutee',
      productName: 'Crème Veloutée Cellular Repair Night Moisturizer'
    },
    {
      id: 'uvdefense',
      name: 'Sun Defense & Photo-Aging',
      icon: Feather,
      description: '100% invisible mineral SPF 50+ protection with zero white cast and velvet primer finish.',
      recommendedProductId: 'sun-shield-invisible-spf50',
      productName: 'Voile Solaire Mineral Sunscreen SPF 50+'
    }
  ];

  const currentConcern = skinConcerns.find(c => c.id === selectedConcern) || skinConcerns[0];
  const recommendedProduct = products.find(p => p.id === currentConcern.recommendedProductId);

  // Quick category circles from reference image
  const quickCategories = [
    { name: 'Skincare', slug: 'skincare', icon: '🧴', count: '4 Items', image: '/src/assets/images/product_serum_elixir_1792565254298.jpg' },
    { name: 'Makeup', slug: 'makeup', icon: '💄', count: '3 Items', image: '/src/assets/images/product_burgundy_lipstick_1792565254455.jpg' },
    { name: 'Fragrance', slug: 'fragrances', icon: '✨', count: 'Rare Parfums', image: '/src/assets/images/product_rose_perfume_1792565254757.jpg' },
    { name: 'Haircare', slug: 'haircare', icon: '🌿', count: 'Elixirs', image: '/src/assets/images/product_hair_oil_1792567957625.jpg' },
    { name: 'Tools', slug: 'beauty-accessories', icon: '🪄', count: 'Gua Sha', image: '/src/assets/images/product_moisturizer_jar_1792567925040.jpg' },
    { name: 'Offers', slug: 'offers', icon: '🏷️', count: 'Up to 30%', isSpecial: true }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* 1. Top Greeting & Clean Pill Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#DE6E4B] uppercase tracking-wider">
              <span>Hello, Glow Muse!</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#251D1B] tracking-tight font-serif mt-0.5">
              Discover Beauty
            </h1>
            <p className="text-xs sm:text-sm text-[#7C726F]">
              Premium luxury skincare & formulations, crafted for you
            </p>
          </div>

          {/* Clean Pill Search Bar matching reference image */}
          <div className="w-full md:max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#9E9390] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, shades, notes..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#EFE8DF] shadow-xs text-xs sm:text-sm text-[#251D1B] placeholder-[#9E9390] focus:outline-none focus:border-[#DE6E4B] transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="ml-2 w-11 h-11 rounded-full bg-white border border-[#EFE8DF] shadow-xs flex items-center justify-center text-[#251D1B] hover:text-[#DE6E4B] hover:border-[#DE6E4B] transition-colors shrink-0"
                aria-label="Open catalog filters"
                title="View All Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Hero Campaign Banner (Directly inspired by Reference Design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#FAF0E6] via-[#F8E7DE] to-[#F5DFD4] border border-[#EEDBD0] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-luxury-md">
          
          {/* Subtle Decorative Ambient Background Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FFF5EE]/60 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FCEEE6]/80 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#EEDBD0] text-[10px] sm:text-[11px] font-bold text-[#DE6E4B] uppercase tracking-wider shadow-xs">
                <span>{heroSlides[activeSlide].badge}</span>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#251D1B] leading-tight tracking-tight">
                  {heroSlides[activeSlide].title} <br />
                  <span className="font-serif italic text-[#C85633]">
                    {heroSlides[activeSlide].subtitle}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#7C726F] max-w-md pt-2 leading-relaxed">
                  {heroSlides[activeSlide].description}
                </p>
              </div>

              {/* Call to Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={heroSlides[activeSlide].ctaLink}
                  className="inline-flex items-center gap-2.5 bg-[#DE6E4B] hover:bg-[#C85633] text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>{heroSlides[activeSlide].ctaText}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                <Link
                  to="/offers"
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[#251D1B] text-xs sm:text-sm font-semibold px-5 py-3.5 rounded-full border border-[#EEDBD0] shadow-xs transition-colors"
                >
                  <span>Privileges</span>
                </Link>
              </div>

            </div>

            {/* Right Product Hero Arrangement */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury-lg border border-white/60 bg-white/40 backdrop-blur-xs">
                <img
                  src={heroSlides[activeSlide].image}
                  alt={heroSlides[activeSlide].title}
                  className="w-full h-full object-cover object-center transition-all duration-700"
                />
                
                {/* Floating Micro Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-[#EFE8DF] shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wider font-bold text-[#DE6E4B]">Maison Spotlight</p>
                    <p className="text-xs font-bold text-[#251D1B] truncate">{heroSlides[activeSlide].featuredProduct}</p>
                  </div>
                  <Link
                    to="/shop"
                    className="text-[11px] font-bold text-[#DE6E4B] hover:text-[#C85633] flex items-center gap-1"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 pt-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? 'w-6 h-2 bg-[#DE6E4B]'
                    : 'w-2 h-2 bg-[#D9C8BE] hover:bg-[#C5B3A8]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Circular Category Navigation Row (Matching Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {quickCategories.map((cat) => {
            const linkHref = cat.isSpecial ? '/offers' : `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                to={linkHref}
                className="group flex flex-col items-center gap-2 shrink-0 min-w-[70px] sm:min-w-[84px] text-center"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F9EFE7] group-hover:bg-[#F3E2D5] border border-[#EFE8DF] group-hover:border-[#DE6E4B]/40 flex items-center justify-center shadow-xs transition-all duration-200 group-hover:scale-105 overflow-hidden">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl">{cat.icon}</span>
                  )}
                  {cat.isSpecial && (
                    <span className="absolute -top-1 -right-1 bg-[#DE6E4B] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                      Sale
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-[#251D1B] group-hover:text-[#DE6E4B] transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Best Sellers Section (Matching Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & View All */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#251D1B] tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs text-[#7C726F] hidden sm:block mt-0.5">
              The formulations most beloved by our patrons across Pakistan & GCC
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#DE6E4B] hover:text-[#C85633] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </section>

      {/* 5. Special Offer Banner (Matching Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-[#FAF0E6] via-[#F8E7DE] to-[#F5DFD4] border border-[#EEDBD0] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-luxury-md">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Offer Details */}
            <div className="md:col-span-7 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 border border-[#EEDBD0] text-[10px] sm:text-[11px] font-bold text-[#DE6E4B] uppercase tracking-wider shadow-xs">
                Special Offer
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#251D1B] leading-tight">
                Up to <span className="font-bold text-[#DE6E4B]">30% Off</span> <br />
                <span className="italic">On selected beauty essentials</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#7C726F] max-w-md">
                Experience our curated sets, luxury elixirs, and bespoke palettes with privileged seasonal pricing.
              </p>

              <div className="pt-2">
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-2 bg-[#DE6E4B] hover:bg-[#C85633] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <span>Grab Now</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Badge & Photo */}
            <div className="md:col-span-5 flex items-center justify-end gap-4 relative">
              <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-md border border-white">
                <img
                  src="/src/assets/images/luxury_gift_set_1792567974413.jpg"
                  alt="Special Offer Beauty Essentials"
                  className="w-full h-full object-cover"
                />
                
                {/* 30% Off Badge from Reference Image */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 border border-[#EFE8DF] shadow-md text-center">
                  <span className="text-lg sm:text-xl font-extrabold text-[#DE6E4B] block leading-none font-sans">
                    30%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C726F]">
                    OFF
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Curated Category Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#DE6E4B] block mb-1">
              Curated Universes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#251D1B] tracking-tight font-serif">
              Explore Our Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#DE6E4B] hover:text-[#C85633] flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Skincare', slug: 'skincare', image: '/src/assets/images/product_serum_elixir_1792565254298.jpg', count: '4 Items' },
            { name: 'Makeup', slug: 'makeup', image: '/src/assets/images/product_burgundy_lipstick_1792565254455.jpg', count: '3 Items' },
            { name: 'Fragrances', slug: 'fragrances', image: '/src/assets/images/product_rose_perfume_1792565254757.jpg', count: 'Rare Parfums' },
            { name: 'Haircare', slug: 'haircare', image: '/src/assets/images/product_hair_oil_1792567957625.jpg', count: 'Hair Nectars' },
            { name: 'Body Care', slug: 'body-care', image: '/src/assets/images/product_moisturizer_jar_1792567925040.jpg', count: 'Velvet Soufflés' },
            { name: 'Gift Coffrets', slug: 'offers', image: '/src/assets/images/luxury_gift_set_1792567974413.jpg', count: 'Masterpieces' }
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={cat.slug === 'offers' ? '/offers' : `/category/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-luxury-card hover:shadow-luxury-card-hover border border-[#EFE8DF] hover:border-[#DE6E4B]/40 transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] text-[#DFC066] font-bold uppercase tracking-wider">{cat.count}</span>
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#F8E7DE] transition-colors mt-0.5">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Interactive Skin Concern Routine Finder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl sm:rounded-[2rem] border border-[#EFE8DF] p-6 sm:p-10 shadow-luxury-card">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#DE6E4B] block mb-1">
              Bespoke Diagnostic
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#251D1B] tracking-tight font-serif">
              Targeted Skincare Solutions
            </h2>
            <p className="text-xs sm:text-sm text-[#7C726F] mt-1">
              Select your primary complexion goal to receive our apothecary prescription
            </p>
          </div>

          {/* Concern Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {skinConcerns.map((concern) => {
              const Icon = concern.icon;
              const isSelected = selectedConcern === concern.id;
              return (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#DE6E4B] text-white shadow-sm'
                      : 'bg-[#FAF6F0] text-[#7C726F] hover:text-[#251D1B] border border-[#EFE8DF]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{concern.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Diagnostic Recommendation Box */}
          {recommendedProduct && (
            <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border border-[#EFE8DF] flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-white p-2 border border-[#EFE8DF] shrink-0">
                <img
                  src={recommendedProduct.images[0]}
                  alt={recommendedProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DE6E4B]">
                  Recommended Prescription
                </span>
                <h3 className="font-serif text-xl font-bold text-[#251D1B]">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#7C726F] max-w-xl">
                  {currentConcern.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <span className="text-base font-bold text-[#251D1B]">
                    {formatAmount(recommendedProduct.prices.PKR)}
                  </span>
                  <Link
                    to={`/product/${recommendedProduct.id}`}
                    className="inline-flex items-center gap-1.5 bg-[#251D1B] hover:bg-[#DE6E4B] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. Trust & Heritage Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#EFE8DF] shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#DE6E4B] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#251D1B]">Grasse Floral Absolutes</h4>
              <p className="text-xs text-[#7C726F] mt-1 leading-relaxed">
                Rare Centifolia rose and jasmine absolutes harvested at first light in Provence.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EFE8DF] shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#DE6E4B] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#251D1B]">Biocompatible Actives</h4>
              <p className="text-xs text-[#7C726F] mt-1 leading-relaxed">
                Triple-weight hyaluronic acid and stabilized Vitamin C for deep cellular nourishment.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EFE8DF] shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#DE6E4B] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#251D1B]">Climate-Shielded Transit</h4>
              <p className="text-xs text-[#7C726F] mt-1 leading-relaxed">
                Thermal insulated packaging preserving active efficacy across Pakistan & UAE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#DE6E4B] block mb-1">
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#251D1B] tracking-tight font-serif">
            Loved by Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-[#EFE8DF] shadow-luxury-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#F5A623] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#251D1B] leading-relaxed italic font-serif">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F6F1EB] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#251D1B]">{review.author}</p>
                  <p className="text-[10px] text-[#7C726F]">{review.location}</p>
                </div>
                <span className="text-[10px] font-semibold text-[#DE6E4B] bg-[#FCEEE6] px-2 py-0.5 rounded-full">
                  Verified Patron
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

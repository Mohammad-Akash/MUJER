import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  Share2,
  ChevronRight,
  Droplet
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { products } from '../data/products.js';
import { customerReviews } from '../data/reviews.js';
import { useRegion } from '../context/RegionContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openQuickView } = useOutletContext();
  const { formatAmount, getProductPrice, getProductOriginalPrice, regionCode } = useRegion();
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = products.find(p => p.id === id) || products[0];

  // Component state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.sizes?.[0] || product.shades?.[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviewsList, setReviewsList] = useState(customerReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', title: '' });

  // Reset variant and image when product id changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedVariant(product.sizes?.[0] || product.shades?.[0]?.name || 'Standard');
    setQuantity(1);
    // Add to recently viewed in localStorage
    try {
      const recents = JSON.parse(localStorage.getItem('mujer_recently_viewed') || '[]');
      const filtered = [product.id, ...recents.filter(x => x !== product.id)].slice(0, 6);
      localStorage.setItem('mujer_recently_viewed', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  }, [id, product]);

  const price = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      addToast('Please provide your name and review details.', 'error');
      return;
    }
    const createdReview = {
      id: `rev-${Date.now()}`,
      author: newReview.name,
      location: regionCode === 'PKR' ? 'Karachi, Pakistan' : 'Dubai, UAE',
      rating: Number(newReview.rating),
      date: 'Just now',
      productName: product.name,
      title: newReview.title || 'Exceptional Formulation',
      comment: newReview.comment,
      verifiedPurchase: true
    };
    setReviewsList([createdReview, ...reviewsList]);
    setShowReviewForm(false);
    setNewReview({ name: '', rating: 5, comment: '', title: '' });
    addToast('Thank you! Your verified client review has been recorded.');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Frequently bought together partner
  const bundlePartner = products.find(p => p.id !== product.id) || products[1];
  const bundleCombinedPrice = price + getProductPrice(bundlePartner);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          { label: product.category, to: `/category/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
          { label: product.name }
        ]}
      />

      {/* Main Contiguous Purchase Module & Sticky Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="relative aspect-[4/4.5] rounded-none overflow-hidden bg-[#FAF8F5] border border-[#EBE4DC] shadow-luxury-md cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
            title="Click to toggle enlarged perspective"
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`}
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-[#3E0B1B] text-white text-[9px] uppercase font-medium tracking-[0.22em] px-3.5 py-1.5 shadow-sm">
                Maison Icon
              </span>
            )}
            <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-neutral-700 shadow-luxury-sm border border-[#EBE4DC]">
              {isZoomed ? 'Minimize' : 'Enlarge Perspective'}
            </span>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-20 h-20 rounded-xs overflow-hidden border transition-all ${
                    activeImageIndex === idx ? 'border-[#5A0E24] shadow-luxury-sm' : 'border-[#EBE4DC] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Authenticity and Purity Banner */}
          <div className="grid grid-cols-3 gap-3 p-5 bg-white rounded-xs border border-[#EBE4DC] text-center text-xs text-neutral-600 shadow-luxury-sm">
            <div>
              <p className="font-semibold text-neutral-900 font-serif text-sm">100% Authentic</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">Direct from Maison</p>
            </div>
            <div className="border-x border-[#EBE4DC]">
              <p className="font-semibold text-neutral-900 font-serif text-sm">Climate Sealed</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">Zero Degradation</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 font-serif text-sm">Complimentary 14D</p>
              <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">Doorstep Return</p>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-xs border border-[#EBE4DC] shadow-luxury-md space-y-6 lg:sticky lg:top-28">
          
          <div>
            <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.2em] text-neutral-500 mb-1.5">
              <span className="font-semibold text-[#8B263E]">
                {product.brand}
              </span>
              <span className="font-mono text-[11px] text-neutral-400">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-neutral-900 leading-snug tracking-tight text-balance">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-2 mt-2.5 text-xs">
              <div className="flex items-center text-[#DFC066]">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-semibold text-neutral-800 tabular-nums">{product.rating}</span>
              <span className="text-neutral-400">·</span>
              <a href="#reviews" className="text-neutral-500 underline hover:text-[#5A0E24]">
                {reviewsList.length} verified reviews
              </a>
              <span className="text-neutral-400">·</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                In Stock ({product.stockCount} available)
              </span>
            </div>
          </div>

            {/* Pricing */}
          <div className="pt-2 pb-4 border-y border-[#EFE8DF] flex items-baseline gap-3">
            <span className="font-sans text-3xl font-bold text-[#251D1B]">
              {formatAmount(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="font-sans text-base text-[#9E9390] line-through">
                  {formatAmount(originalPrice)}
                </span>
                <span className="bg-[#FCEEE6] text-[#DE6E4B] text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#DE6E4B]/20">
                  Save {product.discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Shade Selection (if makeup) */}
          {product.shades && product.shades.length > 0 && (
            <div>
              <div className="flex justify-between text-[11px] uppercase tracking-wider font-semibold text-[#251D1B] mb-2.5">
                <span>Selected Shade:</span>
                <span className="font-bold text-[#DE6E4B] normal-case">{selectedVariant}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.shades.map((shade) => (
                  <button
                    key={shade.name}
                    onClick={() => setSelectedVariant(shade.name)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs transition-all ${
                      selectedVariant === shade.name
                        ? 'border-[#DE6E4B] bg-[#FCEEE6] text-[#DE6E4B] font-bold shadow-xs'
                        : 'border-[#EFE8DF] hover:border-[#DE6E4B] text-[#251D1B] bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span className="truncate max-w-[130px]">{shade.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Volume Selection (if skincare or fragrances) */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#251D1B] block mb-2">
                Flacon Size / Volume:
              </span>
              <div className="flex gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedVariant(sz)}
                    className={`px-4 py-2 rounded-full border text-xs transition-all font-semibold ${
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

          {/* Quantity & Buy Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#7C726F]">Quantity:</span>
              <div className="flex items-center border border-[#EFE8DF] rounded-full bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-[#7C726F] hover:text-[#251D1B] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-sans text-xs px-4 font-bold text-[#251D1B]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-[#7C726F] hover:text-[#251D1B] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
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
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-[#251D1B] hover:bg-black text-white text-xs uppercase tracking-wider font-bold py-3.5 rounded-full transition-colors shadow-sm"
            >
              Express Buy Now
            </button>
          </div>

          {/* Micro Perks */}
          <div className="pt-4 border-t border-[#EFE8DF] space-y-2 text-xs text-[#7C726F]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#DE6E4B] shrink-0" />
              <span>Complimentary insured shipping on this formulation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#DE6E4B] shrink-0" />
              <span>14-day doorstep return and exchange privilege</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#DE6E4B] shrink-0" />
              <span>Includes 2 complimentary luxury skincare miniatures</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Description, Ingredients, Benefits, Ritual / How to Use, Shipping, Authenticity */}
      <section className="bg-white rounded-3xl border border-[#EFE8DF] overflow-hidden shadow-luxury-card">
        {/* Tab Header */}
        <div className="flex overflow-x-auto border-b border-[#EFE8DF] bg-[#FAF6F0]">
          {[
            { id: 'description', label: 'Description' },
            { id: 'benefits', label: 'Key Benefits' },
            { id: 'ingredients', label: 'Ingredients & Purity' },
            { id: 'howToUse', label: 'Ritual & Ceremony' },
            { id: 'authenticity', label: 'Authenticity Guarantee' },
            { id: 'shipping', label: 'Shipping & Delivery' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-4 text-[11px] font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#DE6E4B] text-[#DE6E4B] bg-white'
                  : 'border-transparent text-[#7C726F] hover:text-[#251D1B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-8 sm:p-10 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-base sm:text-lg font-serif font-medium text-neutral-900 leading-snug">
                {product.shortDesc}
              </p>
              <p>{product.description}</p>
              <p className="pt-2 text-neutral-600">
                <strong className="text-neutral-900">Skin Type Compatibility:</strong> {product.skinType}
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4 max-w-3xl">
              <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                Documented Dermal Benefits
              </h4>
              <ul className="space-y-2.5">
                {product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#5A0E24] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4 max-w-3xl">
              <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                Complete Formulation Transparency
              </h4>
              <p className="font-mono text-xs text-neutral-600 bg-[#FAF8F5] p-5 rounded-xs border border-[#EBE4DC] leading-relaxed">
                {product.ingredients}
              </p>
              <p className="text-xs text-neutral-500 italic">
                Formulated without mineral oils, parabens, formaldehydes, phthalates, and synthetic sulfates. Dermatologically tested.
              </p>
            </div>
          )}

          {activeTab === 'howToUse' && (
            <div className="space-y-4 max-w-3xl">
              <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                The Recommended Beauty Ceremony
              </h4>
              <p>{product.howToUse}</p>
            </div>
          )}

          {activeTab === 'authenticity' && (
            <div className="space-y-4 max-w-3xl">
              <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                Maison MUJER Seal of Authenticity
              </h4>
              <p>{product.authenticity}</p>
              <p>Every bottle and compact carries an individual laser-engraved batch serial code verified against our central quality register.</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-3xl">
              <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                Climate-Shielded Delivery
              </h4>
              <p>{product.shippingInfo}</p>
              <p>Pakistan: 2-3 business days. UAE: 1-2 business days. Real-time SMS & courier tracking provided upon dispatch.</p>
            </div>
          )}
        </div>
      </section>

      {/* Frequently Bought Together Bundle */}
      <section className="bg-[#FAF4ED] p-7 sm:p-10 rounded-xs border border-[#E8DEC9] shadow-luxury-sm">
        <h3 className="font-serif text-2xl font-normal text-neutral-900 mb-1">
          Frequently Bought Together
        </h3>
        <p className="text-xs text-neutral-600 mb-6 font-sans">
          Pair these complementary formulations to enhance active ingredient absorption.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-xs bg-white overflow-hidden border border-[#EBE4DC] shadow-xs">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-serif text-neutral-400 font-light">+</span>
            <div className="w-24 h-24 rounded-xs bg-white overflow-hidden border border-[#EBE4DC] shadow-xs">
              <img src={bundlePartner.images[0]} alt={bundlePartner.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-neutral-800">
              Primary: <span className="font-normal">{product.name}</span>
            </p>
            <p className="text-xs font-semibold text-neutral-800 mt-1">
              Paired: <span className="font-normal">{bundlePartner.name}</span>
            </p>
            <div className="mt-2.5 text-sm">
              <span className="font-mono text-base font-bold text-[#5A0E24]">
                Total: {formatAmount(bundleCombinedPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(product, 1, selectedVariant);
              addToCart(bundlePartner, 1);
              addToast('Added combined beauty ritual to your shopping bag.');
            }}
            className="px-6 py-3 bg-[#420B1C] hover:bg-[#5A0E24] text-white text-[11px] font-medium uppercase tracking-[0.2em] rounded-xs transition-colors whitespace-nowrap shadow-luxury-sm"
          >
            Add Both to Shopping Bag
          </button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="space-y-6 pt-6 border-t border-[#EBE4DC]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#8B263E] block mb-1">
              Verified Client Feedback
            </span>
            <h3 className="font-serif text-3xl font-normal text-neutral-900">
              Customer Reviews ({reviewsList.length})
            </h3>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-[11px] uppercase tracking-[0.2em] font-medium rounded-xs transition-colors"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Review Submission Form Modal / Box */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="bg-white p-7 rounded-xs border border-[#EBE4DC] space-y-4 max-w-2xl shadow-luxury-sm">
            <h4 className="font-serif text-lg font-semibold text-neutral-900">
              Share Your Experience with {product.name}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Ayesha M."
                  className="w-full text-xs border border-[#EBE4DC] rounded-xs p-2.5 focus:outline-none focus:border-[#5A0E24]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Rating *</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full text-xs border border-[#EBE4DC] rounded-xs p-2.5 focus:outline-none focus:border-[#5A0E24] bg-white"
                >
                  <option value={5}>5 Stars - Pure Perfection</option>
                  <option value={4}>4 Stars - Highly Commended</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                  <option value={2}>2 Stars - Needs Improvement</option>
                  <option value={1}>1 Star - Unsatisfactory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Review Headline</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="e.g. Incandescent glow after two weeks"
                className="w-full text-xs border border-[#EBE4DC] rounded-xs p-2.5 focus:outline-none focus:border-[#5A0E24]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Your Detailed Feedback *</label>
              <textarea
                required
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Describe texture, skin feel, fragrance, and noticeable results..."
                className="w-full text-xs border border-[#EBE4DC] rounded-xs p-2.5 focus:outline-none focus:border-[#5A0E24]"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-3 bg-[#420B1C] hover:bg-[#5A0E24] text-white text-[11px] font-medium uppercase tracking-[0.2em] rounded-xs transition-colors"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-xs border border-[#EBE4DC] space-y-2.5 shadow-luxury-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#DFC066]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">{rev.date}</span>
              </div>
              <h5 className="font-serif text-base font-semibold text-neutral-900">"{rev.title}"</h5>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">{rev.comment}</p>
              <div className="text-[11px] text-neutral-500 pt-1">
                <span className="font-semibold text-neutral-800">{rev.author}</span> · {rev.location} · <span className="text-[#5A0E24] font-medium">Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-[#EBE4DC]">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#8B263E] block mb-1">
                Complementary Formulations
              </span>
              <h3 className="font-serif text-3xl font-normal text-neutral-900">
                You May Also Admire
              </h3>
            </div>
            <Link to="/shop" className="text-[11px] font-semibold text-[#5A0E24] hover:underline uppercase tracking-wider">
              View Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

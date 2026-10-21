import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { products } from '../../data/products.js';

export default function Header() {
  const navigate = useNavigate();
  const { regionCode, region, setRegion, allRegions, formatAmount } = useRegion();
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const regionDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on click outside & Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(e.target)) {
        setIsRegionDropdownOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsRegionDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Filtered live search suggestions
  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Shop All', to: '/shop' },
    { label: 'Skincare', to: '/category/skincare' },
    { label: 'Makeup', to: '/category/makeup' },
    { label: 'Haircare', to: '/category/haircare' },
    { label: 'Fragrances', to: '/category/fragrances' },
    { label: 'Body Care', to: '/category/body-care' },
    { label: 'Privileges', to: '/offers' },
    { label: 'Journal', to: '/journal' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EFE8DF] transition-all">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-4 lg:gap-8 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-neutral-800 hover:text-[#DE6E4B] transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Wordmark */}
          <Link 
            to="/" 
            className="group flex flex-col items-start leading-none tracking-normal"
            aria-label="MUJER Home"
          >
            <span className="font-serif text-2xl sm:text-[28px] tracking-[0.34em] font-normal text-[#251D1B] transition-colors group-hover:text-[#DE6E4B]">
              MUJER
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.42em] text-[#DE6E4B] font-sans font-bold mt-1">
              Haute Cosmétique
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav 
          aria-label="Primary"
          className="hidden xl:flex items-center gap-7 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7C726F]"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap transition-colors relative py-1 hover:text-[#DE6E4B] ${
                  isActive 
                    ? 'text-[#251D1B] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#DE6E4B]' 
                    : 'text-[#7C726F] hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[1px] hover:after:bg-[#DE6E4B]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Region Selector & Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Region / Currency Selector */}
          <div className="relative" ref={regionDropdownRef}>
            <button
              onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#251D1B] hover:text-[#DE6E4B] border border-[#EFE8DF] rounded-full hover:border-[#DE6E4B] transition-all bg-white shadow-2xs"
              aria-label="Select delivery region and currency"
              aria-expanded={isRegionDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#DE6E4B]" />
              <span className="font-sans text-[11px] font-bold text-[#251D1B]">{regionCode}</span>
              <ChevronDown className="w-3 h-3 text-[#9E9390]" />
            </button>

            {isRegionDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-luxury-md border border-[#EFE8DF] py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1"
                role="menu"
              >
                <div className="px-3.5 py-1 text-[10px] font-bold text-[#9E9390] uppercase tracking-wider border-b border-[#F6F1EB]">
                  Select Delivery Region
                </div>
                {allRegions.map((reg) => (
                  <button
                    key={reg.code}
                    onClick={() => {
                      setRegion(reg.code);
                      setIsRegionDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#FAF6F0] transition-colors ${
                      regionCode === reg.code ? 'font-bold text-[#DE6E4B] bg-[#FCEEE6]/60' : 'text-[#251D1B]'
                    }`}
                    role="menuitem"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{reg.flag}</span>
                      <span className="font-sans font-medium">{reg.name}</span>
                    </span>
                    <span className="text-[#7C726F] text-[11px] font-mono">{reg.currencyLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#251D1B] hover:text-[#DE6E4B] transition-colors rounded-full hover:bg-white"
            aria-label="Search cosmetics catalogue"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="p-2 text-[#251D1B] hover:text-[#DE6E4B] transition-colors relative rounded-full hover:bg-white"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#DE6E4B] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-sans">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account Profile Shortcut */}
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="p-2 text-[#251D1B] hover:text-[#DE6E4B] transition-colors hidden sm:inline-flex rounded-full hover:bg-white"
            aria-label={isAuthenticated ? `Account: ${user?.name}` : 'Login to account'}
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Shopping Bag Button (Triggers CartDrawer) */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="p-2 text-[#251D1B] hover:text-[#DE6E4B] transition-colors relative rounded-full hover:bg-white"
            aria-label={`Shopping bag with ${totalItemCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#DE6E4B] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-sans">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Search Modal / Autocomplete Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-luxury-lg border border-[#EFE8DF] overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-[#EFE8DF] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#DE6E4B] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search botanical serums, velvet lipsticks, fragrances..."
                className="w-full text-sm text-[#251D1B] placeholder-[#9E9390] outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-[#9E9390] hover:text-[#251D1B] p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            {/* Suggestions list */}
            {searchSuggestions.length > 0 ? (
              <div className="p-2 max-h-80 overflow-y-auto divide-y divide-[#F6F1EB]">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#9E9390] uppercase tracking-wider">
                  Matching Formulations
                </div>
                {searchSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/product/${prod.id}`);
                    }}
                    className="w-full text-left p-3 flex items-center gap-3.5 hover:bg-[#FAF6F0] transition-colors rounded-xl"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 object-contain rounded-xl bg-[#FAF6F0] border border-[#EFE8DF] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-bold text-[#251D1B] truncate">{prod.name}</p>
                      <p className="text-[11px] text-[#7C726F] font-sans">{prod.brand} · {prod.category}</p>
                    </div>
                    <span className="font-sans text-xs font-bold text-[#DE6E4B] shrink-0">
                      {formatAmount(prod.prices[regionCode])}
                    </span>
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-8 text-center text-xs text-[#7C726F]">
                No beauty formulations match "{searchQuery}". Press Enter to browse the complete catalogue.
              </div>
            ) : (
              <div className="p-5 text-xs text-[#7C726F] bg-[#FAF6F0]">
                <span className="font-bold text-[#251D1B] uppercase tracking-wider text-[10px] block mb-2.5">
                  Suggested Inquiries
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Botanical Elixir', 'Bordeaux 09', 'Rose d’Ambre', 'Mineral SPF 50', 'Gua Sha', 'Artisan Brushes'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="px-3.5 py-1.5 bg-white border border-[#EFE8DF] rounded-full text-[11px] font-medium text-[#251D1B] hover:border-[#DE6E4B] hover:text-[#DE6E4B] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF6F0] shadow-luxury-lg p-6 flex flex-col justify-between overflow-y-auto border-r border-[#EFE8DF]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EFE8DF]">
                <span className="font-serif text-2xl tracking-[0.3em] font-normal text-[#251D1B]">
                  MUJER
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-[#7C726F] hover:text-[#251D1B]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-2 px-3 rounded-lg text-xs uppercase tracking-[0.16em] font-bold transition-colors ${
                        isActive ? 'text-[#DE6E4B] bg-[#FCEEE6]' : 'text-[#251D1B] hover:text-[#DE6E4B] hover:bg-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-[#EFE8DF] space-y-2">
                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-[#251D1B] hover:text-[#DE6E4B] hover:bg-white"
                >
                  <User className="w-4 h-4 text-[#DE6E4B]" />
                  <span>{isAuthenticated ? `My Account (${user?.name?.split(' ')[0]})` : 'Client Sign In'}</span>
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-[#251D1B] hover:text-[#DE6E4B] hover:bg-white"
                >
                  <Heart className="w-4 h-4 text-[#DE6E4B]" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-[#EBE4DC] text-xs text-neutral-500">
              <p className="font-medium text-neutral-800">Delivering to {regionCode}</p>
              <p className="text-[11px] mt-0.5 text-neutral-500">
                Complimentary delivery from {formatAmount(region.freeShippingThreshold)}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

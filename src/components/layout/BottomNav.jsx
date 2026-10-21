import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function BottomNav() {
  const { pathname } = useLocation();
  const { wishlistCount } = useWishlist();
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EFE8DF] px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-3 ${
              isActive ? 'text-[#DE6E4B]' : 'text-[#7C726F] hover:text-[#251D1B]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] ${isActive ? 'font-bold text-[#DE6E4B]' : 'font-medium'}`}>
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Categories / Shop */}
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-3 ${
              isActive ? 'text-[#DE6E4B]' : 'text-[#7C726F] hover:text-[#251D1B]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutGrid className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] ${isActive ? 'font-bold text-[#DE6E4B]' : 'font-medium'}`}>
                Categories
              </span>
            </>
          )}
        </NavLink>

        {/* Wishlist */}
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-3 ${
              isActive ? 'text-[#DE6E4B]' : 'text-[#7C726F] hover:text-[#251D1B]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <Heart className={`w-5 h-5 ${isActive ? 'stroke-[2.5] fill-[#DE6E4B]/20' : 'stroke-2'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#DE6E4B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-bold text-[#DE6E4B]' : 'font-medium'}`}>
                Wishlist
              </span>
            </>
          )}
        </NavLink>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center gap-1 transition-colors relative py-1 px-3 text-[#7C726F] hover:text-[#251D1B]"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#DE6E4B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">
            Bag
          </span>
        </button>

        {/* Profile / Account */}
        <NavLink
          to={isAuthenticated ? '/account' : '/login'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-3 ${
              isActive ? 'text-[#DE6E4B]' : 'text-[#7C726F] hover:text-[#251D1B]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <User className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] ${isActive ? 'font-bold text-[#DE6E4B]' : 'font-medium'}`}>
                Profile
              </span>
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
}

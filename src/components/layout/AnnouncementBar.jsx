import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { region } = useRegion();

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Maison Privileges Announcement"
      className="bg-[#251D1B] text-[#FAF6F0] text-[11px] font-normal py-2 px-4 relative border-b border-[#3B302D] tracking-wide select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center overflow-hidden">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#DE6E4B]">
            <Sparkles className="w-3.5 h-3.5 text-[#DE6E4B]" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">MUJER Privilège</span>
            <span aria-hidden="true" className="text-white/30">·</span>
          </span>
          <p className="truncate text-[#D9C8BE]">
            Complimentary delivery on orders over{' '}
            <strong className="text-white font-bold tracking-normal">
              {region.currencySymbol} {region.freeShippingThreshold.toLocaleString()}
            </strong>
            <span className="hidden md:inline text-[#B5A59B]"> · Complimentary luxury gift pouch included</span>
            <span className="hidden lg:inline text-[#B5A59B]"> · Use privilege code <span className="text-[#DE6E4B] font-mono tracking-wider font-bold">GLOW15</span> for 15% off</span>
          </p>
          <Link
            to="/offers"
            className="text-[#DE6E4B] hover:text-[#F8E7DE] uppercase tracking-[0.16em] text-[10px] ml-2 shrink-0 font-bold transition-colors border-b border-[#DE6E4B]/40 hover:border-white"
          >
            Explore
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#B5A59B] hover:text-white p-1 rounded-full transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 text-[11px] uppercase tracking-[0.14em] text-neutral-500 font-sans">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <Link to="/" className="hover:text-[#5A0E24] transition-colors flex items-center gap-1 text-neutral-400 hover:text-neutral-900">
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-neutral-300" aria-hidden="true">/</span>
              {isLast || !item.to ? (
                <span className="font-semibold text-neutral-800 truncate max-w-[220px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-[#5A0E24] text-neutral-500 transition-colors truncate max-w-[160px]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

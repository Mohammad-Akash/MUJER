import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Search, Clock, Calendar } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { blogPosts } from '../../data/blogPosts.js';

export default function BlogListing() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Skincare', 'Makeup', 'Fragrances'];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedTag !== 'All' && post.category !== selectedTag) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'The Beauty Journal' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Maison MUJER Gazette & Editorial</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-neutral-900 leading-tight">
          The Beauty Journal
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans max-w-lg mx-auto">
          In-depth masterclasses exploring botanical actives, cellular longevity, haute pigment application, and classical Grasse perfumery.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#EBE4DC] pb-4">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-4 py-2 text-[10.5px] uppercase tracking-[0.16em] font-medium transition-all ${
                selectedTag === cat
                  ? 'bg-[#3E0B1B] text-white shadow-luxury-sm'
                  : 'bg-white border border-[#EBE4DC] text-neutral-700 hover:border-[#C5A059]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journal entries..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#EBE4DC] focus:outline-none focus:border-[#C5A059] font-sans"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white border border-[#EBE4DC] overflow-hidden shadow-luxury-sm hover:shadow-luxury-md transition-all flex flex-col justify-between"
          >
            <div>
              <Link to={`/journal/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1B040B] text-[#DFC066] text-[9px] uppercase font-medium tracking-[0.2em]">
                  {post.category}
                </span>
              </Link>

              <div className="p-6">
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-2 font-mono">
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-serif text-xl font-medium text-neutral-900 group-hover:text-[#540F25] transition-colors leading-snug">
                  <Link to={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-neutral-600 mt-2.5 line-clamp-3 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-[#EBE4DC]/60 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-sans">By {post.author}</span>
              <Link
                to={`/journal/${post.slug}`}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#3E0B1B] hover:text-[#540F25] inline-flex items-center gap-1"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

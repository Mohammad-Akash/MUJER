import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { blogPosts } from '../../data/blogPosts.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { addToast } = useToast();

  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Article link copied to clipboard.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      <Breadcrumbs
        items={[
          { label: 'Beauty Journal', to: '/journal' },
          { label: post.title }
        ]}
      />

      <article className="space-y-8">
        
        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="uppercase tracking-[0.2em] font-medium text-[#8C1C40] bg-[#FDF2F4] px-3 py-1 border border-[#F7D6DE] text-[10px]">
              {post.category}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500 font-mono text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C5A059]" />
              {post.readTime}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500 font-mono text-[11px]">{post.date}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-b border-[#EBE4DC] pb-4 text-xs text-neutral-600 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#3E0B1B] text-[#DFC066] flex items-center justify-center font-serif text-sm">
                M
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{post.author}</p>
                <p className="text-[11px] text-neutral-400">{post.authorRole}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#EBE4DC] text-neutral-700 hover:border-[#3E0B1B] transition-colors text-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Share Journal</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] overflow-hidden border border-[#EBE4DC] shadow-luxury-md">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-neutral max-w-none font-sans text-neutral-700 leading-relaxed text-sm sm:text-base space-y-6 pt-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Editorial Footnote / Author Box */}
        <div className="p-6 bg-white border border-[#EBE4DC] shadow-luxury-sm mt-12 flex items-center gap-5">
          <div className="w-14 h-14 bg-[#3E0B1B] text-[#DFC066] flex items-center justify-center font-serif text-2xl shrink-0">
            M
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-medium text-neutral-900">About the Author: {post.author}</h4>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Specialized researcher in phyto-botanical extraction and cosmetic dermatology at the House of MUJER.
            </p>
          </div>
        </div>

      </article>

      {/* Related Articles */}
      <div className="pt-12 border-t border-[#EBE4DC] space-y-6">
        <h3 className="font-serif text-2xl font-normal text-neutral-900">
          Related Editorial Masterclasses
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedPosts.map((rel) => (
            <Link
              key={rel.id}
              to={`/journal/${rel.slug}`}
              className="group p-5 bg-white border border-[#EBE4DC] shadow-luxury-sm hover:border-[#C5A059] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C1C40]">{rel.category}</span>
                <h4 className="font-serif text-lg font-medium text-neutral-900 group-hover:text-[#540F25] transition-colors mt-1">
                  {rel.title}
                </h4>
              </div>
              <span className="text-xs font-semibold text-[#3E0B1B] mt-4 flex items-center gap-1">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

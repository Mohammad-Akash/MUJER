import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function About() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="bg-[#1B040B] text-[#FAF8F5] py-20 border-b border-[#3E0B1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Maison Heritage' }]} />
          
          <div className="mt-8 max-w-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#DFC066]">
              Origin & Haute Parfumerie Heritage
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              The Architecture of Beauty
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              Founded on the belief that cosmetics should awaken personal sovereignty, MUJER fuses centuries-old French floral extraction with modern biocompatible Swiss cellular science.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
              Purity Without Compromise, Radiance Without Masking
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              In a landscape inundated by disposable fast-beauty, MUJER was conceived as a sanctuary of permanence. Every formulation—from our deep Bordeaux velvet lipsticks to our multi-molecular brightening elixirs—is crafted in small, deliberate batches using only the highest grade certified ingredients.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              We reject fillers, harsh sulfates, synthetic phthalates, and unnecessary water dilution. What touches your skin is pure, bio-active potency.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-white border border-[#EBE4DC] shadow-luxury-sm">
                <p className="font-serif text-base font-medium text-[#3E0B1B]">Grasse & Zurich</p>
                <p className="text-neutral-500 mt-1">Formulated across premier European beauty laboratories</p>
              </div>
              <div className="p-4 bg-white border border-[#EBE4DC] shadow-luxury-sm">
                <p className="font-serif text-base font-medium text-[#3E0B1B]">Zero Animal Testing</p>
                <p className="text-neutral-500 mt-1">Leaping Bunny certified cruelty-free standard</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100 shadow-luxury-lg border border-[#EBE4DC]">
              <img
                src="/src/assets/images/hero_mujer_campaign_1792565253091.jpg"
                alt="House of MUJER"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 border-y border-[#EBE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40]">
              Core Pillars
            </span>
            <h2 className="font-serif text-3xl font-normal text-neutral-900">
              The Three Tenets of MUJER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 border border-[#EBE4DC] bg-[#FAF8F5] space-y-3 shadow-luxury-sm">
              <div className="w-10 h-10 border border-[#C5A059]/40 bg-[#3E0B1B] text-[#DFC066] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-medium text-neutral-900">Biocompatible Actives</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Formulas that work harmoniously with skin cell receptors, preventing sensitization while maximizing cellular turnover.
              </p>
            </div>

            <div className="p-7 border border-[#EBE4DC] bg-[#FAF8F5] space-y-3 shadow-luxury-sm">
              <div className="w-10 h-10 border border-[#C5A059]/40 bg-[#3E0B1B] text-[#DFC066] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-medium text-neutral-900">Sensorial Tactility</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                From weighted metal cases with magnetic snaps to cashmere-plush lip textures, the tactile experience is as memorable as the visual outcome.
              </p>
            </div>

            <div className="p-7 border border-[#EBE4DC] bg-[#FAF8F5] space-y-3 shadow-luxury-sm">
              <div className="w-10 h-10 border border-[#C5A059]/40 bg-[#3E0B1B] text-[#DFC066] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-medium text-neutral-900">Ethical Stewardship</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Responsible ethical sourcing of Damask rose, wild rosehip, and certified mineral pigments without micro-plastics or ecological degradation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-normal text-neutral-900">
          Begin Your Beauty Ceremony
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto font-sans">
          Explore our award-winning formulations delivered directly to your residence with guaranteed authenticity and climate-controlled packaging.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10.5px] font-medium uppercase tracking-[0.22em] transition-all shadow-luxury-sm hover:shadow-luxury-md"
          >
            Explore Boutique
          </Link>
        </div>
      </section>

    </div>
  );
}

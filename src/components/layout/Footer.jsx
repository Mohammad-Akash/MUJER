import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to MUJER Gazette. Check your inbox for your 15% privilege code.');
    setEmail('');
  };

  return (
    <footer className="bg-[#201A18] text-[#FAF6F0] pt-16 pb-12 border-t border-[#332A27]">
      {/* Brand Values Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#332A27] border border-[#DE6E4B]/40 flex items-center justify-center shrink-0 text-[#DE6E4B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">100% Certified Purity</h4>
              <p className="text-xs text-[#B5A59B] mt-1 leading-relaxed">
                Formulated under strict dermatological safety standards. Free from parabens, sulfates, and harsh fillers.
              </p>
            </div>
          </div>

          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#332A27] border border-[#DE6E4B]/40 flex items-center justify-center shrink-0 text-[#DE6E4B]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">Climate-Shielded Transit</h4>
              <p className="text-xs text-[#B5A59B] mt-1 leading-relaxed">
                Insulated thermal packaging protecting active serums and botanical absolutes across Pakistan and GCC.
              </p>
            </div>
          </div>

          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#332A27] border border-[#DE6E4B]/40 flex items-center justify-center shrink-0 text-[#DE6E4B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">Privileged Return Guarantee</h4>
              <p className="text-xs text-[#B5A59B] mt-1 leading-relaxed">
                Complimentary 14-day doorstep return and shade exchange privilege with courier collection at your doorstep.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.34em] font-normal text-white block">
                MUJER
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.38em] text-[#DE6E4B] font-sans font-bold block mt-1">
                Haute Cosmétique
              </span>
            </Link>
            
            <p className="text-xs text-[#B5A59B] leading-relaxed max-w-sm">
              MUJER redefines modern high-luxury cosmetics. Harmonizing French floral heritage with bio-cellular science, each formulation awakens deep radiance and personal sovereignty.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DE6E4B]">
                The MUJER Gazette
              </h5>
              <p className="text-[11px] text-[#B5A59B] mt-1">
                Receive private seasonal allocations, masterclasses, and 15% off your first order.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="mt-3 flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white/10 text-white placeholder-[#8A7970] text-xs px-4 py-2.5 rounded-l-full border border-white/15 focus:outline-none focus:border-[#DE6E4B] flex-1 font-sans"
                />
                <button
                  type="submit"
                  className="bg-[#DE6E4B] hover:bg-[#C85633] text-white px-5 py-2.5 rounded-r-full text-[11px] font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Boutique Navigation */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#DE6E4B] mb-4">
              Boutique
            </h5>
            <ul className="space-y-2.5 text-xs text-[#B5A59B]">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All Collections</Link></li>
              <li><Link to="/category/skincare" className="hover:text-white transition-colors">Botanical Skincare</Link></li>
              <li><Link to="/category/makeup" className="hover:text-white transition-colors">Haute Makeup</Link></li>
              <li><Link to="/category/fragrances" className="hover:text-white transition-colors">Rare Parfums</Link></li>
              <li><Link to="/category/haircare" className="hover:text-white transition-colors">Haircare Elixirs</Link></li>
              <li><Link to="/category/body-care" className="hover:text-white transition-colors">Sensorial Body Care</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Seasonal Privileges</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#DE6E4B] mb-4">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-xs text-[#B5A59B]">
              <li><Link to="/account" className="hover:text-white transition-colors">My Privilège Account</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Live Order Tracking</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns-policy" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/authenticity" className="hover:text-white transition-colors">Authenticity Guarantee</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* House of MUJER & Policies */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#DE6E4B] mb-4">
              House of MUJER
            </h5>
            <ul className="space-y-2.5 text-xs text-[#B5A59B]">
              <li><Link to="/about" className="hover:text-white transition-colors">Heritage & Origin</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">The Beauty Journal</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>

            <div className="mt-8">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B5A59B] mb-2.5">
                Social Atelier
              </h5>
              <div className="flex gap-3.5 text-[#B5A59B]">
                <a href="#instagram" className="hover:text-[#DE6E4B] transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" className="hover:text-[#DE6E4B] transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#twitter" className="hover:text-[#DE6E4B] transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Payment Icons + Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7970]">
        <div>
          © {new Date().getFullYear()} MUJER Haute Cosmétique. All rights reserved.
        </div>

        {/* Accepted Payment Badges */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[#8A7970] mr-1">Guaranteed Settlement:</span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-[#D9C8BE]">Cash on Delivery</span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-[#D9C8BE]">Visa</span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-[#D9C8BE]">Mastercard</span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-[#D9C8BE]">Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}

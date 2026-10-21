import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Contact() {
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Formulation & Shade Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Please fill out all mandatory contact fields.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      addToast('Your inquiry has been relayed to the MUJER Client Concierge.');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Client Concierge' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C1C40]">
          Personal Concierge & Beauty Consultations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
          We Await Your Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-sans">
          Our specialized dermal consultants and shade stylists are at your disposal 6 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Information & Boutiques (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-7 border border-[#EBE4DC] shadow-luxury-sm space-y-6">
            <h3 className="font-serif text-lg font-medium text-neutral-900 border-b border-[#EBE4DC] pb-3">
              Maison Contact Points
            </h3>

            <div className="space-y-5 text-xs text-neutral-600 font-sans">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 border border-[#C5A059]/40 bg-[#FAF8F5] flex items-center justify-center text-[#C5A059] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">Concierge Email</p>
                  <p className="mt-0.5 text-neutral-700">concierge@mujer-cosmetics.com</p>
                  <p className="text-[10.5px] text-neutral-400">Response guaranteed within 12 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 border border-[#C5A059]/40 bg-[#FAF8F5] flex items-center justify-center text-[#C5A059] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">Client Service Telephone</p>
                  <p className="mt-0.5 text-neutral-700">Pakistan: +92 (42) 3578-9000</p>
                  <p className="text-neutral-700">UAE / Gulf: +971 4 390 1200</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 border border-[#C5A059]/40 bg-[#FAF8F5] flex items-center justify-center text-[#C5A059] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">Boutique Operating Hours</p>
                  <p className="mt-0.5 text-neutral-700">Monday – Saturday: 10:00 AM – 8:00 PM</p>
                  <p className="text-[10.5px] text-neutral-400">Closed on Sundays & National Holidays</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-7 border border-[#EBE4DC] space-y-4 text-xs font-sans shadow-luxury-sm">
            <h3 className="font-serif text-base font-medium text-neutral-900">
              Flagship Salons
            </h3>
            <div className="border-b border-[#EBE4DC] pb-3">
              <p className="font-semibold text-neutral-900">Lahore Flagship Salon</p>
              <p className="text-neutral-600 mt-0.5">Mall One, Main Boulevard, Gulberg III, Lahore, Pakistan</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Dubai Gallery & Counter</p>
              <p className="text-neutral-600 mt-0.5">The Fashion Avenue, Downtown Dubai, United Arab Emirates</p>
            </div>
          </div>
        </div>

        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#EBE4DC] shadow-luxury-md">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-[#FDF2F4] text-[#3E0B1B] border border-[#F7D6DE] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-neutral-900">Inquiry Received</h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-sans leading-relaxed">
                Thank you, {form.name}. A senior MUJER beauty consultant has received your message and will reply via email shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', phone: '', subject: 'Formulation & Shade Consultation', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-[#FAF8F5] border border-[#EBE4DC] text-neutral-800 text-[10.5px] font-medium uppercase tracking-[0.2em] hover:border-[#3E0B1B] transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-serif text-xl font-normal text-neutral-900 mb-6">
                Direct Concierge Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] font-medium text-neutral-700 mb-1.5 font-sans">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Mahira Khan"
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#EBE4DC] focus:outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] font-medium text-neutral-700 mb-1.5 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="mahira@example.com"
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#EBE4DC] focus:outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] font-medium text-neutral-700 mb-1.5 font-sans">
                    Telephone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#EBE4DC] focus:outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] font-medium text-neutral-700 mb-1.5 font-sans">
                    Subject Priority
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#EBE4DC] focus:outline-none focus:border-[#C5A059] font-sans"
                  >
                    <option value="Formulation & Shade Consultation">Formulation & Shade Consultation</option>
                    <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                    <option value="Custom Gift Coffret Inquiries">Custom Gift Coffret Inquiries</option>
                    <option value="VIP Salon Private Booking">VIP Salon Private Booking</option>
                    <option value="Press & Partnership">Press & Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] uppercase tracking-[0.16em] font-medium text-neutral-700 mb-1.5 font-sans">
                  Your Message or Skin Concern *
                </label>
                <textarea
                  rows="5"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your inquiry, shade matching preference, or specific dermal routine questions..."
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#EBE4DC] focus:outline-none focus:border-[#C5A059] font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#3E0B1B] hover:bg-[#540F25] text-white text-[10.5px] font-medium uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2 shadow-luxury-sm hover:shadow-luxury-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Transmitting...' : 'Dispatch Inquiry to Concierge'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

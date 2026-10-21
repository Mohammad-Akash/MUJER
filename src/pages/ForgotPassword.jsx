import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Password reset link dispatched.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-serif text-3xl tracking-[0.25em] text-[#4A0D1F] font-medium block">
          MUJER
        </span>
        <h1 className="font-serif text-2xl font-semibold text-neutral-900">
          Reset Your Password
        </h1>
        <p className="text-xs text-neutral-500">
          Enter your registered email and we'll send a secure restoration link.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm space-y-6">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-[#FDF2F4] text-[#5A0E24] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900">
              Check Your Inbox
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We have dispatched recovery instructions to <strong>{email}</strong>. For demonstration purposes, you can proceed directly to reset your credentials.
            </p>
            <Link
              to="/reset-password"
              className="inline-block px-5 py-2.5 bg-[#5A0E24] text-white text-xs font-semibold rounded uppercase tracking-wider"
            >
              Simulate Password Reset →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Account Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ayesha@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#5A0E24]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5A0E24] hover:bg-[#781533] text-white text-xs uppercase tracking-widest font-semibold py-3 rounded transition-colors"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-neutral-100 text-center">
          <Link
            to="/login"
            className="text-xs text-neutral-600 hover:text-[#5A0E24] inline-flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

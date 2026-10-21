import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSuccess(true);
    addToast('Your password has been successfully updated.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="font-serif text-3xl tracking-[0.25em] text-[#4A0D1F] font-medium block">
          MUJER
        </span>
        <h1 className="font-serif text-2xl font-semibold text-neutral-900">
          Establish New Password
        </h1>
        <p className="text-xs text-neutral-500">
          Please select a strong password for your client account.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm space-y-6">
        {success ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900">
              Password Updated
            </h3>
            <p className="text-xs text-neutral-600">
              Your credentials have been securely stored. You may now sign in.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 bg-[#5A0E24] text-white text-xs font-semibold rounded uppercase tracking-wider"
            >
              Sign In to Your Account
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2.5 text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#5A0E24]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#5A0E24]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5A0E24] hover:bg-[#781533] text-white text-xs uppercase tracking-widest font-semibold py-3 rounded transition-colors"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

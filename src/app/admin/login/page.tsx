'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { Lock, Mail, Loader2, ShieldCheck, Sparkles, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      showToast(`Welcome back, ${data.user.name}!`, 'success');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      showToast(err.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Radial gold background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-obsidian-900/90 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-luxury-dark backdrop-blur-md relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <img src="/images/logo.svg" alt="Free Bird Salon & Academy" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-cream-50">
            Admin CMS Portal
          </h1>
          <p className="text-xs text-neutral-400">
            Sign in to manage salon products, offers, before/after transformations, and inquiries.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shiv1 or admin@freebirdsalon.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Fill Accounts */}
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2.5">
            Quick Fill Login Credentials:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('shiv1', '@Asdf1234')}
              className="px-2.5 py-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/25 border border-gold-500/40 text-[11px] text-gold-300 font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <Key className="w-3 h-3 text-gold-400" />
              <span>shiv1 (Admin)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@freebirdsalon.com', 'AdminPassword123!')}
              className="px-2.5 py-2 rounded-lg bg-neutral-950 hover:bg-gold-500/20 border border-neutral-800 text-[10px] text-gold-400 font-semibold uppercase tracking-wider transition-colors"
            >
              Master Stylist
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('manager@freebirdsalon.com', 'ManagerPassword123!')}
              className="px-2.5 py-2 rounded-lg bg-neutral-950 hover:bg-gold-500/20 border border-neutral-800 text-[10px] text-purple-400 font-semibold uppercase tracking-wider transition-colors"
            >
              Manager
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('staff@freebirdsalon.com', 'StaffPassword123!')}
              className="px-2.5 py-2 rounded-lg bg-neutral-950 hover:bg-gold-500/20 border border-neutral-800 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider transition-colors"
            >
              Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

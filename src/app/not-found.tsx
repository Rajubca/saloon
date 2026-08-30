'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-obsidian-950">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center mx-auto shadow-luxury">
          <Sparkles className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-6xl font-serif font-bold text-gold-400">404</span>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
          Page Not Found
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed font-light">
          The luxury salon service, product, or article you are looking for may have moved or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-luxury-gold"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-obsidian-900 border border-neutral-800 text-cream-100 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

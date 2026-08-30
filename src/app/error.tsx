'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-obsidian-950">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-red-950/40 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
          Something went wrong
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed font-light">
          An unexpected error occurred. Please try refreshing or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-obsidian-900 border border-neutral-800 text-cream-100 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

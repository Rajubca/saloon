'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { PromotionBanner } from '@/types';

interface PromoPopupProps {
  banner?: PromotionBanner | null;
}

export default function PromoPopup({ banner }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!banner || !Boolean(banner.is_active)) return;

    // Check dates
    const now = new Date().getTime();
    const start = new Date(banner.start_date).getTime();
    const end = new Date(banner.end_date).getTime();

    if (now < start || now > end) return;

    // Check frequency storage
    const storageKey = `promo_dismissed_${banner.id}`;
    const dismissedAt = localStorage.getItem(storageKey);

    if (dismissedAt) {
      if (banner.display_frequency === 'once_per_day') {
        const oneDayMs = 24 * 60 * 60 * 1000;
        if (now - parseInt(dismissedAt, 10) < oneDayMs) {
          return;
        }
      } else if (banner.display_frequency === 'once_per_session') {
        return; // already dismissed
      }
    }

    // Check permanent "don't show again"
    const permanentlyHidden = localStorage.getItem(`promo_hide_forever_${banner.id}`);
    if (permanentlyHidden === 'true') {
      return;
    }

    // Delay popup display slightly for smooth entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [banner]);

  const handleClose = () => {
    if (!banner) return;
    setIsOpen(false);

    localStorage.setItem(`promo_dismissed_${banner.id}`, Date.now().toString());
    if (dontShowAgain) {
      localStorage.setItem(`promo_hide_forever_${banner.id}`, 'true');
    }
  };

  if (!isOpen || !banner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-obsidian-950 border border-gold-500/40 rounded-3xl shadow-luxury-dark overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-gold-500 hover:text-black text-white/80 border border-white/20 transition-all shadow"
          title="Close offer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Promo Image Header */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-obsidian-900">
          <img
            src={banner.desktop_image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

          {/* Floating Badge */}
          {banner.offer_badge && (
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-400 to-amberGold text-black text-xs font-bold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>{banner.offer_badge}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 -mt-6 relative z-10">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-cream-50 leading-snug">
            {banner.title}
          </h3>

          {banner.subtitle && (
            <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {banner.subtitle}
            </p>
          )}

          {/* Action CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={banner.cta_url || '/offers'}
              onClick={handleClose}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{banner.cta_text || 'Claim Special Offer'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Don't show again checkbox */}
            <label className="flex items-center justify-center gap-2 text-xs text-neutral-400 cursor-pointer pt-2 select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded bg-neutral-800 border-neutral-700 text-gold-500 focus:ring-gold-500/20"
              />
              <span>Don&apos;t show this special offer again</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

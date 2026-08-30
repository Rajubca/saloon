'use client';

import React from 'react';
import Link from 'next/link';
import { Offer } from '@/types';
import CountdownTimer from '@/components/ui/CountdownTimer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Tag, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface OffersSectionProps {
  offers: Offer[];
}

export default function OffersSection({ offers }: OffersSectionProps) {
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  if (!offers || offers.length === 0) return null;

  // Filter only active & non-expired offers
  const activeOffers = offers.filter((o) => {
    if (!Boolean(o.is_active)) return false;
    const end = new Date(o.end_date).getTime();
    return end > Date.now();
  });

  if (activeOffers.length === 0) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-20 sm:py-28 bg-obsidian-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>LIMITED TIME PROMOTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
                Exclusive Salon &amp; Academy Deals
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
                Claim verified promotional vouchers and early bird academy enrollment grants before the timers expire.
              </p>
            </div>

            <Link
              href="/offers"
              className="btn-shine-sweep self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase transition-all shadow hover:scale-105"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Offers Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeOffers.map((offer, index) => (
            <ScrollReveal key={offer.id} direction="up" delay={index * 100}>
              <div className="card-hover-lift h-full relative rounded-3xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-gold-500/25 p-6 sm:p-7 flex flex-col justify-between shadow-2xl overflow-hidden group hover:border-gold-500/50 transition-all">
                {/* Discount Tag Top Right */}
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-gold-500 to-amberGold text-black font-bold text-xs uppercase tracking-wider rounded-bl-2xl shadow">
                  {offer.discount_type === 'percentage' ? `${offer.discount_value}% OFF` : `SAVE ₹${offer.discount_value}`}
                </div>

                <div>
                  <span className="text-[11px] font-bold tracking-widest text-gold-400 uppercase">
                    LIMITED TIME OFFER
                  </span>

                  <h3 className="mt-2 text-xl font-serif font-bold text-cream-100 group-hover:text-gold-300 transition-colors leading-snug">
                    {offer.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {offer.description}
                  </p>

                  {/* Countdown Timer */}
                  <div className="mt-6 pt-5 border-t border-neutral-800/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 block">
                      Offer Expires In:
                    </span>
                    <CountdownTimer targetDate={offer.end_date} size="sm" />
                  </div>
                </div>

                {/* Coupon Code & CTA Button */}
                <div className="mt-6 pt-5 border-t border-neutral-800/80 flex flex-col gap-3">
                  {offer.coupon_code && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-dashed border-gold-500/40">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-gold-400" />
                        <code className="text-xs font-mono font-bold text-cream-50 uppercase tracking-widest">
                          {offer.coupon_code}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(offer.coupon_code!)}
                        className="px-2.5 py-1 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-black text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1"
                      >
                        {copiedCode === offer.coupon_code ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <Link
                    href={`/contact?offer=${encodeURIComponent(offer.title)}&code=${encodeURIComponent(offer.coupon_code || '')}`}
                    className="btn-shine-sweep w-full py-3 rounded-xl bg-gold-500/10 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-center text-xs font-bold tracking-wider uppercase transition-all shadow hover:scale-105"
                  >
                    Claim Voucher
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

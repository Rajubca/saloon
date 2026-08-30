'use client';

import React from 'react';
import { Testimonial, SiteSettings } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Star, Quote, CheckCircle2, ExternalLink } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  settings?: SiteSettings;
}

// Google "G" SVG Icon
function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function TestimonialsSection({ testimonials, settings }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const googleRating = settings?.google_rating || '4.9';
  const googleReviewsCount = settings?.google_reviews_count || '485+';
  const googleReviewUrl =
    settings?.google_review_url || 'https://maps.google.com/?q=Free+Bird+Salon+Vadodara';

  return (
    <section className="py-20 sm:py-28 bg-obsidian-950 relative overflow-hidden border-t border-gold-500/10">
      {/* Background Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-gold-400" />
              <span>REAL CLIENT EXPERIENCES &amp; REPUTATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
              Loved By Thousands in Vadodara
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
              Read authentic Google reviews from our brides, hair transformation clients, and academy diploma graduates.
            </p>

            {/* Google Trust & Aggregate Rating Badge */}
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3 p-2 sm:px-5 sm:py-2.5 rounded-full bg-obsidian-900/90 border border-gold-500/30 shadow-luxury backdrop-blur-md">
              <div className="flex items-center gap-2 pr-2 border-r border-neutral-800">
                <GoogleIcon className="w-4 h-4" />
                <span className="font-bold text-sm text-cream-50 font-serif">{googleRating}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <span className="text-xs text-neutral-300 font-medium">
                {googleReviewsCount} Verified Google Reviews
              </span>

              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine-sweep inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-black text-[11px] font-bold uppercase tracking-wider transition-all ml-1"
              >
                <span>Review Us on Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.id} direction="up" delay={(index % 6) * 90}>
              <div className="card-hover-lift h-full relative p-7 rounded-3xl bg-obsidian-900/60 border border-gold-500/15 hover:border-gold-500/45 backdrop-blur-sm flex flex-col justify-between transition-all group shadow-xl">
                <div>
                  {/* Top Bar: Google Verified Tag & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-neutral-800 text-[10px] font-medium text-neutral-300">
                      <GoogleIcon className="w-3 h-3" />
                      <span>Verified Google Review</span>
                    </div>

                    {t.google_review_date && (
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {t.google_review_date}
                      </span>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    &ldquo;{t.review_text}&rdquo;
                  </p>
                </div>

                {/* Author & Service Badge */}
                <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center gap-3.5">
                  {t.client_avatar ? (
                    <img
                      src={t.client_avatar}
                      alt={t.client_name}
                      className="w-11 h-11 rounded-full object-cover border border-gold-500/30 shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center font-serif font-bold text-base shrink-0">
                      {t.client_name.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-cream-100 truncate">
                        {t.client_name}
                      </h4>
                      {Boolean(t.is_verified) && (
                        <span title="Verified Client">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    {t.service_taken && (
                      <p className="text-[11px] text-gold-400/80 truncate mt-0.5">
                        {t.service_taken}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

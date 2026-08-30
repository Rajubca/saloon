'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, GraduationCap, Sparkles, Award, ArrowRight, ShieldCheck, Star, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const heroBg =
    settings.hero_bg_image ||
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=85';
  const heroTitle = settings.hero_title || 'Elevate Your Look. Master the Craft of Beauty.';
  const heroSubtitle =
    settings.hero_subtitle ||
    'Vadodara’s premier luxury destination for bespoke hair transformations, Russian Nano-Plastia, French Balayage, and government-certified cosmetology education led by Master Stylist Rajesh Joshi.';

  return (
    <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-obsidian-950">
      {/* Background Photography & Luxury Ambient Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Free Bird Salon & Academy Studio"
          className="w-full h-full object-cover object-center brightness-[0.32] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/85 to-obsidian-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/70" />

        {/* Ambient Champagne Gold Lighting */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[130px] pointer-events-none" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline, Trust Pill & Actions (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Master Stylist Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-900/90 backdrop-blur-xl border border-gold-500/35 text-gold-300 text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-luxury mb-6 animate-float-slow">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>CELEBRITY MASTER STYLIST • RAJESH JOSHI</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-cream-50 leading-[1.12] tracking-tight animate-fade-up">
              Elevate Your Look.{' '}
              <span className="text-gradient-gold italic font-normal">
                Master Haute Coiffure.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl leading-relaxed font-sans font-light animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              {heroSubtitle}
            </p>

            {/* Live Trust & Google Rating Social Proof Pill */}
            <div
              className="mt-6 inline-flex flex-wrap items-center gap-3 p-2 sm:px-4 sm:py-2 rounded-2xl bg-black/60 border border-gold-500/20 backdrop-blur-md animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              {/* Avatars */}
              <div className="flex -space-x-2 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border border-gold-400 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border border-gold-400 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border border-gold-400 object-cover"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-cream-100">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-cream-50 font-serif">4.9/5</span>
                <span className="text-neutral-400 text-[11px]">(485+ Verified Google Reviews)</span>
              </div>
            </div>

            {/* Dual High-Impact Action CTAs */}
            <div
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto animate-fade-up"
              style={{ animationDelay: '280ms' }}
            >
              <Link
                href="/contact"
                className="btn-shine-sweep px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-luxury-gold hover:scale-105 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book VIP Appointment</span>
              </Link>

              <Link
                href="/services?type=academy"
                className="btn-shine-sweep px-7 py-3.5 rounded-full bg-obsidian-900/90 hover:bg-gold-500/20 text-cream-100 hover:text-gold-300 border border-gold-500/35 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 backdrop-blur-md transition-all shadow hover:scale-105 active:scale-95"
              >
                <GraduationCap className="w-4 h-4 text-gold-400" />
                <span>Academy Diplomas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Fashion Luxury Studio Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 hidden lg:block">
            <ScrollReveal direction="right" delay={200}>
              <div className="glass-card-luxury p-6 rounded-3xl relative overflow-hidden group">
                {/* Image Container with Gold Border */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-gold-500/30 bg-black shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                    alt="Master Stylist Rajesh Joshi Hair Artistry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

                  {/* Floating Highlight Chips */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold-500/40 text-[10px] font-bold text-gold-300 uppercase tracking-wider">
                    ✨ SIGNATURE BALAYAGE
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-gold-500/30 shadow-2xl">
                    <p className="text-xs font-serif font-bold text-cream-50">
                      Celebrity Transformation Suite
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Russian Nano-Plastia &bull; French Balayage &bull; Royal Bridal
                    </p>
                    <div className="mt-2.5 flex items-center justify-between border-t border-neutral-800 pt-2">
                      <span className="text-[10px] text-gold-400 font-mono">
                        VADODARA &bull; 3 STUDIOS
                      </span>
                      <Link
                        href="/transformations"
                        className="text-[10px] text-gold-300 hover:text-white font-bold uppercase tracking-wider flex items-center gap-1"
                      >
                        <span>View Results</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Trust & Metric Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-cream-50">10,000+</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Satisfied Clients</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-cream-50">500+</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Certified Alumni</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-cream-50">3 Studios</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Across Vadodara</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400 shrink-0">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-cream-50">4.9 / 5.0</span>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Google Verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

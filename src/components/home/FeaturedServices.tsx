'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Service } from '@/types';
import ServiceCard from '@/components/ui/ServiceCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

interface FeaturedServicesProps {
  services: Service[];
  currency?: string;
}

export default function FeaturedServices({ services, currency = '₹' }: FeaturedServicesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'salon' | 'academy'>('all');

  const filtered = services.filter((s) => {
    if (activeTab === 'salon') return !Boolean(s.is_academy_course);
    if (activeTab === 'academy') return Boolean(s.is_academy_course);
    return true;
  });

  return (
    <section className="py-20 sm:py-28 bg-obsidian-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] pointer-events-none animate-pulse-soft" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIGNATURE TREATMENTS &amp; COURSES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
                Artistry That Defines Perfection
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
                From European Nano-Plastia and bespoke Balayage color melting to certified professional cosmetology diplomas.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-obsidian-900 border border-neutral-800 self-start md:self-auto shadow-md">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeTab === 'all'
                    ? 'bg-gold-500 text-black shadow-md scale-105'
                    : 'text-neutral-400 hover:text-cream-100'
                }`}
              >
                All Offerings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('salon')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeTab === 'salon'
                    ? 'bg-gold-500 text-black shadow-md scale-105'
                    : 'text-neutral-400 hover:text-cream-100'
                }`}
              >
                Salon Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('academy')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'academy'
                    ? 'bg-gold-500 text-black shadow-md scale-105'
                    : 'text-neutral-400 hover:text-cream-100'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academy Diplomas</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" delay={index * 100}>
              <div className="card-hover-lift h-full">
                <ServiceCard service={service} currency={currency} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All CTA */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="btn-shine-sweep inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 font-semibold text-xs tracking-widest uppercase transition-all shadow-luxury hover:scale-105"
            >
              <span>View Complete Service &amp; Course Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

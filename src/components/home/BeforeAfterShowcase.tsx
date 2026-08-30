'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BeforeAfterEntry } from '@/types';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Sparkles, ArrowRight, Eye, Layers } from 'lucide-react';

interface BeforeAfterShowcaseProps {
  entries: BeforeAfterEntry[];
}

export default function BeforeAfterShowcase({ entries }: BeforeAfterShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!entries || entries.length === 0) return null;

  const currentEntry = entries[selectedIndex] || entries[0];

  return (
    <section className="py-20 sm:py-28 bg-obsidian-900/90 relative overflow-hidden border-y border-gold-500/15">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>INTERACTIVE REAL-TIME COMPARISON</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
              Witness The Transformation
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Drag the live comparison slider left and right to inspect real client results — from severe bleach damage to high-shine Russian Nano-Plastia and royal bridal glow.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Viewer & Selector Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Active Viewer (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <ScrollReveal direction="zoom" delay={150}>
              <div className="card-hover-lift rounded-2xl overflow-hidden shadow-2xl">
                <BeforeAfterSlider
                  beforeImage={currentEntry.before_image}
                  afterImage={currentEntry.after_image}
                  beforeLabel={currentEntry.before_label || 'BEFORE'}
                  afterLabel={currentEntry.after_label || 'AFTER'}
                  title={currentEntry.title}
                  description={currentEntry.description}
                  initialPosition={currentEntry.initial_slider_position || 50}
                  orientation={currentEntry.orientation || 'horizontal'}
                  allowOrientationToggle={true}
                  aspectRatio="aspect-[16/11] sm:aspect-[16/10]"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Selector Thumbnails & Details (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <ScrollReveal direction="right" delay={200}>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans mb-1 block">
                Select Transformation Story
              </span>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {entries.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group hover:scale-[1.02] ${
                      selectedIndex === idx
                        ? 'bg-obsidian-950 border-gold-500 shadow-luxury-gold'
                        : 'bg-obsidian-950/40 border-neutral-800 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-900 border border-gold-500/20">
                      <img
                        src={item.after_image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-1 right-1 text-[8px] font-bold text-gold-300 font-mono px-1 rounded bg-black/70">
                        AFTER
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs sm:text-sm font-bold font-serif line-clamp-1 ${selectedIndex === idx ? 'text-gold-400' : 'text-cream-100 group-hover:text-gold-300'}`}>
                        {item.title}
                      </h4>
                      {item.tags && (
                        <p className="text-[10px] text-neutral-400 truncate mt-0.5 uppercase tracking-wider">
                          {item.tags}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <Link
                href="/transformations"
                className="btn-shine-sweep mt-4 py-3 rounded-xl bg-gold-500/10 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-center text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow hover:scale-105"
              >
                <span>Explore All Transformations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

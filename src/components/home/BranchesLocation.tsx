'use client';

import React from 'react';
import { SiteSettings, Branch } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

interface BranchesLocationProps {
  settings: SiteSettings;
}

export default function BranchesLocation({ settings }: BranchesLocationProps) {
  let branches: Branch[] = [];
  try {
    if (settings.branches_json) {
      branches = JSON.parse(settings.branches_json);
    }
  } catch (e) {
    branches = [];
  }

  return (
    <section className="py-20 sm:py-28 bg-obsidian-950 relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>LOCATIONS &amp; APPOINTMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
              Visit Our Studios in Vadodara
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
              Conveniently located across major hubs in Vadodara with dedicated VIP styling chambers and parking.
            </p>
          </div>
        </ScrollReveal>

        {/* Branches Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 120}>
              <div
                className="card-hover-lift h-full p-7 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 hover:border-gold-500/50 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-gold-500/15 text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                      {branch.area}
                    </span>
                    {branch.is_main && (
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>FLAGSHIP</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-cream-100 group-hover:text-gold-400 transition-colors">
                    {branch.name}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {branch.address}
                  </p>

                  <div className="mt-6 pt-5 border-t border-neutral-800 space-y-2.5 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{settings.business_hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{branch.phone || settings.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-5 border-t border-neutral-800 flex items-center gap-3">
                  <a
                    href={`tel:${branch.phone || settings.phone}`}
                    className="btn-shine-sweep flex-1 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs text-center tracking-wider transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Branch</span>
                  </a>

                  <a
                    href={`https://wa.me/${settings.whatsapp_number}?text=Hello%20Free%20Bird%20Salon,%20I%20would%20like%20to%20visit%20your%20${encodeURIComponent(branch.name)}%20branch.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
                    title="WhatsApp Directions"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Clock, GraduationCap, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  currency?: string;
}

export default function ServiceCard({ service, currency = '₹' }: ServiceCardProps) {
  let parsedFeatures: string[] = [];
  try {
    if (service.features) {
      parsedFeatures = JSON.parse(service.features);
    }
  } catch (e) {
    parsedFeatures = [];
  }

  const isAcademy = Boolean(service.is_academy_course);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-obsidian-900/60 border border-gold-500/15 hover:border-gold-500/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-luxury hover:-translate-y-1">
      {/* Featured Header Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-950">
        <img
          src={service.featured_image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          {isAcademy ? (
            <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-black text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-lg">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMY DIPLOMA</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-obsidian-900/90 backdrop-blur-md border border-gold-500/30 text-gold-400 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SALON SERVICE</span>
            </span>
          )}
        </div>

        {/* Duration if regular service */}
        {service.duration_minutes && service.duration_minutes > 0 && !isAcademy && (
          <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-cream-200 text-xs flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>{service.duration_minutes} Mins</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/services/${service.slug}`} className="group/title">
          <h3 className="text-lg font-serif font-bold text-cream-100 group-hover/title:text-gold-400 transition-colors line-clamp-1">
            {service.title}
          </h3>
        </Link>

        <p className="mt-2 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {service.short_description}
        </p>

        {/* Features Preview */}
        {parsedFeatures.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-neutral-800/80 pt-3">
            {parsedFeatures.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price & Action */}
        <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
              {isAcademy ? 'Course Fee' : 'Treatment Price'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-gold-400 font-sans">
                {formatCurrency(service.sale_price && service.sale_price > 0 ? service.sale_price : service.price, currency)}
              </span>
              {service.sale_price && service.sale_price < service.price && (
                <span className="text-xs text-neutral-500 line-through">
                  {formatCurrency(service.price, currency)}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="btn-shine-sweep px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-md hover:scale-105"
          >
            <span>{isAcademy ? 'Enroll / Info' : 'Book Service'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

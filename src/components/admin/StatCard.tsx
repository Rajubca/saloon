'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-obsidian-900/80 border border-gold-500/20 shadow-xl flex items-center justify-between gap-4">
      <div>
        <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 font-sans">
          {title}
        </span>
        <div className="mt-2 text-3xl font-serif font-bold text-cream-50">
          {value}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs text-neutral-400 font-light">{subtitle}</p>
        )}
      </div>

      <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/25 text-gold-400 shrink-0 shadow">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

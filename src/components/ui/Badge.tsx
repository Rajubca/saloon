'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'amber' | 'emerald' | 'rose' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    gold: 'bg-gold-500/15 border-gold-500/30 text-gold-400',
    amber: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    rose: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
    neutral: 'bg-neutral-800 border-neutral-700 text-neutral-300',
    outline: 'bg-transparent border-gold-500/40 text-gold-400',
  }[variant];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider border ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
}

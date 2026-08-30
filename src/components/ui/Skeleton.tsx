'use client';

import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-neutral-800/60 border border-neutral-700/20 ${className}`}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="rounded-2xl bg-obsidian-900/60 border border-neutral-800 p-4 space-y-4">
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="pt-2 flex justify-between items-center">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-8 w-1/4 rounded-lg" />
      </div>
    </div>
  );
}

export function ServiceSkeleton() {
  return (
    <div className="rounded-2xl bg-obsidian-900/60 border border-neutral-800 p-4 space-y-4">
      <Skeleton className="aspect-[16/10] w-full rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="pt-3 flex justify-between items-center">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-9 w-1/3 rounded-xl" />
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface AnnouncementBarProps {
  settings: SiteSettings;
}

export default function AnnouncementBar({ settings }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !settings.announcement_text || !Boolean(Number(settings.announcement_active))) {
    return null;
  }

  return (
    <aside aria-label="Announcement" className="relative z-40 bg-gradient-to-r from-obsidian-950 via-gold-900/60 to-obsidian-950 border-b border-gold-500/25 px-4 py-2 text-xs sm:text-sm text-gold-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-4 h-4 text-gold-400 shrink-0 animate-pulse" />
          <span className="font-medium">{settings.announcement_text}</span>
          {settings.announcement_link && (
            <Link
              href={settings.announcement_link}
              className="hidden sm:inline-flex items-center gap-1 font-bold text-gold-400 hover:text-white underline ml-1 transition-colors"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md text-gold-400/70 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
          title="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

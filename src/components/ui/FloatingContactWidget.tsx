'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, Phone } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FloatingContactWidgetProps {
  settings: SiteSettings;
}

export default function FloatingContactWidget({ settings }: FloatingContactWidgetProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const waNumber = settings.whatsapp_number || '919825012345';

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="p-3 rounded-full bg-neutral-900/90 hover:bg-gold-500 text-neutral-400 hover:text-black border border-gold-500/30 transition-all duration-300 shadow-luxury hover:scale-110 active:scale-95 group animate-fade-in-scale backdrop-blur-md"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${waNumber}?text=Hello%20Free%20Bird%20Salon%20%26%20Academy,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border border-emerald-400/40"
        title="Chat with Master Stylist Team on WhatsApp"
      >
        {/* Soft Breathing Ambient Glow Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-75" />

        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-neutral-900/95 border border-gold-500/30 text-cream-100 text-xs font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          💬 Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

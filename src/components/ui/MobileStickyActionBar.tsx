'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';

interface MobileStickyActionBarProps {
  phone?: string;
  whatsappNumber?: string;
}

export default function MobileStickyActionBar({
  phone = '+91 98250 12345',
  whatsappNumber = '919825012345',
}: MobileStickyActionBarProps) {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const cleanWa = whatsappNumber.replace(/[^\d]/g, '');

  const whatsappMessage = encodeURIComponent(
    'Hello Rajesh Sir / Free Bird Salon! I want to consult and book a VIP appointment from your website.'
  );
  const whatsappUrl = `https://wa.me/${cleanWa}?text=${whatsappMessage}`;

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-obsidian-950/95 backdrop-blur-xl border-t border-gold-500/25 px-3 py-2 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* 1. Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-obsidian-900 border border-neutral-800 text-neutral-200 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-gold-400 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call Now</span>
        </a>

        {/* 2. WhatsApp Direct Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5 fill-emerald-400/20" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* 3. Instant Book Look CTA */}
        <a
          href="#booking"
          onClick={scrollToBooking}
          className="btn-shine-sweep flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-gold-500 text-black active:scale-95 transition-all text-center shadow-luxury-gold font-sans"
        >
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span className="text-[11px] font-black uppercase tracking-wider">Book VIP</span>
          </div>
          <span className="text-[8px] font-bold tracking-tight opacity-90">Instant Slot</span>
        </a>
      </div>
    </div>
  );
}

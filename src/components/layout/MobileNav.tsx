'use client';

import React from 'react';
import Link from 'next/link';
import { X, Phone, MessageSquare, MapPin, Calendar, Sparkles, GraduationCap } from 'lucide-react';
import { MenuItem, SiteSettings } from '@/types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  settings: SiteSettings;
}

export default function MobileNav({
  isOpen,
  onClose,
  menuItems,
  settings,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-obsidian-950 border-l border-gold-500/20 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <img src="/images/logo.svg" alt={settings.site_name} className="h-9 w-auto" />
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-base font-medium text-cream-200 hover:text-gold-400 hover:bg-gold-500/10 transition-colors flex items-center justify-between"
              >
                <span>{item.title}</span>
                <span className="text-gold-500/40 text-xs">→</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom CTA & Quick Contacts */}
        <div className="mt-8 pt-6 border-t border-neutral-800 space-y-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-center text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>

          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${settings.phone}`}
              className="p-3 rounded-full bg-neutral-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-black transition-colors"
              title="Call Studio"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp_number}?text=Hello%20Free%20Bird%20Salon,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-neutral-900 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
              title="WhatsApp Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[11px] text-center text-neutral-500">
            Vadodara, Gujarat • Open Daily 10 AM - 9 PM
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, Phone, Calendar, Sparkles, User, ShoppingBag } from 'lucide-react';
import { MenuItem, SiteSettings } from '@/types';
import SearchModal from './SearchModal';
import MobileNav from './MobileNav';

interface HeaderProps {
  settings: SiteSettings;
  menuItems: MenuItem[];
}

export default function Header({ settings, menuItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian-950/95 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-obsidian-950 via-obsidian-950/80 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/images/logo.svg"
              alt={settings.site_name}
              className="h-9 sm:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links (Clean & Spacious for 1280px+ screens) */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url));
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`px-3 py-1.5 rounded-full text-xs 2xl:text-sm font-medium tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40 shadow-sm'
                      : 'text-cream-200 hover:text-gold-300 hover:bg-white/5'
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 2xl:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full bg-neutral-900/80 hover:bg-gold-500 hover:text-black border border-gold-500/25 text-gold-400 transition-all shadow-md shrink-0"
              title="Search website"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Phone Call (Desktop Pill on 2xl, Phone icon on xl) */}
            <a
              href={`tel:${settings.phone}`}
              className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-700/80 text-neutral-300 hover:text-gold-400 hover:border-gold-500/40 text-xs font-semibold tracking-wider transition-all whitespace-nowrap shrink-0"
              title={`Call ${settings.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`tel:${settings.phone}`}
              className="hidden xl:flex 2xl:hidden p-2.5 rounded-full bg-neutral-900/80 border border-neutral-700/80 text-neutral-300 hover:text-gold-400 hover:border-gold-500/40 transition-all shrink-0"
              title={`Call ${settings.phone}`}
            >
              <Phone className="w-4 h-4 text-gold-400" />
            </a>

            {/* Book Appointment CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-[11px] sm:text-xs tracking-wider uppercase hover:shadow-luxury-gold transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">Book Appointment</span>
              <span className="xs:hidden">Book</span>
            </Link>

            {/* Mobile / Tablet Menu Hamburger (Visible on all screens below xl) */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="xl:hidden p-2 sm:p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-cream-200 hover:text-gold-400 transition-colors shrink-0"
              title="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Instant Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        menuItems={menuItems}
        settings={settings}
      />
    </>
  );
}

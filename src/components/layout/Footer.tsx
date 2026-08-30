'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin, MessageSquare, Clock, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { MenuItem, SiteSettings, Branch } from '@/types';

interface FooterProps {
  settings: SiteSettings;
  footerCol1: MenuItem[];
  footerCol2: MenuItem[];
  footerCol3: MenuItem[];
}

export default function Footer({
  settings,
  footerCol1,
  footerCol2,
  footerCol3,
}: FooterProps) {
  let branches: Branch[] = [];
  try {
    if (settings.branches_json) {
      branches = JSON.parse(settings.branches_json);
    }
  } catch (e) {
    branches = [];
  }

  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/20 text-neutral-400 text-sm">
      {/* Top Banner / Salon Highlights */}
      <div className="border-b border-neutral-800/80 py-8 bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/10">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-cream-100 font-bold text-xs uppercase tracking-wider">Master Stylists</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Led by Founder Rajesh Joshi</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/10">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-cream-100 font-bold text-xs uppercase tracking-wider">Certified Products</h4>
              <p className="text-xs text-neutral-400 mt-0.5">100% Authentic Italian & French Formulas</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/10">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-cream-100 font-bold text-xs uppercase tracking-wider">Open 7 Days</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{settings.business_hours}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/10">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-cream-100 font-bold text-xs uppercase tracking-wider">3 Studios in Vadodara</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Ajwa Road, Kendranagar &amp; Sayajipura</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img src="/images/logo.svg" alt={settings.site_name} className="h-11 w-auto" />
            </Link>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              {settings.tagline}. Vadodara&apos;s premier destination for custom hair transformations, Russian Nano-Plastia, French Balayage, HD bridal artistry, and certified cosmetology diplomas.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black text-gold-400 border border-gold-500/20 transition-all shadow"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black text-gold-400 border border-gold-500/20 transition-all shadow"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.social_youtube && (
                <a
                  href={settings.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black text-gold-400 border border-gold-500/20 transition-all shadow"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number}?text=Hello%20Free%20Bird%20Salon,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/20 transition-all shadow"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Links Col 1: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-sans">
              Services &amp; Academy
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerCol1.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-neutral-400 hover:text-cream-100 hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2: Shop & Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-sans">
              Shop &amp; Offers
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerCol2.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-neutral-400 hover:text-cream-100 hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 3: Contact & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4 font-sans">
              Contact &amp; Studio
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerCol3.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-neutral-400 hover:text-cream-100 hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 text-gold-400 hover:underline">
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.phone}</span>
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 text-neutral-400 hover:underline">
                <Mail className="w-3.5 h-3.5" />
                <span>{settings.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-neutral-800/80 py-6 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {settings.site_name} (Founder Rajesh Joshi). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/pages/privacy-policy" className="hover:text-neutral-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/pages/faq" className="hover:text-neutral-300">
              FAQs
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="text-gold-500/70 hover:text-gold-400">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

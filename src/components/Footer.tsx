'use client';

import { Scissors, MapPin, Phone, Mail } from "lucide-react";
import { useLenis } from 'lenis/react';

export default function Footer() {
  const lenis = useLenis();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis && target.startsWith('#')) {
      lenis.scrollTo(target, { offset: -80, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-900 text-brand-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-brand-800 pb-12">
        {/* Brand */}
        <div className="space-y-6">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center space-x-2 text-brand-100">
            <Scissors className="w-8 h-8" />
            <span className="text-3xl font-serif font-bold tracking-wider">Free Bird Saloon</span>
          </a>
          <p className="text-brand-300 text-sm leading-relaxed max-w-xs">
            Experience luxury grooming and self-care in the heart of Baroda. Where style meets sophistication.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-brand-300 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-brand-300 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="text-brand-300 hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-serif mb-6 text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'About', 'Services', 'Offers', 'Testimonials'].map((link) => {
              const href = `#${link.toLowerCase()}`;
              return (
                <li key={link}>
                  <a href={href} onClick={(e) => handleSmoothScroll(e, href)} className="text-brand-300 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-serif mb-6 text-white uppercase tracking-wider">Our Services</h4>
          <ul className="space-y-4">
            {['Haircut & Styling', 'Hair Spa', 'Coloring & Highlights', 'Facial Treatments', 'Manicure & Pedicure', 'Bridal Makeup'].map((service) => (
              <li key={service}>
                <span className="text-brand-300 text-sm">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-serif mb-6 text-white uppercase tracking-wider">Visit Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span className="text-brand-300 text-sm">Vaghodia Road,<br />Baroda, Gujarat</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-500 shrink-0" />
              <span className="text-brand-300 text-sm">9898678440</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brand-500 shrink-0" />
              <span className="text-brand-300 text-sm">hello@free-bird-saloon.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-brand-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Free Bird Saloon. All rights reserved.</p>
      </div>
    </footer>
  );
}

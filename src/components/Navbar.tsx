'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Offers', href: '#offers' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (lenis && target.startsWith('#')) {
      lenis.scrollTo(target, { offset: -80, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center space-x-2">
            <Scissors className={`w-8 h-8 transition-colors duration-500 ${scrolled ? 'text-brand-800' : 'text-white'}`} />
            <span className={`text-2xl font-serif font-bold transition-colors duration-500 ${scrolled ? 'text-brand-900' : 'text-white'}`}>
              xSaloon
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand-500 ${
                  scrolled ? 'text-brand-900' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#book"
              onClick={(e) => handleSmoothScroll(e, '#book')}
              className="px-6 py-2.5 bg-brand-500 text-white text-sm font-medium uppercase tracking-widest hover:bg-brand-600 transition-colors"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-brand-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-brand-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-6 py-3 text-brand-900 hover:bg-brand-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#book"
                onClick={(e) => handleSmoothScroll(e, '#book')}
                className="mx-6 mt-4 px-6 py-3 bg-brand-500 text-white text-center font-medium hover:bg-brand-600 transition-colors"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

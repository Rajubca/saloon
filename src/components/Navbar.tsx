'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Scissors className={`w-8 h-8 ${scrolled ? 'text-brand-800' : 'text-white'}`} />
            <span className={`text-2xl font-serif font-bold ${scrolled ? 'text-brand-900' : 'text-white'}`}>
              xSaloon
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand-500 ${
                  scrolled ? 'text-brand-900' : 'text-white/90'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#book"
              className="px-6 py-2.5 bg-brand-500 text-white text-sm font-medium uppercase tracking-widest hover:bg-brand-600 transition-colors"
            >
              Book Now
            </Link>
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
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-brand-900 hover:bg-brand-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#book"
                onClick={() => setIsOpen(false)}
                className="mx-6 mt-4 px-6 py-3 bg-brand-500 text-white text-center font-medium hover:bg-brand-600 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

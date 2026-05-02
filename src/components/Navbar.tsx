"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    let rafId: number;
    const throttledScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex flex-col z-50">
          <span className="text-2xl font-serif text-brand-300 tracking-wider">FREE BIRD</span>
          <span className="text-[0.65rem] tracking-[0.3em] text-brand-500 uppercase mt-1">Luxury Salon</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-brand-500 ${
                pathname === link.href ? 'text-brand-500 font-medium' : 'text-brand-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" className="ml-4">
             <Link href="/booking">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-50 text-brand-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-brand-900 flex flex-col items-center justify-center gap-8 lg:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-2xl font-serif tracking-wider hover:text-brand-500 ${
                  pathname === link.href ? 'text-brand-500' : 'text-brand-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-8" onClick={() => setIsMobileMenuOpen(false)}>
               <Link href="/booking">Book Appointment</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

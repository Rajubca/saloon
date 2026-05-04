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

  const leftLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ];

  const rightLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
  ];

  // Mobile gets all links plus contact
  const allLinks = [...leftLinks, ...rightLinks, { name: 'Contact', href: '/contact' }];

  return (
    <>
      {/* Desktop Header - Floating Pill on Scroll */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center hidden lg:flex ${
          isScrolled ? 'pt-4 px-4' : 'pt-8 px-8'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'w-full max-w-5xl bg-brand-900/60 backdrop-blur-md rounded-full px-8 py-3 shadow-2xl shadow-brand-900/50'
              : 'w-full max-w-7xl bg-transparent px-4 py-2 border-b border-transparent'
          }`}
        >
          {/* Left Links */}
          <div className="flex items-center gap-10 flex-1 justify-end pr-10">
            {leftLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === link.href ? 'text-brand-400' : 'text-brand-100 group-hover:text-brand-300'
                }`}>
                  {link.name}
                </span>
                {/* Animated sliding dot */}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500 transition-all duration-300 ${
                  pathname === link.href ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex flex-col items-center flex-shrink-0 group relative px-4">
            <span className={`font-serif tracking-[0.15em] transition-all duration-500 ${
              isScrolled ? 'text-xl text-brand-300' : 'text-3xl text-brand-200'
            }`}>
              FREE BIRD
            </span>
            <span className={`text-brand-500 uppercase tracking-[0.3em] transition-all duration-500 ${
              isScrolled ? 'text-[0.5rem] mt-0.5' : 'text-[0.65rem] mt-1'
            }`}>
              Luxury Salon
            </span>
          </Link>

          {/* Right Links & CTA */}
          <div className="flex items-center gap-10 flex-1 justify-start pl-10">
            {rightLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === link.href ? 'text-brand-400' : 'text-brand-100 group-hover:text-brand-300'
                }`}>
                  {link.name}
                </span>
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500 transition-all duration-300 ${
                  pathname === link.href ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </Link>
            ))}

            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="relative group py-2"
              >
                <span className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === '/contact' ? 'text-brand-400' : 'text-brand-100 group-hover:text-brand-300'
                }`}>
                  Contact
                </span>
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500 transition-all duration-300 ${
                  pathname === '/contact' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </Link>
              <Button asChild variant="outline" size="sm" className="border-brand-600/50 text-brand-300 hover:bg-brand-500 hover:text-brand-900 rounded-full px-6 py-0 h-9 transition-all duration-300">
                 <Link href="/booking">Book</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${
        isScrolled ? 'bg-brand-900/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="px-6 flex justify-between items-center relative z-50">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-serif text-brand-300 tracking-wider">FREE BIRD</span>
          </Link>

          <button
            className="text-brand-300 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Full-screen Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-brand-950 flex flex-col items-center justify-center -z-10"
            >
              {/* Decorative background element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-brand-800/20 rounded-full pointer-events-none opacity-50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border-[1px] border-brand-800/40 rounded-full pointer-events-none opacity-50" />

              <div className="flex flex-col items-center gap-8 relative z-10 w-full px-6 mt-16">
                {allLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className={`text-4xl font-serif tracking-wide block py-2 ${
                        pathname === link.href ? 'text-brand-400 italic' : 'text-brand-100'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (allLinks.length * 0.1), duration: 0.5 }}
                  className="w-full mt-8"
                >
                  <Button asChild size="lg" className="w-full rounded-full h-14 text-lg bg-brand-500 text-brand-950">
                     <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

export default function StickyBooking() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let ticking = false;
    let frameId: number;

    const handleScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(() => {
          // Show sticky button only after scrolling past the hero section
          const heroHeight = document.getElementById('home')?.offsetHeight || 600;
          setIsVisible(window.scrollY > heroHeight && window.scrollY < document.body.scrollHeight - 1000);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollToBook = () => {
    if (lenis) {
      lenis.scrollTo('#book', { offset: -80, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 w-full z-40 p-4 md:hidden bg-gradient-to-t from-white via-white/90 to-transparent pb-6"
        >
          <button
            onClick={scrollToBook}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-2xl transition-all duration-300"
          >
            Book Appointment
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

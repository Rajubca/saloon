'use client';

import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

export default function Hero() {
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
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2021/08/04/83897-584742456_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-900/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="block text-brand-300 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium"
        >
          Welcome to
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold mb-8 tracking-wide"
        >
          xSaloon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-lg md:text-xl text-brand-100 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Experience premium grooming, relaxation, and self-care on Vaghodia Road, Baroda. Where your style meets our sophistication.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#book"
            onClick={(e) => handleSmoothScroll(e, '#book')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white uppercase tracking-widest text-sm font-semibold transition-all duration-300"
          >
            Book Appointment
          </a>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, '#services')}
            className="w-full sm:w-auto px-8 py-4 border border-white text-white hover:bg-white hover:text-brand-900 uppercase tracking-widest text-sm font-semibold transition-all duration-300"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-white/40"
        />
      </motion.div>
    </section>
  );
}

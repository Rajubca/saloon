"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { ChevronDown, Music, } from 'lucide-react';

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        {/* Placeholder for video/image */}
        <div className="absolute inset-0 bg-brand-800/20 bg-wood-texture z-0 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 via-brand-900/60 to-brand-900 z-0" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-5xl md:text-8xl font-serif text-brand-600 mb-6 drop-shadow-2xl"
          >
            FREE BIRD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="text-xl md:text-3xl text-brand-100 mb-12 font-light tracking-wide text-neon"
          >
            Where Music Flies Free
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/menu" className="bg-brand-600 text-brand-900 px-8 py-4 font-semibold uppercase tracking-wider hover:bg-brand-500 transition-colors">
              Explore Menu
            </Link>
            <Link href="/events" className="border border-brand-600 text-brand-600 px-8 py-4 font-semibold uppercase tracking-wider hover:bg-brand-600/10 transition-colors border-neon">
              Live Events
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        >
          <ChevronDown size={32} className="text-brand-600" />
        </motion.div>
      </section>

      {/* Featured Events */}
      <section className="py-24 px-6 bg-brand-900 border-t border-brand-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-600 mb-4">Live This Week</h2>
            <div className="h-1 w-24 bg-brand-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-brand-800/30 border border-brand-600/20 p-6 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-brand-900 px-3 py-1 border border-brand-600/50 text-brand-600 text-sm">
                    FRI, OCT {10 + i}
                  </div>
                  <Music className="text-brand-400 group-hover:text-brand-600 transition-colors" />
                </div>
                <h3 className="text-2xl font-serif text-brand-100 mb-2">Neon Nights</h3>
                <p className="text-brand-400 mb-4">Local country rock band performing live covers.</p>
                <Link href="/events" className="text-brand-600 text-sm uppercase tracking-wider hover:text-brand-700 flex items-center gap-2">
                  View Details <ChevronDown size={14} className="-rotate-90" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6 bg-brand-800/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif text-brand-600 mb-6">The Legend</h2>
            <p className="text-brand-300 text-lg mb-6 leading-relaxed">
              Step into a world where modern luxury meets rustic charm. Free Bird Saloon isn&apos;t just a bar; it&apos;s an experience. We pour the finest spirits, serve bold flavors, and host the city&apos;s best live music.
            </p>
            <Link href="/about" className="inline-block border-b-2 border-brand-600 text-brand-100 pb-1 hover:text-brand-600 transition-colors uppercase tracking-wider">
              Read Our Story
            </Link>
          </div>
          <div className="h-96 bg-brand-800/40 border border-brand-600/20 relative flex items-center justify-center">
             <span className="text-brand-600/50 font-serif">Interior Image</span>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

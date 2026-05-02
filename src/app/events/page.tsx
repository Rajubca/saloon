"use client";

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Events() {
  return (
    <PageTransition>
      <div className="pt-12 pb-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif text-brand-600 mb-16 text-center text-neon">Live Music</h1>

        {/* Featured Event / Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-800/30 border border-brand-600/50 p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calendar size={200} />
          </div>
          <div className="relative z-10">
            <span className="bg-brand-600 text-brand-900 px-3 py-1 uppercase text-sm font-bold tracking-wider mb-6 inline-block">Featured</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-100 mb-4">The Midnight Riders</h2>
            <p className="text-xl text-brand-400 mb-8 max-w-2xl">A spectacular night of southern rock and blues. Don&apos;t miss the biggest event of the month.</p>

            <div className="flex gap-4 md:gap-8 mb-8">
              {['02', '14', '45', '10'].map((num, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-5xl font-serif text-brand-600 border border-brand-600/30 p-4 bg-brand-900/50 w-20 md:w-24 border-neon">
                    {num}
                  </div>
                  <div className="text-xs text-brand-400 mt-2 uppercase tracking-widest">
                    {['Days', 'Hours', 'Mins', 'Secs'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upcoming List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif text-brand-600 mb-8 border-b border-brand-800 pb-4">Upcoming Schedule</h3>

          {[
            { date: "Oct 15", band: "Acoustic Sunset", time: "8:00 PM" },
            { date: "Oct 18", band: "Neon Cowboys", time: "9:00 PM" },
            { date: "Oct 22", band: "Blues Brother Tribute", time: "8:30 PM" }
          ].map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-center justify-between p-6 border border-brand-800 hover:border-brand-600/50 transition-colors bg-brand-900"
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                <div className="text-center shrink-0">
                  <div className="text-sm text-brand-600 uppercase">Oct</div>
                  <div className="text-3xl font-serif text-brand-100">{event.date.split(' ')[1]}</div>
                </div>
                <div>
                  <h4 className="text-xl font-serif text-brand-100">{event.band}</h4>
                  <p className="text-brand-400">{event.time}</p>
                </div>
              </div>
              <button className="border border-brand-600 text-brand-600 px-6 py-2 uppercase text-sm tracking-wider hover:bg-brand-600 hover:text-brand-900 transition-colors w-full md:w-auto">
                Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

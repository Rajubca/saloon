'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const instaPosts = [
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2572&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2576&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop',
];

export default function CameraFeed() {
  return (
    <section className="py-24 bg-brand-50 border-t border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-3xl md:text-4xl font-serif text-brand-900 font-bold mb-2"
            >
              Follow Our Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-brand-600"
            >
              @xSaloon_Baroda
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            href="#"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-brand-900 text-white hover:bg-brand-800 transition-colors rounded-full text-sm font-medium uppercase tracking-widest"
          >
            <Camera className="w-4 h-4" />
            <span>Follow Us</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instaPosts.map((post, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="relative aspect-square overflow-hidden group block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${post}")` }}
              />
              <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

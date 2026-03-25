'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Hair Care', 'Skin Care', 'Bridal', 'Nails'];

const servicesData: Record<string, { title: string, desc: string, price: string, img: string }[]> = {
  'Hair Care': [
    { title: 'Precision Haircut', desc: 'Expert cutting tailored to your face shape.', price: '₹250+', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2576&auto=format&fit=crop' },
    { title: 'Luxury Hair Spa', desc: 'Deep conditioning treatment that nourishes the roots.', price: '₹800+', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop' },
    { title: 'Coloring & Highlights', desc: 'Vibrant, long-lasting color from subtle to complete transformations.', price: '₹1200+', img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2636&auto=format&fit=crop' },
  ],
  'Skin Care': [
    { title: 'Signature Facial', desc: 'Rejuvenating skincare tailored to your skin type.', price: '₹500+', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop' },
    { title: 'Anti-Aging Therapy', desc: 'Restore youthfulness and elasticity to your skin.', price: '₹1500+', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=2670&auto=format&fit=crop' },
    { title: 'Deep Pore Cleansing', desc: 'Removes impurities and unclogs pores effectively.', price: '₹800+', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2670&auto=format&fit=crop' },
  ],
  'Bridal': [
    { title: 'Pre-Bridal Package', desc: 'Comprehensive prep including facials, waxing, and spa.', price: '₹5000+', img: 'https://images.unsplash.com/photo-1505934333218-8fe21ff88d08?q=80&w=2669&auto=format&fit=crop' },
    { title: 'Bridal Makeup', desc: 'Flawless, long-wearing makeup application for your special day.', price: '₹8000+', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2671&auto=format&fit=crop' },
    { title: 'Party Makeup', desc: 'Elegant and sophisticated looks for bridesmaids and guests.', price: '₹2500+', img: 'https://images.unsplash.com/photo-1512496015851-a1fbcf6ce8d2?q=80&w=2671&auto=format&fit=crop' },
  ],
  'Nails': [
    { title: 'Classic Manicure', desc: 'Complete nail care including shaping, cuticle work, and polish.', price: '₹400+', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop' },
    { title: 'Spa Pedicure', desc: 'Relaxing foot soak, scrub, massage, and expert polish application.', price: '₹600+', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop' },
    { title: 'Gel Extensions', desc: 'Durable, beautiful extensions with custom nail art available.', price: '₹1500+', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop' },
  ],
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 uppercase tracking-widest text-sm font-semibold mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-4xl md:text-5xl font-serif text-brand-900 font-bold"
          >
            Signature Services
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3 + (idx * 0.1), ease: [0.25, 0.1, 0.25, 1.0] }}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-900 text-white shadow-lg'
                  : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {servicesData[activeCategory].map((service) => (
                <div key={service.title} className="group cursor-pointer">
                  <div className="relative h-80 overflow-hidden mb-6 rounded-xl">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${service.img}")` }}
                    />
                    <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white font-serif italic text-2xl drop-shadow-lg">Discover</span>
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-serif text-brand-900 font-bold">{service.title}</h3>
                      <span className="text-brand-600 font-medium">{service.price}</span>
                    </div>
                    <p className="text-brand-700 leading-relaxed text-sm">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

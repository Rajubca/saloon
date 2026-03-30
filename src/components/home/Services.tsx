'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['Hair Care', 'Skin Care', 'Bridal', 'Nails'];

interface ServiceItem {
  title: string;
  desc: string;
  price: string;
  img: string;
  gallery: string[];
}

const servicesData: Record<string, ServiceItem[]> = {
  'Hair Care': [
    {
      title: 'Precision Haircut',
      desc: 'Expert cutting tailored to your face shape.',
      price: '₹250+',
      img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2576&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2576&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2572&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop'
      ]
    },
    {
      title: 'Luxury Hair Spa',
      desc: 'Deep conditioning treatment that nourishes the roots.',
      price: '₹800+',
      img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2670&auto=format&fit=crop'
      ]
    },
    {
      title: 'Coloring & Highlights',
      desc: 'Vibrant, long-lasting color from subtle to complete transformations.',
      price: '₹1200+',
      img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2636&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2636&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=2574&auto=format&fit=crop'
      ]
    },
  ],
  'Skin Care': [
    {
      title: 'Signature Facial',
      desc: 'Rejuvenating skincare tailored to your skin type.',
      price: '₹500+',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=2670&auto=format&fit=crop'
      ]
    },
    {
      title: 'Anti-Aging Therapy',
      desc: 'Restore youthfulness and elasticity to your skin.',
      price: '₹1500+',
      img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=2670&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2670&auto=format&fit=crop'
      ]
    },
    {
      title: 'Deep Pore Cleansing',
      desc: 'Removes impurities and unclogs pores effectively.',
      price: '₹800+',
      img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2670&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop'
      ]
    },
  ],
  'Bridal': [
    {
      title: 'Pre-Bridal Package',
      desc: 'Comprehensive prep including facials, waxing, and spa.',
      price: '₹5000+',
      img: 'https://images.unsplash.com/photo-1505934333218-8fe21ff88d08?q=80&w=2669&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1505934333218-8fe21ff88d08?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512496015851-a1fbcf6ce8d2?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2671&auto=format&fit=crop'
      ]
    },
    {
      title: 'Bridal Makeup',
      desc: 'Flawless, long-wearing makeup application for your special day.',
      price: '₹8000+',
      img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2671&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505934333218-8fe21ff88d08?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512496015851-a1fbcf6ce8d2?q=80&w=2671&auto=format&fit=crop'
      ]
    },
    {
      title: 'Party Makeup',
      desc: 'Elegant and sophisticated looks for bridesmaids and guests.',
      price: '₹2500+',
      img: 'https://images.unsplash.com/photo-1512496015851-a1fbcf6ce8d2?q=80&w=2671&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1512496015851-a1fbcf6ce8d2?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505934333218-8fe21ff88d08?q=80&w=2669&auto=format&fit=crop'
      ]
    },
  ],
  'Nails': [
    {
      title: 'Classic Manicure',
      desc: 'Complete nail care including shaping, cuticle work, and polish.',
      price: '₹400+',
      img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop'
      ]
    },
    {
      title: 'Spa Pedicure',
      desc: 'Relaxing foot soak, scrub, massage, and expert polish application.',
      price: '₹600+',
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop'
      ]
    },
    {
      title: 'Gel Extensions',
      desc: 'Durable, beautiful extensions with custom nail art available.',
      price: '₹1500+',
      img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2669&auto=format&fit=crop'
      ]
    },
  ],
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const openModal = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedService) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedService.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedService) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedService.gallery.length) % selectedService.gallery.length);
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-white relative">
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
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
                <button
                  key={service.title}
                  className="group cursor-pointer block w-full h-full text-left focus:outline-none focus:ring-4 focus:ring-brand-500 focus:ring-offset-2 rounded-xl"
                  onClick={() => openModal(service)}
                  aria-label={`View details for ${service.title}`}
                >
                  <div className="relative h-80 overflow-hidden mb-6 rounded-xl pointer-events-none">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${service.img}")` }}
                    />
                    <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                      <span className="text-white font-serif italic text-2xl drop-shadow-lg mb-2">Discover</span>
                      <span className="text-white/80 text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">View Gallery</span>
                    </div>
                  </div>

                  <div className="px-2 pointer-events-none">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-2xl font-serif text-brand-900 font-bold">{service.title}</h3>
                      <span className="text-brand-600 font-medium">{service.price}</span>
                    </div>
                    <p className="text-brand-700 leading-relaxed text-sm">
                      {service.desc}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Popup Slider Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-900/95 backdrop-blur-sm p-4 md:p-8"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              aria-label="Close details"
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 bg-brand-800/50 rounded-full hover:bg-brand-800 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>

            <div
              className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Image Slider Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-brand-800 flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedService.gallery[currentImageIndex]}
                    alt={`${selectedService.title} preview ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-left pointer-events-none">
                  <span className="text-brand-300 uppercase tracking-widest text-xs font-bold mb-2 block drop-shadow-md">
                    {activeCategory}
                  </span>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mb-3 drop-shadow-lg">
                        {selectedService.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base max-w-2xl drop-shadow-md">
                        {selectedService.desc}
                      </p>
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg shrink-0 pl-4">
                      {selectedService.price}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                  {selectedService.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                      aria-label={`Go to image ${idx + 1}`}
                      aria-current={idx === currentImageIndex ? "true" : undefined}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

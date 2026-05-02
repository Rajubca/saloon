"use client";

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholders that can be replaced later
  const images = Array.from({ length: 9 }).map((_, i) => `/assets/gallery-${i + 1}.jpg`);

  return (
    <PageTransition>
      <div className="pt-12 pb-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-brand-600 mb-16 text-center text-neon">Gallery</h1>

        {/* CSS Column Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden border border-brand-800"
              onClick={() => setSelectedImage(i)}
            >
              {/* Fallback solid background if image fails/missing */}
              <div className="w-full h-64 bg-brand-800/50 flex items-center justify-center">
                 <span className="text-brand-600/30">Image {i + 1}</span>
              </div>
              <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-brand-100 font-serif border border-brand-100 px-4 py-2">View</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-brand-300 hover:text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-4xl h-[80vh] bg-brand-800 flex items-center justify-center border border-brand-600/30"
                onClick={(e) => e.stopPropagation()}
              >
                 <span className="text-brand-400 font-serif text-2xl">Image {selectedImage + 1} Full View</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

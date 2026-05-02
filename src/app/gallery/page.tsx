"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Dialog, DialogContent, } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog"

const galleryImages = [
  { id: 1, category: "Bridal", src: "/assets/g1.jpg", alt: "Bridal Makeup 1" },
  { id: 2, category: "Hair", src: "/assets/g2.jpg", alt: "Hair Styling 1" },
  { id: 3, category: "Makeup", src: "/assets/g3.jpg", alt: "Party Makeup 1" },
  { id: 4, category: "Bridal", src: "/assets/g4.jpg", alt: "Bridal Makeup 2" },
  { id: 5, category: "Hair", src: "/assets/g5.jpg", alt: "Hair Styling 2" },
  { id: 6, category: "Makeup", src: "/assets/g6.jpg", alt: "Party Makeup 2" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = filter === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-100 mb-6">Our <span className="text-gradient">Portfolio</span></h1>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["All", "Bridal", "Hair", "Makeup"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                filter === cat
                  ? 'bg-brand-500 text-brand-900 font-medium'
                  : 'bg-transparent border border-brand-800 text-brand-400 hover:border-brand-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg border border-brand-800/50 bg-brand-900/50"
                onClick={() => setSelectedImage(img.id)}
              >
                <div className="w-full h-80 flex items-center justify-center bg-brand-900/30">
                  <span className="text-brand-800 font-serif">{img.alt} Placeholder</span>
                </div>
                <div className="absolute inset-0 bg-brand-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-brand-500 font-serif border border-brand-500 px-6 py-2 rounded-full tracking-wider uppercase text-sm">View</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none">
            <DialogPrimitive.Title className="sr-only">Image View</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">Full screen view of gallery image.</DialogPrimitive.Description>
            <div className="w-full aspect-video bg-brand-900 flex items-center justify-center rounded-lg border border-brand-800 relative">
               <span className="text-brand-500 font-serif text-2xl">Image {selectedImage} Full View</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}

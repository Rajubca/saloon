"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog"

// Map the downloaded files to categories randomly or specifically
const galleryImages = [
  { id: 1, category: "Bridal", src: "/assets/real/18-gallery.jpg", alt: "Bridal Makeup" },
  { id: 2, category: "Hair", src: "/assets/real/20-gallery.jpg", alt: "Hair Styling" },
  { id: 3, category: "Makeup", src: "/assets/real/201-gallery.jpg", alt: "Party Makeup" },
  { id: 4, category: "Bridal", src: "/assets/real/22-gallery.jpg", alt: "Bridal Session" },
  { id: 5, category: "Hair", src: "/assets/real/23-gallery.jpg", alt: "Hair Coloring" },
  { id: 6, category: "Makeup", src: "/assets/real/25-gallery.jpg", alt: "Makeup Look" },
  { id: 7, category: "Bridal", src: "/assets/real/251-gallery.jpg", alt: "Bridal Preparation" },
  { id: 8, category: "Hair", src: "/assets/real/252-gallery.jpg", alt: "Hair Cut" },
  { id: 9, category: "Makeup", src: "/assets/real/26-gallery.jpg", alt: "Glam Makeup" },
  { id: 10, category: "Bridal", src: "/assets/real/261-gallery.jpg", alt: "Bridal Look" },
  { id: 11, category: "Hair", src: "/assets/real/262-gallery.jpg", alt: "Hair Styling" },
  { id: 12, category: "Makeup", src: "/assets/real/27-gallery.jpg", alt: "Party Makeup" },
  { id: 13, category: "Bridal", src: "/assets/real/271-gallery.jpg", alt: "Bridal Special" },
  { id: 14, category: "Hair", src: "/assets/real/272-gallery.jpg", alt: "Hair Spa" },
  { id: 15, category: "Makeup", src: "/assets/real/28-gallery.jpg", alt: "Evening Makeup" },
  { id: 16, category: "Bridal", src: "/assets/real/281-gallery.jpg", alt: "Wedding Look" },
  { id: 17, category: "Hair", src: "/assets/real/282-gallery.jpg", alt: "Hair Treatment" },
  { id: 18, category: "Makeup", src: "/assets/real/29-gallery.jpg", alt: "Photoshoot Makeup" },
  { id: 19, category: "Bridal", src: "/assets/real/291-gallery.jpg", alt: "Bridal Trial" },
  { id: 20, category: "Hair", src: "/assets/real/30-gallery.jpg", alt: "Blowdry" },
  { id: 21, category: "Makeup", src: "/assets/real/301-gallery.jpg", alt: "Subtle Makeup" },
  { id: 22, category: "Bridal", src: "/assets/real/302-gallery.jpg", alt: "Bridal Hair" },
  { id: 23, category: "Hair", src: "/assets/real/31-gallery.jpg", alt: "Creative Coloring" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

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
                onClick={() => setSelectedImage(img)}
              >
                <div className="w-full relative min-h-[300px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-brand-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <span className="text-brand-500 font-serif border border-brand-500 px-6 py-2 rounded-full tracking-wider uppercase text-sm mb-2">View</span>
                  <span className="text-brand-200 text-sm">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none flex items-center justify-center h-[90vh]">
            <DialogPrimitive.Title className="sr-only">Image View</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">Full screen view of gallery image.</DialogPrimitive.Description>
            {selectedImage && (
              <div className="w-full h-full relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}

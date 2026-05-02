"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900 overflow-hidden"
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-20 bg-wood-texture pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl text-brand-600 mb-4 tracking-widest font-serif">
              FREE BIRD
            </h1>
            <h2 className="text-xl md:text-2xl text-neon tracking-widest font-serif mb-8">
              SALOON
            </h2>
            <motion.div
              className="h-1 w-48 bg-brand-200 mx-auto rounded overflow-hidden"
            >
              <motion.div
                className="h-full bg-brand-700"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 2, ease: [0.25, 0.1, 0.25, 1.0] }}
      href="https://wa.me/919898678440?text=Hello%20Free%20Bird%20Saloon!%20I%20would%20like%20to%20book%20an%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
}

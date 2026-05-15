"use client";

import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";

export default function BookingClient() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl text-white mb-4">Reserve Your Time</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Book your appointment online. Our specialists are ready to provide you with an unforgettable experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <BookingForm />
        </motion.div>
      </div>
    </div>
  );
}

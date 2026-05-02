"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-brand-800 p-8 md:p-12 max-w-md w-full border border-brand-600/30 rounded-sm shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-300 hover:text-brand-100"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-serif text-brand-600 mb-2">Reserve a Table</h2>
            <p className="text-brand-300 mb-8">Join us at Free Bird Saloon.</p>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div>
                <label className="block text-sm text-brand-300 mb-1">Name</label>
                <input required type="text" className="w-full bg-brand-900 border border-brand-600/30 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-300 mb-1">Date</label>
                  <input required type="date" className="w-full bg-brand-900 border border-brand-600/30 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600 [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm text-brand-300 mb-1">Time</label>
                  <input required type="time" className="w-full bg-brand-900 border border-brand-600/30 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600 [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-brand-300 mb-1">Guests</label>
                <select className="w-full bg-brand-900 border border-brand-600/30 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600">
                  {[1,2,3,4,5,6,"7+"].map(n => <option key={n} value={n}>{n} People</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-brand-600 text-brand-900 font-semibold py-3 mt-4 hover:bg-brand-500 transition-colors">
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

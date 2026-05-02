"use client";

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <PageTransition>
      <div className="pt-12 pb-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-brand-600 mb-16 text-center text-neon">Contact Us</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 text-brand-600 mb-4 border-b border-brand-800 pb-2">
                  <MapPin size={20} />
                  <h3 className="font-serif text-xl">Location</h3>
                </div>
                <p className="text-brand-300">New Vaghodiya Road</p>
                <p className="text-brand-300">Baroda, Gujarat</p>
              </div>

              <div>
                <div className="flex items-center gap-3 text-brand-600 mb-4 border-b border-brand-800 pb-2">
                  <Phone size={20} />
                  <h3 className="font-serif text-xl">Contact</h3>
                </div>
                <p className="text-brand-300">Rajash Joshi</p>
                <p className="text-neon text-brand-600 font-bold mt-1">9898678440</p>
              </div>

              <div>
                <div className="flex items-center gap-3 text-brand-600 mb-4 border-b border-brand-800 pb-2">
                  <Clock size={20} />
                  <h3 className="font-serif text-xl">Hours</h3>
                </div>
                <p className="text-brand-300">Wed - Sun: 4PM - 2AM</p>
                <p className="text-brand-300">Mon - Tue: Closed</p>
              </div>

              <div>
                <div className="flex items-center gap-3 text-brand-600 mb-4 border-b border-brand-800 pb-2">
                  <Mail size={20} />
                  <h3 className="font-serif text-xl">Email</h3>
                </div>
                <p className="text-brand-300">info@freebirdsaloon.com</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-brand-800/30 border border-brand-600/30 flex items-center justify-center">
              <span className="text-brand-400 font-serif">Google Maps Embed Placeholder</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-800/20 p-8 border border-brand-600/30"
          >
            <h3 className="text-2xl font-serif text-brand-100 mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-brand-300 mb-2">Full Name</label>
                <input required type="text" className="w-full bg-brand-900 border border-brand-800 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-brand-300 mb-2">Email Address</label>
                <input required type="email" className="w-full bg-brand-900 border border-brand-800 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-brand-300 mb-2">Message</label>
                <textarea required rows={5} className="w-full bg-brand-900 border border-brand-800 px-4 py-3 text-brand-100 focus:outline-none focus:border-brand-600 transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full bg-transparent border border-brand-600 text-brand-600 font-semibold py-4 uppercase tracking-wider hover:bg-brand-600 hover:text-brand-900 transition-colors border-neon">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

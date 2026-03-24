'use client';

import { motion } from 'framer-motion';

export default function Location() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 uppercase tracking-widest text-sm font-semibold mb-4 block"
          >
            Find Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-4xl md:text-5xl font-serif text-brand-900 font-bold"
          >
            Visit Our Saloon
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="w-full h-[500px] bg-brand-200 rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Embedded Google Map (Placeholder iframe) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14766.702914104278!2d73.20455435!3d22.28859945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e373468dfd%3A0x6d8594ba7e4088db!2sWaghodia%20Rd%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715099395275!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-3xl font-serif font-bold text-brand-900 mb-6">Experience Luxury on Vaghodia Road</h3>
              <p className="text-brand-700 leading-relaxed text-lg mb-8">
                Nestled in the bustling heart of Baroda, xSaloon offers a tranquil escape from the city&apos;s fast pace. Easily accessible with ample parking available for our guests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-serif font-bold text-xl text-brand-900 mb-3">Address</h4>
                <p className="text-brand-600 text-sm leading-relaxed">
                  xSaloon Premium Care<br/>
                  Near Main Crossroad,<br/>
                  Vaghodia Road,<br/>
                  Baroda, Gujarat 390019
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-serif font-bold text-xl text-brand-900 mb-3">Contact</h4>
                <p className="text-brand-600 text-sm leading-relaxed mb-4">
                  For bookings and inquiries:
                </p>
                <a href="tel:+919876543210" className="block text-brand-500 font-bold hover:text-brand-700 transition-colors mb-2">
                  +91 98765 43210
                </a>
                <a href="mailto:hello@xsaloon.com" className="block text-brand-500 font-bold hover:text-brand-700 transition-colors">
                  hello@xsaloon.com
                </a>
              </div>
            </div>

            <div>
              <a
                href="https://maps.google.com/?q=Waghodia+Road,+Vadodara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white uppercase tracking-widest text-sm font-semibold transition-all duration-300 w-full sm:w-auto text-center"
              >
                Get Directions
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

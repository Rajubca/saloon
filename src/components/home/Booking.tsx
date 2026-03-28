'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Optional: Add success state or toast here later
    }, 1500);
  };

  return (
    <section id="book" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image & Text */}
          <div className="lg:w-1/2 w-full text-left order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-500 uppercase tracking-widest text-sm font-semibold mb-4 block"
            >
              Reserve Your Time
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-4xl md:text-5xl font-serif text-brand-900 font-bold mb-8"
            >
              Book an Appointment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-brand-700 text-lg leading-relaxed mb-10"
            >
              Fill out the form to schedule your visit. Our team will contact you shortly to confirm your booking and details. We recommend booking at least 24 hours in advance.
            </motion.p>

            <div className="grid grid-cols-2 gap-8 mb-8 text-brand-800">
              <div>
                <h4 className="font-serif font-bold text-xl mb-2 text-brand-900">Working Hours</h4>
                <p className="text-sm">Monday - Saturday:<br/>9:00 AM - 9:00 PM</p>
                <p className="text-sm mt-2">Sunday:<br/>10:00 AM - 6:00 PM</p>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl mb-2 text-brand-900">Walk-ins</h4>
                <p className="text-sm">Walk-ins are welcome, but appointments are highly recommended to avoid wait times.</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:w-1/2 w-full order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="bg-brand-50 p-8 md:p-12 shadow-xl border border-brand-100 rounded-2xl relative"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      maxLength={100}
                      className="w-full bg-white border border-brand-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      maxLength={20}
                      pattern="[0-9+\-\s()]+"
                      className="w-full bg-white border border-brand-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">Select Service</label>
                  <select id="service" defaultValue="" className="w-full bg-white border border-brand-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-brand-900 appearance-none cursor-pointer">
                    <option value="" disabled>Choose a service...</option>
                    <option value="haircut">Precision Haircut</option>
                    <option value="spa">Luxury Hair Spa</option>
                    <option value="color">Coloring & Highlights</option>
                    <option value="facial">Facial Treatments</option>
                    <option value="mani-pedi">Manicure & Pedicure</option>
                    <option value="bridal">Bridal Makeup</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">Date</label>
                    <input
                      id="date"
                      type="date"
                      required
                      className="w-full bg-white border border-brand-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-brand-900 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">Preferred Time</label>
                    <select id="time" defaultValue="" className="w-full bg-white border border-brand-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-brand-900 appearance-none cursor-pointer">
                      <option value="" disabled>Choose a time...</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 9PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-widest text-brand-700 mb-2">Additional Notes</label>
                  <textarea
                    id="notes"
                    rows={4}
                    maxLength={500}
                    placeholder="Any specific requests or requirements..."
                    className="w-full bg-white border border-brand-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-brand-50 font-bold uppercase tracking-widest py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:bg-brand-900 transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-100 mb-6">Book an <span className="text-gradient">Appointment</span></h1>
          <p className="text-brand-400">Secure your spot for a premium luxury experience.</p>
        </div>

        <Card className="glass-card border-brand-800/50 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-brand-300">First Name</label>
                        <Input required placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-brand-300">Last Name</label>
                        <Input required placeholder="Doe" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-brand-300">Email Address</label>
                        <Input type="email" required placeholder="jane@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-brand-300">Phone Number</label>
                        <Input type="tel" required placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-brand-300">Select Service</label>
                      <select required className="flex h-12 w-full rounded-sm border border-brand-800 bg-brand-900/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-brand-500 text-brand-50">
                        <option value="">Choose a service...</option>
                        <option value="bridal">Bridal Makeup</option>
                        <option value="party">Party Makeup</option>
                        <option value="hair">Hair Styling & Coloring</option>
                        <option value="skin">Skin Treatment</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-brand-300">Preferred Date</label>
                        <Input type="date" required className="[color-scheme:dark]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-brand-300">Preferred Time</label>
                        <Input type="time" required className="[color-scheme:dark]" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full mt-4">Confirm Booking</Button>
                  </form>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="mb-6 text-brand-500"
                >
                  <CheckCircle2 size={80} />
                </motion.div>
                <h3 className="text-3xl font-serif text-brand-100 mb-4">Request Received</h3>
                <p className="text-brand-400 mb-8 max-w-sm">
                  Thank you for choosing Free Bird Saloon. Our team will contact you shortly to confirm your appointment.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>Book Another Session</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </PageTransition>
  );
}

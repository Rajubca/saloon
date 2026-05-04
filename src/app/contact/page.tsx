"use client";

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-100 mb-6">Get in <span className="text-gradient">Touch</span></h1>
          <p className="text-brand-400 max-w-2xl mx-auto">We are here to answer your questions and help you schedule your next visit.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <Card className="bg-brand-900/30 border-brand-800/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-brand-200 mb-2">Visit Our Studio</h3>
                    <p className="text-brand-400 leading-relaxed">
                      New Vaghodiya Road<br/>
                      Baroda, Gujarat, India<br/>
                      PIN: 390019
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-8">
              <Card className="bg-brand-900/30 border-brand-800/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 mb-4">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-brand-200 mb-1">Call Us</h3>
                  <p className="text-brand-400 text-sm mb-4">Mon-Sun, 10am to 8pm</p>
                  <a href="tel:9898678440" className="text-brand-500 hover:text-brand-400 transition-colors">9898678440</a>
                </CardContent>
              </Card>

              <Card className="bg-brand-900/30 border-brand-800/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 mb-4">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-brand-200 mb-1">WhatsApp</h3>
                  <p className="text-brand-400 text-sm mb-4">Instant messaging</p>
                  <a href="https://wa.me/919898678440" className="text-brand-500 hover:text-brand-400 transition-colors">+91 9898678440</a>
                </CardContent>
              </Card>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-64 rounded-lg overflow-hidden border border-brand-800/50 relative">
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14765.419266133465!2d73.2198!3d22.2981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5fd3d8199b5%3A0x6b6697fb949219e!2sNew%20VIP%20Rd%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                 width="100%"
                 height="100%"
                 style={{ border: 0, filter: "grayscale(80%) invert(90%) contrast(1.2)" }}
                 allowFullScreen={false}
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Free Bird Saloon Location Map"
               ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-card border-brand-800/50 h-full">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl font-serif text-brand-100 mb-8">Send a Message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-300">Your Name</label>
                    <Input required placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-300">Email Address</label>
                    <Input type="email" required placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-300">Subject</label>
                    <Input required placeholder="Inquiry about bridal package" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-brand-300">Message</label>
                    <Textarea required placeholder="How can we help you?" />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

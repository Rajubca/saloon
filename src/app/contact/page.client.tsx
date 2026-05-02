"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Camera, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactClient() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit Free Bird Saloon in Baroda. Experience luxury like never before.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="bg-card border-border">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary mt-1 w-6 h-6" />
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground">
                      Free Bird Saloon<br />
                      Vaghodia Road<br />
                      Baroda, Gujarat 390019
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-primary mt-1 w-6 h-6" />
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">Contact</h3>
                    <p className="text-muted-foreground">
                      Rajash Joshi<br />
                      <a href="tel:+919898678440" className="hover:text-primary transition-colors">+91 98986 78440</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="text-primary mt-1 w-6 h-6" />
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">Hours</h3>
                    <p className="text-muted-foreground">
                      Tuesday - Sunday: 10:00 AM - 8:00 PM<br />
                      Monday: Closed
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Camera size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Globe size={20} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="h-[500px] rounded-xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.81619420556!2d73.10304561026601!3d22.322102554341995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715421523456!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

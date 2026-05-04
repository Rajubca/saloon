import Link from 'next/link';
import { Camera, Globe, AtSign, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-950 border-t border-brand-800/30 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-serif text-brand-300 mb-6">FREE BIRD</h3>
          <p className="text-brand-400 text-sm leading-relaxed mb-6">
            Unleash Your Beauty at Baroda&apos;s premier luxury bridal and makeup studio. We specialize in transforming your vision into reality.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-brand-800 flex items-center justify-center text-brand-400 hover:bg-brand-500 hover:text-brand-900 transition-colors">
              <Camera size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-brand-800 flex items-center justify-center text-brand-400 hover:bg-brand-500 hover:text-brand-900 transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-brand-800 flex items-center justify-center text-brand-400 hover:bg-brand-500 hover:text-brand-900 transition-colors">
              <AtSign size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-serif text-brand-200 mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4 text-brand-400 text-sm">
            <li><Link href="/about" className="hover:text-brand-500 transition-colors">Our Story</Link></li>
            <li><Link href="/services" className="hover:text-brand-500 transition-colors">Services</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-500 transition-colors">Gallery</Link></li>
            <li><Link href="/booking" className="hover:text-brand-500 transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif text-brand-200 mb-6 uppercase tracking-wider">Services</h4>
          <ul className="space-y-4 text-brand-400 text-sm">
            <li>Bridal Makeup</li>
            <li>Party Makeup</li>
            <li>Hair Styling & Coloring</li>
            <li>Skin Treatments</li>
            <li>Grooming</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif text-brand-200 mb-6 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-4 text-brand-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-500 shrink-0 mt-0.5" />
              <span>New Vaghodiya Road,<br/>Baroda, Gujarat, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-500 shrink-0" />
              <span>9898678440</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-500 shrink-0" />
              <span>hello@freebirdsaloon.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-brand-500/60 text-sm">
          &copy; {new Date().getFullYear()} Free Bird Saloon. All rights reserved.
        </p>
        <p className="text-brand-500/60 text-sm">
          Designed with luxury in mind.
        </p>
      </div>
    </footer>
  );
}

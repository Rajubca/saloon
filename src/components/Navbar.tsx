"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-white/10",
        isScrolled ? "bg-black/80 py-3" : "bg-black/40 py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-wider">
          FREE BIRD
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest text-foreground/80">
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/booking">
            <Button variant="default" className="uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90">
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 py-4 flex flex-col items-center space-y-4">
           <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest">Services</Link>
           <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest">Contact</Link>
           <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="bg-primary text-primary-foreground uppercase tracking-widest">Book Now</Button>
           </Link>
        </div>
      )}
    </nav>
  );
}

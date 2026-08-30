'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Calendar, Phone, Mail, User, MessageSquare, MapPin, Sparkles, Loader2, CheckCircle2, Upload } from 'lucide-react';
import { SiteSettings, Branch } from '@/types';

interface QuickBookingFormProps {
  settings: SiteSettings;
}

export default function QuickBookingForm({ settings }: QuickBookingFormProps) {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  let branches: Branch[] = [];
  try {
    if (settings.branches_json) {
      branches = JSON.parse(settings.branches_json);
    }
  } catch (e) {
    branches = [];
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'salon_booking',
    service_or_product: 'Russian Nano-Plastia & Keratin',
    preferred_branch: branches[0]?.name || 'Ajwa Road Main Studio',
    preferred_date: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      showToast('Please fill in your name, phone number, and email.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking inquiry');
      }

      setIsSuccess(true);
      showToast('Thank you! Your appointment consultation inquiry has been submitted.', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error submitting booking request. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-obsidian-950 relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>VIP APPOINTMENTS &amp; ADMISSIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 leading-tight">
              Reserve Your Bespoke Experience
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Schedule your personalized hair diagnosis, bridal suite consultation, or cosmetology academy admission counseling with our senior master stylists.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-cream-100 font-semibold text-sm">Complimentary Hair &amp; Scalp Analysis</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Micro-camera pore and cortex health assessment before treatments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-cream-100 font-semibold text-sm">Instant Confirmation via Call / WhatsApp</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Our front desk coordinator will confirm your preferred timing within 15 minutes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-obsidian-900/80 border border-gold-500/30 shadow-luxury-dark backdrop-blur-md">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-cream-50">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you for choosing Free Bird Salon &amp; Academy. Master Stylist Rajesh Joshi&apos;s team has received your details and will call you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiry_type: 'salon_booking',
                        service_or_product: 'Russian Nano-Plastia & Keratin',
                        preferred_branch: branches[0]?.name || 'Ajwa Road Main Studio',
                        preferred_date: '',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gold-500 text-black font-semibold text-xs uppercase tracking-wider shadow"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl font-serif font-bold text-cream-100 mb-2">
                    Quick Consultation Request
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Priyanshi Shah"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98250 12345"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. name@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiry_type}
                        onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm focus:outline-none"
                      >
                        <option value="salon_booking">Salon Treatment Booking</option>
                        <option value="academy_admission">Academy Admission &amp; Courses</option>
                        <option value="bridal_consultation">Bridal Makeover Suite</option>
                        <option value="product_inquiry">Product Purchase Inquiry</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Preferred Studio Branch (Vadodara)
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={formData.preferred_branch}
                          onChange={(e) => setFormData({ ...formData, preferred_branch: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm focus:outline-none appearance-none"
                        >
                          {branches.map((b, i) => (
                            <option key={i} value={b.name}>
                              {b.name} ({b.area})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Preferred Date / Timing
                      </label>
                      <input
                        type="date"
                        value={formData.preferred_date}
                        onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Service / Course of Interest
                    </label>
                    <input
                      type="text"
                      value={formData.service_or_product}
                      onChange={(e) => setFormData({ ...formData, service_or_product: e.target.value })}
                      placeholder="e.g. Russian Nano-Plastia, Balayage, 6-Month Diploma Course"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Message / Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your current hair condition, bridal event dates, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-neutral-800 focus:border-gold-500 text-cream-100 text-sm placeholder-neutral-600 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shine-sweep w-full py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

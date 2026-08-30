import { getSiteSettings } from '@/lib/seo';
import { seedDatabase } from '@/lib/seed';
import QuickBookingForm from '@/components/home/QuickBookingForm';
import BranchesLocation from '@/components/home/BranchesLocation';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  await seedDatabase();
  const settings = getSiteSettings();

  return (
    <div className="bg-obsidian-950 min-h-screen">
      {/* Contact Header */}
      <div className="pt-12 sm:pt-20 text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
          GET IN TOUCH • VADODARA
        </span>
        <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-bold text-cream-50">
          Book Your Appointment &amp; Inquiries
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
          Have questions about our Russian Nano-Plastia, bridal suite dates, or cosmetology diploma admissions? Contact us below.
        </p>
      </div>

      <QuickBookingForm settings={settings} />
      <BranchesLocation settings={settings} />
    </div>
  );
}

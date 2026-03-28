import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';

// Dynamically import below-the-fold components to reduce initial bundle size
const Gallery = dynamic(() => import('@/components/home/Gallery'));
const Offers = dynamic(() => import('@/components/home/Offers'));
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));
const Booking = dynamic(() => import('@/components/home/Booking'));
const InstagramFeed = dynamic(() => import('@/components/home/InstagramFeed'));
const Location = dynamic(() => import('@/components/home/Location'));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Offers />
      <Testimonials />
      <Booking />
      <InstagramFeed />
      <Location />
    </>
  );
}

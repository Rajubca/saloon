import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Gallery from '@/components/home/Gallery';
import Offers from '@/components/home/Offers';
import Testimonials from '@/components/home/Testimonials';
import Booking from '@/components/home/Booking';
import InstagramFeed from '@/components/home/InstagramFeed';
import Location from '@/components/home/Location';

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

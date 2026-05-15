import { Metadata } from 'next';
import HomeClient from './page.client';

export const metadata: Metadata = {
  title: 'Free Bird Saloon | Luxury Salon in Baroda, Gujarat',
  description: 'Experience premium haircuts, spa, coloring, and bridal makeup at Free Bird Saloon, Baroda.',
};

export default function Home() {
  return <HomeClient />;
}

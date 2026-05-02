import { Metadata } from 'next';
import ServicesClient from './page.client';

export const metadata: Metadata = {
  title: 'Services | Free Bird Saloon Baroda',
  description: 'Explore our luxury hair, skin, and bridal makeup services.',
};

export default function Services() {
  return <ServicesClient />;
}

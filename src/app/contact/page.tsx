import { Metadata } from 'next';
import ContactClient from './page.client';

export const metadata: Metadata = {
  title: 'Contact Us | Free Bird Saloon Baroda',
  description: 'Find our location, hours, and contact details in Baroda.',
};

export default function Contact() {
  return <ContactClient />;
}

import { Metadata } from 'next';
import BookingClient from './page.client';

export const metadata: Metadata = {
  title: 'Book an Appointment | Free Bird Saloon',
  description: 'Reserve your time at Free Bird Saloon in Baroda.',
};

export default function Booking() {
  return <BookingClient />;
}

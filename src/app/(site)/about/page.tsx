import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About — SocioFi Technology, Dhaka',
  description: 'FabricXai is a product of SocioFi Technology. The duty cushion ends; efficiency has to come from inside the factory. Built in Dhaka, for the floors it runs on.',
};

export default function AboutPage() {
  return <AboutClient />;
}

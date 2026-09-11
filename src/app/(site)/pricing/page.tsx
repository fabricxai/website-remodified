import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing — one pilot programme, no invented tiers',
  description: 'Implementation, platform per module per month, and MARBIM included — not an add-on. Talk to us.',
};

export default function PricingPage() {
  return <PricingClient />;
}

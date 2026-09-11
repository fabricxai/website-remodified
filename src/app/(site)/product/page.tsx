import type { Metadata } from 'next';
import ProductClient from './ProductClient';

export const metadata: Metadata = {
  title: 'Product — modules & the order journey',
  description: 'Eleven departments, one database. The order journey from inquiry to payment, and the module each station runs on.',
};

export default function ProductPage() {
  return <ProductClient />;
}

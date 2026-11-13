import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Find Verified School Van Drivers',
  description:
    'Search NTCA-verified school van drivers across Colombo, Kandy, Gampaha, and all Sri Lankan districts. Compare vehicles, AC availability, and monthly rates.',
};

export default function DriversLayout({ children }: { children: React.ReactNode }) {
  return children;
}

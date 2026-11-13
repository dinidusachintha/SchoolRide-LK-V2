import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: '5-Tier Safety & Verification Protocol',
  description:
    'Learn how SchoolRide LK verifies NICs, heavy-passenger licenses, police clearance, GPS telemetry, and female matrons to protect Sri Lankan school children.',
};

export default function SafetyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

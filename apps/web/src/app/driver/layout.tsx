import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Driver Partner Portal',
  robots: { index: false, follow: false },
};

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full font-sans driver-dashboard">
      {children}
    </div>
  );
}


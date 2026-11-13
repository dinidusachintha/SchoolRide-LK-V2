import type { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Parent Portal',
  robots: { index: false, follow: false },
};

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full font-sans parent-dashboard">
      {children}
    </div>
  );
}


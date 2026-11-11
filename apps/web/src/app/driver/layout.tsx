import * as React from 'react';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full font-sans font-['DM_Sans',sans-serif] driver-dashboard">
      {children}
    </div>
  );
}


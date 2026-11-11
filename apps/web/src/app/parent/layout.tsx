import * as React from 'react';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full font-sans font-['DM_Sans',sans-serif] parent-dashboard">
      {children}
    </div>
  );
}


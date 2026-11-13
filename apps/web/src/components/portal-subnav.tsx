'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@schoolride/shared';

interface SubNavItem {
  href: string;
  label: string;
  liveDot?: boolean;
}

const PARENT_NAV: SubNavItem[] = [
  { href: '/parent/dashboard', label: 'Overview' },
  { href: '/parent/children', label: 'My Children' },
  { href: '/parent/bookings', label: 'Van Bookings' },
  { href: '/parent/rides/live', label: 'Live Ride Map', liveDot: true },
  { href: '/parent/complaints', label: 'Inquiries & Support' },
  { href: '/parent/settings', label: 'Settings' },
];

const DRIVER_NAV: SubNavItem[] = [
  { href: '/driver/dashboard', label: 'Overview' },
  { href: '/driver/console', label: 'Driving Console', liveDot: true },
  { href: '/driver/bookings', label: 'Requests & Roster' },
  { href: '/driver/vehicles', label: 'My Fleet' },
  { href: '/driver/onboarding', label: 'Verification & Docs' },
  { href: '/driver/settings', label: 'Settings' },
];

export function PortalSubNav({ role }: { role: UserRole.PARENT | UserRole.DRIVER }) {
  const pathname = usePathname();
  const items = role === UserRole.PARENT ? PARENT_NAV : DRIVER_NAV;

  return (
    <nav
      aria-label={role === UserRole.PARENT ? 'Parent Portal Sections' : 'Driver Portal Sections'}
      className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/15 no-scrollbar -mx-1 px-1"
    >
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              isActive
                ? 'bg-[#FACC15] text-[#071426] font-extrabold shadow-xs'
                : 'bg-white/95 hover:bg-white text-[#0B1528] border border-white/75'
            }`}
          >
            {item.liveDot && (
              <span
                className={`h-2 w-2 rounded-full ${
                  isActive ? 'bg-[#071426]' : 'bg-emerald-500 animate-pulse'
                }`}
                aria-hidden="true"
              />
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

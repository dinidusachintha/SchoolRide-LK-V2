'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/parent' ||
    pathname.startsWith('/parent/') ||
    pathname === '/driver' ||
    pathname.startsWith('/driver/') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password'
  ) {
    return null;
  }

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#050b16] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-12 gap-y-6 sm:gap-y-8">
          {/* Column 1: Platform Info */}
          <div className="col-span-2 md:col-span-1 space-y-2.5 sm:space-y-3.5 text-left">
            <Link href="/" className="inline-block group">
              <div className="relative flex items-center transition-transform duration-150 group-hover:scale-102">
                <Image
                  src="/logo.png"
                  alt="SchoolRide LK"
                  width={180}
                  height={36}
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-normal max-w-sm md:max-w-none">
              Sri Lanka&apos;s dedicated school transport network connecting verified van drivers with families across Western, Central, Southern, and all 25 administrative districts.
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-300 font-semibold pt-0.5">
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FACC15] shrink-0" />
              <span>Multi-tier driver &amp; vehicle verification</span>
            </div>
          </div>

          {/* Column 2: Parent Resources */}
          <div className="col-span-1 text-left">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white mb-2 sm:mb-3">
              Parents
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-400 font-medium">
              <li>
                <Link href="/drivers" className="hover:text-[#FACC15] transition-colors">
                  Find Drivers
                </Link>
              </li>
              <li>
                <Link href="/parent/dashboard" className="hover:text-[#FACC15] transition-colors">
                  Parent Dashboard
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-[#FACC15] transition-colors">
                  Safety Standards
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#FACC15] transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Van Drivers */}
          <div className="col-span-1 text-left">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white mb-2 sm:mb-3">
              Drivers &amp; Operators
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-400 font-medium">
              <li>
                <Link href="/register" className="hover:text-[#FACC15] transition-colors">
                  Register as Driver
                </Link>
              </li>
              <li>
                <Link href="/driver/dashboard" className="hover:text-[#FACC15] transition-colors">
                  Driver Portal
                </Link>
              </li>
              <li>
                <Link href="/driver/onboarding" className="hover:text-[#FACC15] transition-colors">
                  Verification
                </Link>
              </li>
              <li>
                <Link href="/driver/console" className="hover:text-[#FACC15] transition-colors">
                  Ride Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div className="col-span-2 md:col-span-1 text-left pt-2 sm:pt-0 border-t border-white/5 md:border-t-0">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white mb-2 sm:mb-3">
              Support &amp; Location
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-400 font-medium">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#FACC15] shrink-0" />
                <span>Colombo 07, Western Province, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#FACC15] shrink-0" />
                <span>+94 11 234 5678 (6:00 AM – 6:00 PM)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#FACC15] shrink-0" />
                <span>support@schoolride.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-2.5 sm:gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} SchoolRide LK. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/safety" className="hover:text-[#FACC15] transition-colors">
              Privacy &amp; Child Safety Policy
            </Link>
            <Link href="/safety" className="hover:text-[#FACC15] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

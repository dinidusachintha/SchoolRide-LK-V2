'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="border-t border-slate-200/90 dark:border-slate-800 bg-[#FFFFFF] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Platform Info */}
          <div className="space-y-4 md:col-span-1 text-left">
            <Link href="/" className="inline-block group">
              <div className="bg-[#14532D] px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-sm">
                <Image
                  src="/logo.png"
                  alt="SchoolRide LK"
                  width={160}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-[#4B5563] dark:text-slate-400 leading-relaxed font-normal">
              Sri Lanka&apos;s dedicated school transport network connecting verified van drivers with families across Western, Central, Southern, and all 25 administrative districts.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#1F2937] dark:text-slate-300 font-semibold pt-1">
              <Shield className="h-4 w-4 text-[#16A34A]" />
              <span>Multi-tier driver and vehicle verification</span>
            </div>
          </div>

          {/* Column 2: Parent Resources */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] dark:text-white mb-4">
              Parents
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4B5563] dark:text-slate-400 font-medium">
              <li>
                <Link href="/drivers" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Find Verified Drivers
                </Link>
              </li>
              <li>
                <Link href="/parent/dashboard" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Parent Dashboard
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Safety &amp; Background Standards
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Create Parent Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Van Drivers */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] dark:text-white mb-4">
              Van Drivers &amp; Operators
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4B5563] dark:text-slate-400 font-medium">
              <li>
                <Link href="/register" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Register as Driver
                </Link>
              </li>
              <li>
                <Link href="/driver/dashboard" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Driver Portal
                </Link>
              </li>
              <li>
                <Link href="/driver/onboarding" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Verification Guidelines
                </Link>
              </li>
              <li>
                <Link href="/driver/console" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
                  Live Ride Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] dark:text-white mb-4">
              Support &amp; Location
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4B5563] dark:text-slate-400 font-medium">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span>Colombo 07, Western Province, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span>+94 11 234 5678 (Mon–Fri, 6:00 AM – 6:00 PM)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#16A34A] shrink-0" />
                <span>support@schoolride.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/80 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SchoolRide LK. All rights reserved. Timezone: Asia/Colombo.</p>
          <div className="flex gap-6">
            <Link href="/safety" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
              Privacy &amp; Child Safety Policy
            </Link>
            <Link href="/safety" className="hover:text-[#16A34A] dark:hover:text-[#FACC15] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

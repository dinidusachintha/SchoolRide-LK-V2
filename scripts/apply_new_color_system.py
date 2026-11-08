import os

base_dir = os.path.join('SchoolRide-LK-V2', 'apps', 'web')

# 1. UPDATE NAVBAR (Forest Green #14532D, Yellow #FACC15, Charcoal #1F2937)
navbar_path = os.path.join(base_dir, 'src', 'components', 'navbar.tsx')
with open(navbar_path, 'r', encoding='utf-8') as f:
    nav = f.read()

# Update header background to Forest Green #14532D with border-emerald-900/80
old_header = 'className="sticky top-0 z-40 w-full border-b border-emerald-950/[0.04] dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all shadow-[0_1px_8px_rgba(0,0,0,0.02)]"'
new_header = 'className="sticky top-0 z-40 w-full border-b border-emerald-900/80 bg-[#14532D] backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(20,83,45,0.18)]"'
nav = nav.replace(old_header, new_header)

# Update nav links styling: text-white/85 hover:text-[#FACC15], active text-[#FACC15] font-bold
old_nav_links = """        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-700 dark:text-slate-200">
          <Link
            href="/"
            className={`transition-colors hover:text-[#094718] dark:hover:text-emerald-400 ${
              pathname === '/' ? 'text-[#094718] dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            How it Works
          </Link>
          <Link
            href="/#routes"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            Routes
          </Link>
          <Link
            href="/safety"
            className={`transition-colors hover:text-[#094718] dark:hover:text-emerald-400 ${
              pathname === '/safety' ? 'text-[#094718] dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Safety
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-[#094718] dark:hover:text-emerald-400"
          >
            Contact
          </Link>"""

new_nav_links = """        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-white/85">
          <Link
            href="/"
            className={`transition-colors hover:text-[#FACC15] ${
              pathname === '/' ? 'text-[#FACC15] font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#FACC15]"
          >
            How it Works
          </Link>
          <Link
            href="/#routes"
            className="transition-colors hover:text-[#FACC15]"
          >
            Routes
          </Link>
          <Link
            href="/safety"
            className={`transition-colors hover:text-[#FACC15] ${
              pathname === '/safety' ? 'text-[#FACC15] font-bold' : ''
            }`}
          >
            Safety
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-[#FACC15]"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-[#FACC15]"
          >
            Contact
          </Link>"""

nav = nav.replace(old_nav_links, new_nav_links)

# Update unauthenticated action buttons: Sign In (Secondary Forest Green outline) & Book a Ride (Primary Yellow #FACC15)
old_btns = """            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-6 py-2.5 text-sm font-bold text-[#152720] dark:text-slate-100 border-2 border-[#152720]/80 dark:border-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/drivers">
                <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#094718] hover:bg-[#073713] rounded-full shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-1.5 cursor-pointer">
                  Book a Ride
                </button>
              </Link>
            </div>"""

new_btns = """            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-5 sm:px-6 py-2.5 text-sm font-bold text-white border-2 border-white/60 hover:border-white rounded-full hover:bg-white/10 transition-all duration-150 cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/drivers">
                <button className="px-5 sm:px-6 py-2.5 text-sm font-black text-[#14532D] bg-[#FACC15] hover:bg-[#EAB308] rounded-full shadow-md hover:shadow-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer">
                  Book a Ride
                </button>
              </Link>
            </div>"""

nav = nav.replace(old_btns, new_btns)

# Mobile button and mobile drawer update
old_mobile_btn = 'className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/60 transition-colors cursor-pointer"'
new_mobile_btn = 'className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"'
nav = nav.replace(old_mobile_btn, new_mobile_btn)

old_drawer = 'className="md:hidden border-b border-border bg-card px-4 pt-2 pb-6 space-y-2 overflow-hidden"'
new_drawer = 'className="md:hidden border-b border-emerald-900 bg-[#14532D] px-4 pt-2 pb-6 space-y-2 overflow-hidden text-white"'
nav = nav.replace(old_drawer, new_drawer)

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(nav)
print("Updated navbar.tsx with Forest Green #14532D and Yellow #FACC15!")


# 2. UPDATE FOOTER (Forest Green #14532D, Yellow #FACC15, Charcoal/White text)
footer_path = os.path.join(base_dir, 'src', 'components', 'footer.tsx')
footer_code = """'use client';

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
    <footer className="border-t border-emerald-900/80 bg-[#14532D] text-white/85 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Platform Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo.png"
                alt="SchoolRide LK"
                width={180}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-white/75 leading-relaxed">
              Sri Lanka&apos;s dedicated school transport network connecting verified van drivers with families across Western, Central, Southern, and all 25 administrative districts.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/85 pt-1">
              <Shield className="h-4 w-4 text-[#FACC15]" />
              <span>Multi-tier driver and vehicle verification</span>
            </div>
          </div>

          {/* Column 2: Parent Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FACC15] mb-4">
              Parents
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <Link href="/drivers" className="hover:text-[#FACC15] transition-colors">
                  Find Verified Drivers
                </Link>
              </li>
              <li>
                <Link href="/parent/dashboard" className="hover:text-[#FACC15] transition-colors">
                  Parent Dashboard
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-[#FACC15] transition-colors">
                  Safety & Background Standards
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#FACC15] transition-colors">
                  Create Parent Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Van Drivers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FACC15] mb-4">
              Van Drivers & Operators
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
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
                  Verification Guidelines
                </Link>
              </li>
              <li>
                <Link href="/driver/console" className="hover:text-[#FACC15] transition-colors">
                  Live Ride Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FACC15] mb-4">
              Support & Location
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#FACC15] shrink-0" />
                <span>Colombo 07, Western Province, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#FACC15] shrink-0" />
                <span>+94 11 234 5678 (Mon–Fri, 6:00 AM – 6:00 PM)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FACC15] shrink-0" />
                <span>support@schoolride.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} SchoolRide LK. All rights reserved. Timezone: Asia/Colombo.</p>
          <div className="flex gap-6">
            <Link href="/safety" className="hover:text-[#FACC15] transition-colors">
              Privacy & Child Safety Policy
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
"""
with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(footer_code)
print("Updated footer.tsx with Forest Green #14532D and Yellow #FACC15!")


# 3. UPDATE HOW IT WORKS SLIDESHOW (Card white with subtle borders, Forest Green #14532D, Yellow #FACC15, Fresh Green #16A34A)
slideshow_path = os.path.join(base_dir, 'src', 'components', 'how-it-works-slideshow.tsx')
with open(slideshow_path, 'r', encoding='utf-8') as f:
    slide_code = f.read()

# Update active/inactive pills
slide_code = slide_code.replace("bg-[#094718] text-white shadow-md shadow-[#094718]/15 border border-[#094718]", "bg-[#14532D] text-white shadow-md shadow-[#14532D]/20 border border-[#14532D]")
slide_code = slide_code.replace("bg-[#8CB02C] text-[#094718]", "bg-[#FACC15] text-[#14532D]")
slide_code = slide_code.replace("bg-[#8CB02C]", "bg-[#FACC15]")
slide_code = slide_code.replace("bg-[#094718]", "bg-[#14532D]")
slide_code = slide_code.replace("text-[#0B2C22]", "text-[#1F2937]")
slide_code = slide_code.replace("text-[#4E6258]", "text-[#4B5563]")
slide_code = slide_code.replace("hover:bg-[#073713]", "hover:bg-[#EAB308]")

# Update CTA Button on slide to Yellow primary button
old_slide_btn = """                  <Link href={currentSlide.ctaLink}>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer">
                      <span>{currentSlide.ctaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>"""

new_slide_btn = """                  <Link href={currentSlide.ctaLink}>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#14532D] font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer">
                      <span>{currentSlide.ctaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>"""

slide_code = slide_code.replace(old_slide_btn, new_slide_btn)

# Update control buttons
slide_code = slide_code.replace("bg-[#094718] dark:bg-emerald-400", "bg-[#14532D]")

with open(slideshow_path, 'w', encoding='utf-8') as f:
    f.write(slide_code)
print("Updated how-it-works-slideshow.tsx with new palette!")


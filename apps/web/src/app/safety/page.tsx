import Link from 'next/link';
import { ShieldCheck, FileCheck, Lock, EyeOff, UserCheck, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12 text-left">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] text-[#0B4626] border border-[#BCE6C9] text-xs sm:text-sm font-bold shadow-sm">
          <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
          <span>Child Safety &amp; Verification Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2C22] dark:text-white tracking-tight leading-tight">
          Trust Built on <span className="text-[#8CB02C]">Verifiable Standards</span>
        </h1>
        <p className="text-sm sm:text-base text-[#4E6258] dark:text-slate-300 leading-relaxed">
          School transport carries what Sri Lankan families value most: our children. Learn how SchoolRide LK enforces multi-stage document inspections, driver vetting, and privacy protections.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="p-7 rounded-[24px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
            <FileCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
            Driver Identity &amp; Legal Credentials
          </h3>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
            Before any driver profile appears in public search or accepts bookings, administrators review official government documentation:
          </p>
          <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B2C22] dark:text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>National Identity Card (NIC) with bilateral photo verification</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Valid Commercial / Heavy Vehicle Driving License</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Police Clearance Report verified on registration</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Direct telephone &amp; home address confirmation</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2 */}
        <div className="p-7 rounded-[24px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
            Vehicle Roadworthiness &amp; Safety Equipment
          </h3>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
            Children deserve safe, compliant vehicles. Drivers register every vehicle with validated statutory documentation:
          </p>
          <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B2C22] dark:text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Valid Provincial Revenue License with current expiry dates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Commercial Passenger Vehicle Insurance policy</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Mandatory emergency exit doors &amp; functional child safety latches</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Inspected first-aid kit &amp; certified fire extinguisher on board</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="p-7 rounded-[24px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
            <EyeOff className="h-6 w-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
            Child Location &amp; Route Telemetry Privacy
          </h3>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
            We protect children by strictly preventing public data exposure and tracking leakage:
          </p>
          <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B2C22] dark:text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Exact home pickup coordinates are NEVER published on public profiles</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Live GPS coordinates are broadcast only during active morning/afternoon trips</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Access restricted exclusively to parents with enrolled children on that ride</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Encrypted WebSocket telemetry with strict room isolation</span>
            </li>
          </ul>
        </div>

        {/* Pillar 4 */}
        <div className="p-7 rounded-[24px] border border-emerald-950/[0.08] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6ED] text-[#094718] border border-[#D0EAD6]">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0B2C22] dark:text-white">
            Continuous Moderation &amp; Rapid Action
          </h3>
          <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
            Our safety commitment extends throughout every Sri Lankan school term:
          </p>
          <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B2C22] dark:text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Authentic reviews submitted only by parents with active subscriptions</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Formal safety complaint ticketing with mandatory 24h moderation review</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Direct suspension powers for policy deviations or expired documents</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
              <span>Immutable security audit logging of all administrative moderation actions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Regulatory Compliance Note */}
      <div className="p-6 sm:p-7 rounded-[24px] border border-emerald-900/[0.08] bg-[#FAFDF9] dark:bg-slate-900 space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-[#0B2C22] dark:text-white font-bold text-sm sm:text-base">
          <AlertCircle className="h-5 w-5 text-[#094718] dark:text-emerald-400" />
          <span>Sri Lankan Legal &amp; Regulatory Compliance Note</span>
        </div>
        <p className="text-xs sm:text-sm text-[#4E6258] dark:text-slate-300 leading-relaxed">
          SchoolRide LK operates in alignment with the Motor Traffic Act of Sri Lanka and provincial passenger transport authority regulations. While SchoolRide LK provides technology verification tools and GPS monitoring, parents are encouraged to maintain direct communication with their designated school van operator.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link href="/drivers">
          <button className="px-8 py-3.5 rounded-full bg-[#094718] hover:bg-[#073713] text-white font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2">
            <span>Find Verified Drivers for Your School</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

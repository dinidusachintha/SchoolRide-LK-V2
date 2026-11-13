import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  Lock,
  EyeOff,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Bus,
} from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen w-full dashboard-navy-yellow-bg text-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 relative z-10 text-left">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30 text-xs sm:text-sm font-bold shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#FACC15]" />
            <span>Child Safety &amp; Verification Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Trust Built on <span className="text-[#FACC15]">Verifiable Standards</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            School transport carries what Sri Lankan families value most: our children. Learn how SchoolRide LK enforces multi-stage document inspections, driver vetting, and privacy protections.
          </p>
        </div>

        {/* 4 Pillars Grid: Frosted White Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="glass-card-white glass-card-white-hover p-6 sm:p-7 rounded-[28px] space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1528] text-[#FACC15] shadow-sm">
              <FileCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0B1528]">
              Driver Identity &amp; Legal Credentials
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Before any driver profile appears in public search or accepts bookings, administrators review official government documentation:
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B1528] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>National Identity Card (NIC) with bilateral photo verification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Valid Commercial / Heavy Vehicle Driving License</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Police Clearance Report verified on registration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Direct telephone &amp; home address confirmation</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card-white glass-card-white-hover p-6 sm:p-7 rounded-[28px] space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1528] text-[#FACC15] shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0B1528]">
              Vehicle Roadworthiness &amp; Safety Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Children deserve safe, compliant vehicles. Drivers register every vehicle with validated statutory documentation:
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B1528] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Valid Provincial Revenue License with current expiry dates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Commercial Passenger Vehicle Insurance policy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Mandatory emergency exit doors &amp; functional child safety latches</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Inspected first-aid kit &amp; certified fire extinguisher on board</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card-white glass-card-white-hover p-6 sm:p-7 rounded-[28px] space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1528] text-[#FACC15] shadow-sm">
              <EyeOff className="h-6 w-6" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0B1528]">
              Child Location &amp; Route Telemetry Privacy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We protect children by strictly preventing public data exposure and tracking leakage:
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B1528] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Exact home pickup coordinates are NEVER published on public profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Live GPS coordinates are broadcast only during active morning/afternoon trips</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Access restricted exclusively to parents with enrolled children on that ride</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Encrypted WebSocket telemetry with strict room isolation</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card-white glass-card-white-hover p-6 sm:p-7 rounded-[28px] space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1528] text-[#FACC15] shadow-sm">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0B1528]">
              Continuous Moderation &amp; Rapid Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our safety commitment extends throughout every Sri Lankan school term:
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#0B1528] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Authentic reviews submitted only by parents with active subscriptions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Formal safety complaint ticketing with mandatory 24h moderation review</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Direct suspension powers for policy deviations or expired documents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Immutable security audit logging of all administrative moderation actions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Compliance Note */}
        <div className="glass-card-white p-6 sm:p-8 rounded-[28px] space-y-2 shadow-xl">
          <div className="flex items-center gap-2 text-[#0B1528] font-black text-sm sm:text-base">
            <AlertCircle className="h-5 w-5 text-[#CA8A04] shrink-0" />
            <span>Sri Lankan Legal &amp; Regulatory Compliance Note</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            SchoolRide LK operates in alignment with the Motor Traffic Act of Sri Lanka and provincial passenger transport authority regulations. While SchoolRide LK provides technology verification tools and GPS monitoring, parents are encouraged to maintain direct communication with their designated school van operator.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/drivers">
            <button
              type="button"
              className="btn-glass-yellow-3d px-8 py-3.5 text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-lg"
            >
              <Bus className="h-4 w-4" />
              <span>Find Verified Drivers for Your School</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <Link
            href="/parent/rides/live"
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            Preview Live GPS Tracking
          </Link>
        </div>
      </div>
    </div>
  );
}

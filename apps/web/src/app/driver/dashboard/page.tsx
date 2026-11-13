'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Bus,
  ShieldCheck,
  ShieldAlert,
  Users,
  Calendar,
  Star,
  Radio,
  ArrowRight,
  FileCheck,
  Clock,
  Car,
  AlertCircle,
  Plus,
  Compass,
  CheckCircle2,
  Phone,
  MapPin,
  GraduationCap,
  Sparkles,
  DollarSign,
  Award,
  Navigation,
  Check,
  X
} from 'lucide-react';
import { formatLKR, VerificationStatus } from '@schoolride/shared';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity fallback demonstration data for driver dashboard matching Home Page
const DEMO_ACTIVE_RIDE = {
  id: 'ride-active-01',
  routeName: 'Royal College & Visakha Morning Run #04',
  currentSpeed: 38,
  status: 'IN_PROGRESS',
  currentStop: 'Bambalapitiya Junction',
  nextStop: 'Visakha Vidyalaya Gate 2 (In ~4 mins / 1.2 km)',
  totalPassengers: 14,
  checkedInCount: 12,
};

const DEMO_ENROLLED_STUDENTS = [
  {
    id: 'pass-01',
    childName: 'Dineth Silva',
    grade: 'Grade 7-B',
    schoolName: 'Royal College Colombo',
    pickupTime: '06:30 AM',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    parentName: 'Chaminda Silva',
    parentPhone: '+94 77 123 4567',
    monthlyFee: 18000,
    status: 'ON_BOARD',
  },
  {
    id: 'pass-02',
    childName: 'Senuri Silva',
    grade: 'Grade 4-D',
    schoolName: 'Visakha Vidyalaya Colombo',
    pickupTime: '06:35 AM',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    parentName: 'Chaminda Silva',
    parentPhone: '+94 77 123 4567',
    monthlyFee: 16500,
    status: 'ON_BOARD',
  },
  {
    id: 'pass-03',
    childName: 'Kaveesha Silva',
    grade: 'Grade 9-A',
    schoolName: 'Royal College Colombo',
    pickupTime: '06:42 AM',
    pickupAddress: 'Havelock City Apartments Gate 1',
    parentName: 'Samantha Silva',
    parentPhone: '+94 71 888 9900',
    monthlyFee: 18000,
    status: 'PICKED_UP',
  },
  {
    id: 'pass-04',
    childName: 'Ananya Fernando',
    grade: 'Grade 6-C',
    schoolName: 'Visakha Vidyalaya Colombo',
    pickupTime: '06:50 AM',
    pickupAddress: 'Galle Road, Bambalapitiya',
    parentName: 'Dr. Rohan Fernando',
    parentPhone: '+94 77 999 1122',
    monthlyFee: 18000,
    status: 'WAITING',
  },
];

const DEMO_PENDING_REQUESTS = [
  {
    id: 'req-01',
    childName: 'Ravindu Jayasuriya',
    grade: 'Grade 5',
    schoolName: 'Royal College Colombo',
    pickupAddress: 'Kohuwala Junction, Sunethradevi Road',
    monthlyFee: 18000,
    parentName: 'Niroshan Jayasuriya',
    dateRequested: 'Today, 06:15 AM',
  },
  {
    id: 'req-02',
    childName: 'Thisuki Mendis',
    grade: 'Grade 8',
    schoolName: 'Visakha Vidyalaya Colombo',
    pickupAddress: 'Mayura Place, Havelock Town',
    monthlyFee: 16500,
    parentName: 'Anoma Mendis',
    dateRequested: 'Yesterday, 04:30 PM',
  },
];

export default function DriverDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = React.useState<any>(null);
  const [bookings, setBookings] = React.useState<any[]>(DEMO_ENROLLED_STUDENTS);
  const [pendingRequests, setPendingRequests] = React.useState<any[]>(DEMO_PENDING_REQUESTS);
  const [activeRide, setActiveRide] = React.useState<any>(DEMO_ACTIVE_RIDE);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function loadDriverData() {
      try {
        const [profileRes, bookingsRes, activeRideRes] = await Promise.all([
          api.get('/drivers/me').catch(() => null),
          api.get('/bookings').catch(() => []),
          api.get('/rides/active').catch(() => null),
        ]);

        if (profileRes) setProfile(profileRes);
        if (Array.isArray(bookingsRes) && bookingsRes.length > 0) {
          const accepted = bookingsRes.filter((b) => b.status === 'ACCEPTED' || b.status === 'ACTIVE');
          const pending = bookingsRes.filter((b) => b.status === 'PENDING');
          if (accepted.length > 0) setBookings(accepted);
          if (pending.length > 0) setPendingRequests(pending);
        }
        if (activeRideRes && activeRideRes.status === 'IN_PROGRESS') {
          setActiveRide(activeRideRes);
        }
      } catch {
        // Fallback demo state retained
      }
    }

    if (user) {
      loadDriverData();
    }
  }, [user]);

  const handleAcceptRequest = (requestId: string, childName: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
    toast.success(`Accepted seat booking request for ${childName}!`);
  };

  const handleDeclineRequest = (requestId: string, childName: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
    toast.info(`Declined booking request for ${childName}.`);
  };

  // Metrics
  const activeStudentCount = bookings.length;
  const totalMonthlyProjected = bookings.reduce(
    (sum, b) => sum + (b.monthlyFee || (b.monthlyFeeMinorUnits ? b.monthlyFeeMinorUnits / 100 : 18000)),
    0
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden select-none pb-20">
      
      {/* Background Soft Texture matching Home Page */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-yellow-100/30 via-emerald-50/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Driver Portal Navigation Sub-Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200/80 dark:border-slate-800">
          <Link href="/driver/dashboard">
            <button className="px-4 py-2 rounded-full text-xs font-black bg-[#FACC15] text-slate-950 shadow-sm cursor-pointer whitespace-nowrap">
              Overview
            </button>
          </Link>
          <Link href="/driver/console">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Active GPS Console</span>
            </button>
          </Link>
          <Link href="/driver/bookings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Bookings &amp; Manifest
            </button>
          </Link>
          <Link href="/driver/vehicles">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Fleet Vehicles
            </button>
          </Link>
          <Link href="/driver/settings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Operator Settings
            </button>
          </Link>
        </div>

        {/* Hero Welcome Showcase Card matching Home Page Theme */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow matching home page */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-100/40 via-emerald-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#CA8A04]" />
              <span>5-Tier Police &amp; NTCA Verified Van Operator</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Welcome back, <span className="text-[#FFC928]">{user?.fullName || 'Driver Sunil'}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Manage your daily passenger manifest, broadcast high-precision live GPS telemetry to parents, review pending seat requests, and inspect monthly subscription payouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <Link href="/driver/console">
              <button className="btn-glass-yellow-3d px-5 sm:px-6 py-3 text-xs sm:text-sm font-black justify-center shadow-md">
                <Radio className="h-4 w-4 text-[#14532D] animate-pulse" />
                <span>Launch GPS Console</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>

            <Link href="/driver/vehicles">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer">
                <Car className="h-4 w-4 text-[#16A34A]" />
                <span>Fleet Vehicles</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Active Route Telemetry In-Progress Card */}
        {activeRide && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[24px] bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-yellow-50/30 border border-emerald-300/80 dark:border-emerald-700/60 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14532D] text-[#FACC15] font-black shadow-md shrink-0">
                <Radio className="h-6 w-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white">
                    {activeRide.routeName || 'Morning Route Run In Progress'}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white uppercase tracking-wider animate-pulse">
                    BROADCASTING LIVE
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Next Destination: <strong>{activeRide.nextStop || 'Visakha Vidyalaya Gate 2'}</strong> • {activeRide.checkedInCount || 12} Students On Board
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Current Telemetry</span>
                <span className="font-mono text-xs font-black text-[#14532D] dark:text-[#FACC15]">
                  {activeRide.currentSpeed || 38} km/h • Normal
                </span>
              </div>

              <Link href="/driver/console">
                <button className="px-5 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                  <span>Open Route Console</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* 4 Summary KPI Cards matching Home Page Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* KPI 1 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Passengers
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {activeStudentCount}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Confirmed Enrolled Students
            </p>
          </div>

          {/* KPI 2 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Monthly Revenue
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">
              Rs. {totalMonthlyProjected.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Direct Payout (0% Commission)
            </p>
          </div>

          {/* KPI 3 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                New Requests
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {pendingRequests.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Awaiting Your Acceptance
            </p>
          </div>

          {/* KPI 4 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Driver Rating
              </span>
              <div className="w-8 h-8 rounded-xl bg-yellow-50 dark:bg-yellow-950/60 text-yellow-600 border border-yellow-200 flex items-center justify-center">
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
              4.9 / 5.0
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              38 Verified Parent Reviews
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Today's Run Manifest & Pending Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Daily Passenger Manifest */}
          <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#14532D] dark:text-emerald-300 flex items-center justify-center font-bold">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                      Daily Passenger Manifest
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Enrolled students on Royal &amp; Visakha corridor
                    </p>
                  </div>
                </div>

                <Link href="/driver/bookings" className="text-xs font-bold text-[#14532D] dark:text-[#FACC15] hover:text-[#CA8A04] flex items-center gap-1">
                  <span>Full Manifest</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {bookings.map((student) => (
                  <div
                    key={student.id}
                    className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-950/80 text-[#713F12] dark:text-yellow-300 font-black text-sm flex items-center justify-center shrink-0 border border-yellow-300/60">
                        {student.childName ? student.childName[0] : 'S'}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-950 dark:text-white text-sm">
                            {student.childName}
                          </span>
                          <span className="text-[10px] text-slate-400">({student.grade})</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {student.schoolName} • Stop: {student.pickupTime || '06:30 AM'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          student.status === 'ON_BOARD'
                            ? 'bg-emerald-100 text-[#14532D] border border-emerald-300'
                            : student.status === 'PICKED_UP'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {student.status || 'ENROLLED'}
                      </span>
                      {student.parentPhone && (
                        <a
                          href={`tel:${student.parentPhone}`}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title={`Call Parent: ${student.parentName}`}
                        >
                          <Phone className="h-3.5 w-3.5 text-[#16A34A]" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Automated Geofence QR Scanning Active</span>
              <span className="font-bold text-[#14532D] dark:text-[#FACC15]">100% Attendance Logged</span>
            </div>
          </div>

          {/* Column 2: Pending Parent Booking Inquiries */}
          <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                      Pending Seat Inquiries
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Parents requesting seats along your designated corridor
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {pendingRequests.length} Inquiries
                </span>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No pending booking requests. All prospective passengers processed!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-950 dark:text-white">
                              {req.childName}
                            </span>
                            <span className="text-[10px] text-slate-400">({req.grade})</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {req.schoolName} • Requested by {req.parentName}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#16A34A]" />
                            <span>Pickup: {req.pickupAddress}</span>
                          </p>
                        </div>

                        <span className="font-mono font-bold text-xs text-[#14532D] dark:text-[#FACC15] shrink-0 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          Rs. {req.monthlyFee?.toLocaleString()}/mo
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                        <button
                          onClick={() => handleDeclineRequest(req.id, req.childName)}
                          className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(req.id, req.childName)}
                          className="px-4 py-1.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-[11px] shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          <span>Accept Student</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Standard 24-hr Parent Response SLA</span>
              <Link href="/driver/settings" className="font-bold text-slate-700 dark:text-slate-300 hover:text-[#CA8A04]">
                Adjust Seat Rate
              </Link>
            </div>
          </div>

        </div>

        {/* Assigned Fleet Vehicle & Compliance Card */}
        <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 dark:bg-yellow-950/80 text-[#713F12] dark:text-yellow-300 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              <Bus className="h-7 w-7 text-[#CA8A04]" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                  Toyota HiAce Commuter (High-Roof)
                </h3>
                <span className="font-mono text-xs font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
                  WP ND-8422
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#14532D] border border-emerald-300">
                  ROADWORTHY &amp; VETTED
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                14 Seater Capacity • Dual Air-Conditioning • Active GPS Telemetry • Dual High-Def Dashcam
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/driver/vehicles">
              <button className="px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                Vehicle Documents
              </button>
            </Link>
            <Link href="/driver/console">
              <button className="px-5 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <Radio className="h-3.5 w-3.5" />
                <span>Start Telemetry Feed</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Operator Protection Charter Banner matching Home Page */}
        <div className="rounded-[28px] bg-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-[#FACC15] text-[11px] font-black uppercase tracking-wider border border-yellow-400/30">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FACC15]" />
              <span>Operator Protection &amp; Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Guaranteed monthly payouts, <span className="text-[#FACC15]">zero commission fees</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              SchoolRide.lk supports verified van owners with automated digital seat booking collection, emergency road breakdown dispatch, and parent dispute resolution across Sri Lanka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/driver/console">
              <button className="px-6 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer">
                Launch Driving Console
              </button>
            </Link>
            <Link href="/driver/settings">
              <button className="px-5 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer">
                Operator Settings
              </button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

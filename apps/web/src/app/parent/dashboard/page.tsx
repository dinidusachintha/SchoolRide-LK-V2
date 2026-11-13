'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  Bus,
  ShieldCheck,
  Plus,
  ArrowRight,
  Clock,
  Radio,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  School,
  Phone,
  Gauge,
  Bell,
  ChevronRight,
  Car,
  Navigation
} from 'lucide-react';
import { formatLKR } from '@schoolride/shared';
import { motion } from 'framer-motion';

export default function ParentDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [childrenList, setChildrenList] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [activeRide, setActiveRide] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'PARENT')) {
      router.push('/login');
      return;
    }

    async function loadParentData() {
      if (!user) return;
      setIsLoading(true);
      try {
        const [childrenRes, bookingsRes, activeRideRes] = await Promise.all([
          api.get('/parents/me/children').catch(() => []),
          api.get('/bookings').catch(() => []),
          api.get('/rides/active').catch(() => null),
        ]);
        setChildrenList(childrenRes || []);
        setBookings(bookingsRes || []);
        setActiveRide(activeRideRes);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      loadParentData();
    }
  }, [user, authLoading, router]);

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen dashboard-navy-yellow-bg text-[#0B1528] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/15">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full" />
            ))}
          </div>
          <div className="rounded-[32px] p-6 sm:p-8 border border-white/75 bg-white/65 backdrop-blur-xl space-y-4">
            <Skeleton className="h-6 w-48 rounded-full" />
            <Skeleton className="h-10 w-80 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-lg" />
          </div>
          <div className="rounded-[32px] p-6 sm:p-8 border border-white/75 bg-white/65 backdrop-blur-xl space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-[22px]" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-56 rounded-[24px]" />
              <Skeleton className="h-56 rounded-[24px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === 'PENDING');
  const activeBookings = bookings.filter((b) => b.status === 'ACTIVE' || b.status === 'ACCEPTED');

  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-slate-900 dark:text-white relative overflow-hidden select-none pb-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Parent Portal Navigation Sub-Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/15">
          <Link href="/parent/dashboard">
            <button className="px-4 py-2 rounded-full text-xs font-black bg-[#FACC15] text-slate-950 shadow-sm cursor-pointer whitespace-nowrap">
              Overview
            </button>
          </Link>
          <Link href="/parent/children">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              My Children ({childrenList.length})
            </button>
          </Link>
          <Link href="/parent/bookings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Van Bookings ({bookings.length})
            </button>
          </Link>
          <Link href="/parent/rides/live">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Ride Map</span>
            </button>
          </Link>
          <Link href="/parent/complaints">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Inquiries &amp; Support
            </button>
          </Link>
          <Link href="/parent/settings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Settings
            </button>
          </Link>
        </div>

        {/* Hero Welcome Showcase Card matching Home Page styling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
              <span>5-Tier Safety Verified Parent Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="text-[#FFC928]">{user?.fullName || 'Parent'}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Monitor your enrolled children, find trusted school van drivers with certified background checks, and track live telemetry across Sri Lanka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <Link href="/drivers">
              <button className="btn-glass-yellow-3d px-5 sm:px-6 py-3 text-xs sm:text-sm font-black justify-center shadow-md">
                <Bus className="h-4 w-4" />
                <span>Find Van Operator</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </Link>

            <Link href="/parent/children">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer">
                <Plus className="h-4 w-4 text-[#FFC928]" />
                <span>Add Child</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Master White Background Container Card with Soft Shadow (Excludes the Header) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">

        {/* Live Ride In-Progress Banner (If Active) */}
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
                    School Van Route In Progress
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white uppercase tracking-wider animate-pulse">
                    LIVE NOW
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Route: {activeRide.routeName} • Driver: {activeRide.driverProfile?.user?.fullName || 'Uncle Sunil'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Live Speed</span>
                <span className="font-mono text-xs font-black text-[#14532D] dark:text-[#FACC15]">{activeRide.currentSpeed || 36} km/h</span>
              </div>

              <Link href="/parent/rides/live">
                <button className="px-5 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                  <span>Open Live Map</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* 4 Summary KPI Cards matching Home Page Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Children
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {childrenList.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Registered Student Profiles
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Passes
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                <Bus className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {activeBookings.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Confirmed School Van Seats
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pending
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {pendingBookings.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Operator Inquiries Pending
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Safety Guarantee
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
              100%
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Police &amp; Vehicle Inspected
            </p>
          </div>
        </div>

        {/* Section 1: Registered Children */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]">
                Student Profiles
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-1">
                Your Registered Children
              </h2>
            </div>
            <Link href="/parent/children" className="text-xs font-bold text-[#14532D] dark:text-[#FACC15] hover:text-[#CA8A04] flex items-center gap-1">
              <span>Manage Student Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {childrenList.length === 0 ? (
            <div className="p-10 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No children registered yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Add your child&apos;s school details and pickup address to connect with neighborhood school van routes.
                </p>
              </div>
              <Link href="/parent/children">
                <button className="px-5 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer">
                  + Register First Child
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {childrenList.map((child) => (
                <div
                  key={child.id}
                  className="p-6 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#14532D] dark:text-emerald-300 font-black text-sm flex items-center justify-center border border-emerald-200">
                          {child.firstName[0]}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                            {child.firstName} {child.lastName}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {child.grade} • {child.gender}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {child.school?.district || 'Colombo'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <School className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
                        <span>School: {child.school?.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pl-5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">Pickup: {child.pickupAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      {child.bookings?.length > 0 ? (
                        <span className="text-xs font-bold text-[#14532D] dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" /> Van Pass Active
                        </span>
                      ) : (
                        <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                          Awaiting Van Match
                        </span>
                      )}
                    </div>

                    <Link href={`/drivers?schoolId=${child.schoolId}`}>
                      <button className="px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs transition-colors cursor-pointer">
                        Find Matching Vans
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Transportation Bookings */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF08A] text-[#713F12] border border-yellow-300">
                School Transits
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-1">
                Active Transportation Passes
              </h2>
            </div>
            <Link href="/parent/bookings" className="text-xs font-bold text-[#14532D] dark:text-[#FACC15] hover:text-[#CA8A04] flex items-center gap-1">
              <span>View All Booking Passes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="p-10 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Bus className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No active van passes yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Browse verified school van drivers in your area and enroll your child in an approved commuter route.
                </p>
              </div>
              <Link href="/drivers">
                <button className="px-5 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer">
                  Discover Van Operators
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 flex items-center justify-center text-[#CA8A04] dark:text-[#FACC15] font-black shrink-0">
                      <Bus className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-950 dark:text-white">
                          Student: {b.child?.firstName} {b.child?.lastName}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            b.status === 'ACTIVE'
                              ? 'bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]'
                              : b.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        Driver: <span className="font-bold text-slate-900 dark:text-white">{b.driverProfile?.user?.fullName || 'Uncle Sunil'}</span> ({b.driverProfile?.user?.phone || '077 123 4567'})
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3.5 w-3.5 text-slate-400" /> Morning Pickup: {b.pickupTimeMorning || '06:30'} AM
                        </span>
                        <span>•</span>
                        <span className="font-black text-[#14532D] dark:text-[#FACC15]">
                          Monthly Fee: {formatLKR(b.monthlyFeeMinorUnits, true)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-center">
                    <Link href={`/parent/bookings`}>
                      <button className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                        Pass Details
                      </button>
                    </Link>

                    {b.status === 'ACTIVE' && (
                      <Link href="/parent/rides/live">
                        <button className="px-5 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
                          <Radio className="h-3.5 w-3.5 animate-pulse text-slate-950" />
                          <span>Live Telemetry</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5-Tier Safety Charter Strip matching Home Page */}
        <div className="rounded-[26px] bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#16A34A]" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              SchoolRide LK Parent Safety Charter
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">NIC &amp; Police Verification</span>
                <span className="text-slate-500 dark:text-slate-400">Strict criminal record &amp; heavy passenger license checks.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Roadworthy Vans</span>
                <span className="text-slate-500 dark:text-slate-400">Valid provincial revenue license &amp; passenger insurance.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Speed Limiter Telemetry</span>
                <span className="text-slate-500 dark:text-slate-400">Live speed streaming with automatic school corridor warnings.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Doorstep Gate Chimes</span>
                <span className="text-slate-500 dark:text-slate-400">Instant notification when your child boards and arrives at school.</span>
              </div>
            </div>
          </div>
        </div>

        </div>

      </div>

    </div>
  );
}

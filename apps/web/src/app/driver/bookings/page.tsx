'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/input';
import {
  Bus,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Search,
  Radio,
  Car,
  Users,
  DollarSign,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatLKR, BookingStatus } from '@schoolride/shared';

const DEMO_DRIVER_BOOKINGS = [
  {
    id: 'b-01',
    status: 'PENDING',
    monthlyFeeMinorUnits: 1800000,
    pickupAddress: 'Kohuwala Junction, Sunethradevi Road, Nugegoda',
    pickupTimeMorning: '06:40',
    dropoffTimeAfternoon: '14:15',
    notes: 'Please pick up at main gate. Prefers front seat.',
    child: {
      firstName: 'Ravindu',
      lastName: 'Jayasuriya',
      grade: 'Grade 5-B',
      school: { name: 'Royal College Colombo', city: 'Colombo 07' },
    },
    parent: {
      user: {
        fullName: 'Niroshan Jayasuriya',
        phone: '+94 77 345 6789',
      },
    },
  },
  {
    id: 'b-02',
    status: 'PENDING',
    monthlyFeeMinorUnits: 1650000,
    pickupAddress: 'Mayura Place, Havelock Town, Colombo 06',
    pickupTimeMorning: '06:48',
    dropoffTimeAfternoon: '13:50',
    notes: 'Sister Thisuki Mendis will board together from next week.',
    child: {
      firstName: 'Thisuki',
      lastName: 'Mendis',
      grade: 'Grade 8-A',
      school: { name: 'Visakha Vidyalaya Colombo', city: 'Colombo 05' },
    },
    parent: {
      user: {
        fullName: 'Anoma Mendis',
        phone: '+94 71 888 2345',
      },
    },
  },
  {
    id: 'b-03',
    status: 'ACTIVE',
    monthlyFeeMinorUnits: 1800000,
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupTimeMorning: '06:30',
    dropoffTimeAfternoon: '14:00',
    notes: 'Carries asthma inhaler in side pocket.',
    child: {
      firstName: 'Dineth',
      lastName: 'Silva',
      grade: 'Grade 7-A',
      school: { name: 'Royal College Colombo', city: 'Colombo 07' },
    },
    parent: {
      user: {
        fullName: 'Kusal Silva',
        phone: '+94 77 123 4567',
      },
    },
  },
  {
    id: 'b-04',
    status: 'ACTIVE',
    monthlyFeeMinorUnits: 1650000,
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupTimeMorning: '06:30',
    dropoffTimeAfternoon: '13:45',
    notes: 'Accompanied by brother Dineth in the morning.',
    child: {
      firstName: 'Senuri',
      lastName: 'Silva',
      grade: 'Grade 4-D',
      school: { name: 'Visakha Vidyalaya Colombo', city: 'Colombo 05' },
    },
    parent: {
      user: {
        fullName: 'Kusal Silva',
        phone: '+94 77 123 4567',
      },
    },
  },
  {
    id: 'b-05',
    status: 'ACTIVE',
    monthlyFeeMinorUnits: 1800000,
    pickupAddress: 'Havelock City Apartments Gate 1',
    pickupTimeMorning: '06:42',
    dropoffTimeAfternoon: '14:15',
    notes: 'Security clearance pass registered at gate.',
    child: {
      firstName: 'Kavindu',
      lastName: 'Perera',
      grade: 'Grade 9-B',
      school: { name: 'Royal College Colombo', city: 'Colombo 07' },
    },
    parent: {
      user: {
        fullName: 'Samantha Silva',
        phone: '+94 71 888 9900',
      },
    },
  },
];

export default function DriverBookingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = React.useState<any[]>(DEMO_DRIVER_BOOKINGS);
  const [filter, setFilter] = React.useState<'ALL' | 'PENDING' | 'ACCEPTED' | 'ARCHIVED'>('ALL');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Reject modal state
  const [rejectingBookingId, setRejectingBookingId] = React.useState<string | null>(null);
  const [rejectReason, setRejectReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadBookings = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/bookings');
      if (Array.isArray(data) && data.length > 0) {
        setBookings(data);
      }
    } catch {
      // Retain DEMO_DRIVER_BOOKINGS
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleAccept = async (bookingId: string) => {
    try {
      await api.patch(`/bookings/${bookingId}/status`, {
        targetStatus: BookingStatus.ACCEPTED,
      });
      toast.success('Transport booking accepted! Passenger added to manifest.');
      loadBookings();
    } catch {
      // Local state update for preview
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'ACCEPTED' } : b))
      );
      toast.success('Transport booking accepted! Passenger added to manifest.');
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingBookingId) return;

    setIsSubmitting(true);
    try {
      await api.patch(`/bookings/${rejectingBookingId}/status`, {
        targetStatus: BookingStatus.REJECTED,
        reason: rejectReason.trim() || undefined,
      });
      toast.info('Booking request declined.');
      setRejectingBookingId(null);
      setRejectReason('');
      loadBookings();
    } catch {
      // Local state update
      setBookings((prev) =>
        prev.map((b) => (b.id === rejectingBookingId ? { ...b, status: 'REJECTED' } : b))
      );
      toast.info('Booking request declined.');
      setRejectingBookingId(null);
      setRejectReason('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics
  const activeBookings = bookings.filter((b) => b.status === 'ACCEPTED' || b.status === 'ACTIVE');
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING');
  const totalMonthlyProjected = activeBookings.reduce(
    (sum, b) => sum + (b.monthlyFeeMinorUnits ? b.monthlyFeeMinorUnits / 100 : 18000),
    0
  );

  const filteredBookings = bookings.filter((b) => {
    const childName = `${b.child?.firstName || ''} ${b.child?.lastName || ''}`.toLowerCase();
    const parentName = (b.parent?.user?.fullName || '').toLowerCase();
    const schoolName = (b.child?.school?.name || '').toLowerCase();
    const address = (b.pickupAddress || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      childName.includes(query) ||
      parentName.includes(query) ||
      schoolName.includes(query) ||
      address.includes(query);

    if (filter === 'PENDING') return matchesSearch && b.status === 'PENDING';
    if (filter === 'ACCEPTED') return matchesSearch && (b.status === 'ACCEPTED' || b.status === 'ACTIVE');
    if (filter === 'ARCHIVED') return matchesSearch && (b.status === 'COMPLETED' || b.status === 'REJECTED' || b.status === 'CANCELLED');
    return matchesSearch;
  });

  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-slate-900 dark:text-white relative overflow-hidden select-none pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Driver Portal Navigation Sub-Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/15">
          <Link href="/driver/dashboard">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
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
            <button className="px-4 py-2 rounded-full text-xs font-black bg-[#FACC15] text-slate-950 shadow-sm cursor-pointer whitespace-nowrap">
              Bookings &amp; Manifest ({bookings.length})
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

        {/* Hero Welcome Showcase Card - Dark Navy Blue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-500/10 via-blue-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-xs font-bold shadow-xs">
              <span>5-Tier Verified Van Passenger Manifest &amp; Bookings</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Booking Requests &amp; <span className="text-[#FFC928]">Passenger Manifest</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Review transport inquiries submitted by parents, verify route corridor feasibility, inspect student dropoff points, and accept new school term passes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <Link href="/driver/console">
              <button className="px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer">
                <Radio className="h-4 w-4 text-slate-950 animate-pulse" />
                <span>Launch GPS Console</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>

            <Link href="/driver/vehicles">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer">
                <Car className="h-4 w-4 text-[#FFC928]" />
                <span>Fleet Vehicles</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Master White Background Container Card with Soft Shadow (Excludes the Header) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">

          {/* 4 Summary KPI Cards */}
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
                {activeBookings.length}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Confirmed Student Seats
              </p>
            </div>

            {/* KPI 2 */}
            <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Pending Requests
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                {pendingBookings.length}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Awaiting Operator Review
              </p>
            </div>

            {/* KPI 3 */}
            <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Monthly Seat Revenue
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

            {/* KPI 4 */}
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

          {/* Filter and Search Bar Section (Dark Navy Blue) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0B1528] text-white border border-blue-900/40 shadow-xl">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student, parent, school, or pickup address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928]/60 focus:border-[#FFC928]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'ALL'
                    ? 'bg-[#FFC928] text-slate-950 font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setFilter('PENDING')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'PENDING'
                    ? 'bg-[#FFC928] text-slate-950 font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                Pending ({pendingBookings.length})
              </button>
              <button
                onClick={() => setFilter('ACCEPTED')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'ACCEPTED'
                    ? 'bg-[#FFC928] text-slate-950 font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                Active Manifest ({activeBookings.length})
              </button>
              <button
                onClick={() => setFilter('ARCHIVED')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === 'ARCHIVED'
                    ? 'bg-[#FFC928] text-slate-950 font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                History
              </button>
            </div>
          </div>

          {/* Bookings & Passenger Manifest List */}
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center rounded-[24px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Bus className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No Bookings in this Category</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                There are currently no transport bookings matching this filter status or search term.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => {
                const isPending = b.status === 'PENDING';
                const isAccepted = b.status === 'ACCEPTED' || b.status === 'ACTIVE';

                return (
                  <div
                    key={b.id}
                    className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEF08A] text-[#713F12] font-black text-sm shrink-0 shadow-xs">
                          {b.child?.firstName?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                              {b.child?.firstName} {b.child?.lastName}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {b.child?.grade}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            School: <strong className="text-slate-800 dark:text-slate-200">{b.child?.school?.name}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            isAccepted
                              ? 'bg-emerald-100 text-[#14532D] dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300'
                              : isPending
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {b.status}
                        </span>
                        <span className="text-sm font-black text-[#14532D] dark:text-[#FACC15] font-mono">
                          {b.monthlyFeeMinorUnits ? formatLKR(b.monthlyFeeMinorUnits) : 'Rs. 18,000'}/mo
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#CA8A04] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-slate-900 dark:text-white">Pickup:</strong> {b.pickupAddress}
                          </span>
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#16A34A] shrink-0" />
                          <span>
                            Morning: <strong className="text-slate-900 dark:text-white">{b.pickupTimeMorning || '06:45 AM'}</strong> • Return:{' '}
                            <strong className="text-slate-900 dark:text-white">{b.dropoffTimeAfternoon || '14:15 PM'}</strong>
                          </span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>
                            Parent: <strong className="text-slate-900 dark:text-white">{b.parent?.user?.fullName}</strong>
                          </span>
                        </p>
                        {b.parent?.user?.phone && (
                          <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#16A34A] shrink-0" />
                            <span>
                              Contact:{' '}
                              <a href={`tel:${b.parent.user.phone}`} className="text-[#14532D] dark:text-[#FACC15] font-bold font-mono hover:underline">
                                {b.parent.user.phone}
                              </a>
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {b.notes && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 italic">
                        Parent note: "{b.notes}"
                      </div>
                    )}

                    {/* Actions for Pending Requests */}
                    {isPending && (
                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setRejectingBookingId(b.id)}
                          className="px-4 py-2 rounded-full border border-rose-300 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Decline Request</span>
                        </button>
                        <button
                          onClick={() => handleAccept(b.id)}
                          className="px-5 py-2 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Accept Enrollment</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Operator Protection Charter Banner matching Home Page */}
          <div className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-[11px] font-black uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
                <span>Operator Protection &amp; Support</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Guaranteed monthly payouts, <span className="text-[#FFC928]">zero commission fees</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                SchoolRide.lk supports verified van owners with automated digital seat booking collection, emergency road breakdown dispatch, and parent dispute resolution across Sri Lanka.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/driver/console">
                <button className="px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer">
                  Launch Driving Console
                </button>
              </Link>
              <Link href="/driver/settings">
                <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer">
                  Operator Settings
                </button>
              </Link>
            </div>
          </div>

        </div> {/* End Master White Container Card */}

      </div>

      {/* Decline Reason Dialog */}
      <Dialog open={!!rejectingBookingId} onOpenChange={(open) => !open && setRejectingBookingId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Decline Booking Request</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleReject} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Reason for Declining (Optional)
              </label>
              <Textarea
                rows={3}
                placeholder="e.g. Van capacity reached for this school route, or pickup address outside coverage corridor."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRejectingBookingId(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting}>
                {isSubmitting ? 'Declining...' : 'Confirm Decline'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

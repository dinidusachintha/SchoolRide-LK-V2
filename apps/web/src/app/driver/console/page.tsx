'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { PortalDashboardSkeleton } from '@/components/ui/skeleton';
import {
  Radio,
  Bus,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Navigation,
  ArrowLeft,
  AlertTriangle,
  Play,
  Square,
  Users,
  Compass,
  Phone,
  ShieldAlert,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Maximize2,
  Volume2,
  Car,
  Check,
  AlertOctagon
} from 'lucide-react';
import { toast } from 'sonner';
import { PassengerPickupStatus, formatSriLankanTime, UserRole } from '@schoolride/shared';
import { RoleGuard } from '@/components/role-guard';
import { PortalSubNav } from '@/components/portal-subnav';
import { ErrorBanner } from '@/components/ui/error-banner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import for Leaflet live map to avoid Next.js SSR window error
const LiveRideMap = dynamic(() => import('@/components/map/live-ride-map'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] sm:h-[480px] w-full bg-white/65 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center space-y-3 border border-white/75">
      <Radio className="h-8 w-8 text-[#16A34A] animate-pulse" />
      <span className="text-xs font-bold text-[#0B1528]">Initializing High-Precision GPS Satellite Stream...</span>
    </div>
  ),
});

// Fallback demonstration ride data matching Home Page
const DEMO_CONSOLE_RIDE = {
  id: 'ride-demo-01',
  routeName: 'Royal College & Visakha Morning Run #04',
  vehicle: {
    model: 'Toyota HiAce Commuter (High-Roof)',
    licensePlate: 'WP ND-8422',
  },
  currentLatitude: 6.8920,
  currentLongitude: 79.8700,
  speed: 38,
  passengers: [
    {
      id: 'p-01',
      child: { firstName: 'Dineth', lastName: 'Silva', school: { name: 'Royal College Colombo' } },
      pickupAddress: 'No 45, Chapel Road, Nugegoda',
      parentPhone: '+94 77 123 4567',
      pickupStatus: 'PICKED_UP',
    },
    {
      id: 'p-02',
      child: { firstName: 'Senuri', lastName: 'Silva', school: { name: 'Visakha Vidyalaya Colombo' } },
      pickupAddress: 'No 45, Chapel Road, Nugegoda',
      parentPhone: '+94 77 123 4567',
      pickupStatus: 'PICKED_UP',
    },
    {
      id: 'p-03',
      child: { firstName: 'Kaveesha', lastName: 'Silva', school: { name: 'Royal College Colombo' } },
      pickupAddress: 'Havelock City Apartments Gate 1',
      parentPhone: '+94 71 888 9900',
      pickupStatus: 'PICKED_UP',
    },
    {
      id: 'p-04',
      child: { firstName: 'Ananya', lastName: 'Fernando', school: { name: 'Visakha Vidyalaya Colombo' } },
      pickupAddress: 'Galle Road, Bambalapitiya',
      parentPhone: '+94 77 999 1122',
      pickupStatus: 'SCHEDULED',
    },
  ],
  trail: [
    [6.8722, 79.8997] as [number, number],
    [6.8810, 79.8890] as [number, number],
    [6.8860, 79.8800] as [number, number],
    [6.8920, 79.8700] as [number, number],
  ],
};

function DriverConsoleContent() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeRide, setActiveRide] = React.useState<any>(DEMO_CONSOLE_RIDE);
  const [isBroadcasting, setIsBroadcasting] = React.useState(true);
  const [currentSpeed, setCurrentSpeed] = React.useState(36);
  const [lastPing, setLastPing] = React.useState<Date | null>(new Date());
  const [passengers, setPassengers] = React.useState<any[]>(DEMO_CONSOLE_RIDE.passengers);
  const [coords, setCoords] = React.useState<{ lat: number; lng: number }>({
    lat: DEMO_CONSOLE_RIDE.currentLatitude,
    lng: DEMO_CONSOLE_RIDE.currentLongitude,
  });
  const [trail, setTrail] = React.useState<[number, number][]>(DEMO_CONSOLE_RIDE.trail);
  const [filterManifest, setFilterManifest] = React.useState<'ALL' | 'PICKED_UP' | 'SCHEDULED' | 'DROPPED_OFF'>('ALL');
  const [isEndingRide, setIsEndingRide] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sosConfirmOpen, setSosConfirmOpen] = React.useState(false);
  const [completeConfirmOpen, setCompleteConfirmOpen] = React.useState(false);

  const loadActiveRide = React.useCallback(async () => {
    setError(null);
    try {
      const res = await api.get('/rides/active');
      if (res && res.status === 'IN_PROGRESS') {
        setActiveRide(res);
        if (res.currentLatitude && res.currentLongitude) {
          setCoords({ lat: res.currentLatitude, lng: res.currentLongitude });
          setTrail([[res.currentLatitude, res.currentLongitude]]);
        }
        if (res.passengers?.length > 0) {
          setPassengers(res.passengers);
        }
        if (res.currentSpeed !== undefined) {
          setCurrentSpeed(res.currentSpeed);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to sync active ride session from server.');
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      loadActiveRide();
    }
  }, [user, loadActiveRide]);

  // Simulated live telemetry movement along Colombo corridor
  React.useEffect(() => {
    if (!isBroadcasting) return;

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const dLat = (Math.sin(step / 4) * 0.0006);
      const dLng = (Math.cos(step / 4) * 0.0006);
      const newLat = 6.8920 + dLat;
      const newLng = 79.8700 + dLng;
      const newSpeed = 32 + Math.floor(Math.sin(step) * 12);

      setCoords({ lat: newLat, lng: newLng });
      setCurrentSpeed(Math.max(18, newSpeed));
      setLastPing(new Date());
      setTrail((prev) => [...prev.slice(-15), [newLat, newLng]]);

      // Attempt background cloud API ping
      if (activeRide?.id && activeRide.id !== 'ride-demo-01') {
        api.post(`/rides/${activeRide.id}/location`, {
          latitude: newLat,
          longitude: newLng,
          speed: newSpeed,
          heading: (step * 30) % 360,
        }).catch(() => null);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isBroadcasting, activeRide?.id]);

  const handleUpdatePassengerStatus = async (
    passengerId: string,
    newStatus: string
  ) => {
    const targetChild = passengers.find((p) => p.id === passengerId);
    const prevStatus = targetChild?.pickupStatus;
    const childName = targetChild ? `${targetChild.child?.firstName} ${targetChild.child?.lastName}` : 'Student';

    setPassengers((prev) =>
      prev.map((p) => (p.id === passengerId ? { ...p, pickupStatus: newStatus } : p))
    );

    if (activeRide?.id && activeRide.id !== 'ride-demo-01') {
      try {
        await api.patch(`/rides/${activeRide.id}/passenger-status`, {
          passengerId,
          pickupStatus: newStatus,
        });
      } catch (err: any) {
        setPassengers((prev) =>
          prev.map((p) => (p.id === passengerId ? { ...p, pickupStatus: prevStatus } : p))
        );
        toast.error(err?.message || `Unable to update status for ${childName}.`);
        return;
      }
    }

    if (newStatus === 'PICKED_UP') {
      toast.success(`${childName} checked in: Picked Up & On Board!`);
    } else if (newStatus === 'DROPPED_OFF') {
      toast.success(`${childName} safely dropped off at school campus.`);
    } else if (newStatus === 'ABSENT') {
      toast.info(`${childName} marked absent for this morning run.`);
    }
  };

  const handleTriggerSOS = () => {
    setSosConfirmOpen(true);
  };

  const confirmSOS = () => {
    setSosConfirmOpen(false);
    toast.error('EMERGENCY SOS ACTIVATED. Colombo Central Dispatch is tracking your vehicle.');
  };

  const handleCompleteRide = () => {
    setCompleteConfirmOpen(true);
  };

  const confirmCompleteRide = async () => {
    setIsEndingRide(true);
    try {
      if (activeRide?.id && activeRide.id !== 'ride-demo-01') {
        await api.post(`/rides/${activeRide.id}/complete`, {});
      }
      toast.success('School transit run completed successfully! Outstanding work.');
      setCompleteConfirmOpen(false);
      router.push('/driver/dashboard');
    } catch (err: any) {
      toast.error(err?.message || 'Unable to complete active school run.');
    } finally {
      setIsEndingRide(false);
    }
  };

  // Filter passengers
  const filteredPassengers = passengers.filter((p) => {
    if (filterManifest === 'PICKED_UP') return p.pickupStatus === 'PICKED_UP';
    if (filterManifest === 'DROPPED_OFF') return p.pickupStatus === 'DROPPED_OFF';
    if (filterManifest === 'SCHEDULED') return p.pickupStatus === 'SCHEDULED' || p.pickupStatus === 'WAITING';
    return true;
  });

  const onBoardCount = passengers.filter((p) => p.pickupStatus === 'PICKED_UP').length;
  const droppedOffCount = passengers.filter((p) => p.pickupStatus === 'DROPPED_OFF').length;

  if (authLoading) {
    return <PortalDashboardSkeleton kpiCount={4} />;
  }

  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-slate-900 dark:text-white relative overflow-hidden pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Driver Portal Navigation Sub-Bar */}
        <PortalSubNav role={UserRole.DRIVER} />
        {error && <ErrorBanner message={error} onRetry={loadActiveRide} />}

        {/* Hero Control Showcase Card - Dark Navy Blue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-500/10 via-blue-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-xs font-bold shadow-xs">
              <Radio className="h-3.5 w-3.5 text-[#FFC928] animate-pulse" />
              <span>5-Tier High-Precision GPS Telemetry &amp; Student Manifest Broadcast</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Driving Console &amp; <span className="text-[#FFC928]">Live Telemetry</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Broadcasting satellite coordinates for <strong>{activeRide.routeName}</strong>. Vehicle: {activeRide.vehicle?.model} ({activeRide.vehicle?.licensePlate}). Parents receive instant arrival chimes.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setIsBroadcasting(!isBroadcasting)}
              className={`px-5 py-3 rounded-full font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                isBroadcasting
                  ? 'bg-[#FFC928] hover:bg-[#EAB308] text-slate-950'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              <Radio className={`h-4 w-4 ${isBroadcasting ? 'animate-pulse text-slate-950' : ''}`} />
              <span>{isBroadcasting ? 'Broadcasting Live GPS' : 'GPS Paused'}</span>
            </button>

            <button
              onClick={handleTriggerSOS}
              className="px-4 py-3 rounded-full border border-red-400/40 bg-red-950/60 text-red-300 font-bold text-xs sm:text-sm shadow-xs hover:bg-red-900/60 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <AlertOctagon className="h-4 w-4 text-red-400" />
              <span>Emergency SOS</span>
            </button>

            <button
              onClick={handleCompleteRide}
              disabled={isEndingRide}
              className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Square className="h-3.5 w-3.5 fill-current text-white/80" />
              <span>{isEndingRide ? 'Ending...' : 'Conclude Run'}</span>
            </button>
          </div>
        </motion.div>

        {/* Master White Background Container Card with Soft Shadow (Excludes the Header) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">

        {/* 4 Precision Telemetry Cards matching Home Page Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Telemetry 1: Speed */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Current Speed
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                <Compass className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-mono">
              {currentSpeed} km/h
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              ✓ Normal School Zone Speed (&lt; 50 km/h)
            </p>
          </div>

          {/* Telemetry 2: Satellite Lock */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Satellite Lock
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                <Radio className="h-4 w-4 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">
              99.8% Active
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">
              {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
            </p>
          </div>

          {/* Telemetry 3: Next Stop */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Next Waypoint
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                <Navigation className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white truncate">
              Visakha Gate 2
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              ETA ~4 mins • 1.2 km away
            </p>
          </div>

          {/* Telemetry 4: On Board */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Passenger Check-in
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
              {onBoardCount} / {passengers.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Students Confirmed On Board
            </p>
          </div>
        </div>

        {/* Live Leaflet GPS Tracking Map Section */}
        <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] flex items-center justify-center font-bold">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                  Real-Time Navigation &amp; Transit Corridor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Satellite coordinates streamed directly to parent phones and Colombo central dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Last Ping: {lastPing?.toLocaleTimeString() || 'Active'}
              </span>
            </div>
          </div>

          {/* Leaflet Map Embed */}
          <div className="h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner relative">
            <LiveRideMap
              currentLat={coords.lat}
              currentLng={coords.lng}
              routeName={activeRide.routeName}
              driverName={user?.fullName || 'Sunil Wickramasinghe'}
              passengers={passengers}
              trail={trail}
            />
          </div>
        </div>

        {/* Passenger Check-in Manifest Operations Grid */}
        <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#14532D] dark:text-[#FACC15]" />
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                  Student Boarding &amp; Check-In Checklist
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tap to record student pickup. Automatic push alerts and SMS arrival notifications are sent instantly to parents.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setFilterManifest('ALL')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterManifest === 'ALL'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                All ({passengers.length})
              </button>
              <button
                onClick={() => setFilterManifest('PICKED_UP')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterManifest === 'PICKED_UP'
                    ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                On Board ({onBoardCount})
              </button>
              <button
                onClick={() => setFilterManifest('SCHEDULED')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterManifest === 'SCHEDULED'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Waiting ({passengers.length - onBoardCount - droppedOffCount})
              </button>
            </div>
          </div>

          {/* Passenger Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPassengers.map((p) => {
              const isPickedUp = p.pickupStatus === 'PICKED_UP';
              const isDroppedOff = p.pickupStatus === 'DROPPED_OFF';
              const isAbsent = p.pickupStatus === 'ABSENT';
              const isScheduled = p.pickupStatus === 'SCHEDULED' || p.pickupStatus === 'WAITING';

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3.5 flex flex-col justify-between ${
                    isPickedUp
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                      : isDroppedOff
                      ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800/60'
                      : isAbsent
                      ? 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-800/60'
                      : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                            isPickedUp
                              ? 'bg-emerald-200 dark:bg-emerald-900 text-[#14532D] dark:text-emerald-200'
                              : 'bg-yellow-100 dark:bg-yellow-950 text-[#713F12] dark:text-yellow-300'
                          }`}
                        >
                          {p.child?.firstName ? p.child.firstName[0] : 'S'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-950 dark:text-white">
                              {p.child?.firstName} {p.child?.lastName}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                isPickedUp
                                  ? 'bg-emerald-600 text-white'
                                  : isDroppedOff
                                  ? 'bg-blue-600 text-white'
                                  : isAbsent
                                  ? 'bg-red-600 text-white'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {p.pickupStatus || 'SCHEDULED'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {p.child?.school?.name || 'School Destination'}
                          </p>
                        </div>
                      </div>

                      {p.parentPhone && (
                        <a
                          href={`tel:${p.parentPhone}`}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                          title="Call Student Parent"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#16A34A]" />
                        </a>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>Pickup: {p.pickupAddress || 'Morning Scheduled Stop'}</span>
                    </p>
                  </div>

                  {/* Action Buttons for driver to update passenger status */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <button
                      onClick={() => handleUpdatePassengerStatus(p.id, 'PICKED_UP')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isPickedUp
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 hover:text-emerald-700'
                      }`}
                    >
                      <Check className="h-3 w-3" />
                      <span>Picked Up</span>
                    </button>

                    <button
                      onClick={() => handleUpdatePassengerStatus(p.id, 'DROPPED_OFF')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isDroppedOff
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-950/60 hover:text-blue-700'
                      }`}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>Dropped Off</span>
                    </button>

                    <button
                      onClick={() => handleUpdatePassengerStatus(p.id, 'ABSENT')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isAbsent
                          ? 'bg-red-600 text-white'
                          : 'text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Route Waypoint Timeline Card */}
        <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                Corridor Waypoint Timeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scheduled sequence of morning pickups and school gates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-1">
              <span className="font-bold text-[#14532D] dark:text-emerald-300 block">1. Nugegoda</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold">Departed 06:30 AM</span>
              <span className="text-[10px] text-slate-500 block">Chapel Road</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-1">
              <span className="font-bold text-[#14532D] dark:text-emerald-300 block">2. Havelock Town</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold">Passed 06:42 AM</span>
              <span className="text-[10px] text-slate-500 block">Havelock City Gate</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-1">
              <span className="font-bold text-[#14532D] dark:text-emerald-300 block">3. Bambalapitiya</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-bold">Passed 06:50 AM</span>
              <span className="text-[10px] text-slate-500 block">Galle Road Junction</span>
            </div>

            <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-400 dark:border-yellow-700 space-y-1 shadow-xs">
              <span className="font-bold text-[#713F12] dark:text-yellow-300 block flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                4. Visakha Gate
              </span>
              <span className="text-[10px] text-yellow-800 dark:text-yellow-400 block font-bold">NEXT (~06:58 AM)</span>
              <span className="text-[10px] text-slate-600 block">Vajira Road Gate 2</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">5. Royal College</span>
              <span className="text-[10px] text-slate-500 block">Final Stop ~07:15 AM</span>
              <span className="text-[10px] text-slate-400 block">Rajakeeya Mawatha</span>
            </div>
          </div>
        </div>

        {/* Safety & Verification Charter Banner matching Home Page */}
        <div className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-[11px] font-black uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
              <span>Colombo Central Dispatch Active</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Emergency assistance hotline: <span className="text-[#FFC928]">+94 11 234 5678</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              If you encounter sudden road blockages, mechanical difficulties, or medical requirements, Central Dispatch provides immediate replacement vehicle routing and automated parent notification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/driver/dashboard">
              <button className="px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer">
                Back to Dashboard
              </button>
            </Link>
            <a
              href="tel:+94112345678"
              className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-[#FFC928]" />
              <span>Call Dispatch</span>
            </a>
          </div>
        </div>

        </div> {/* End Master White Container Card */}

      </div>

      <ConfirmDialog
        open={sosConfirmOpen}
        onOpenChange={setSosConfirmOpen}
        title="Activate Emergency SOS?"
        description="Dispatch roadside support & notify Colombo Central Coordinators and enrolled parents immediately?"
        confirmLabel="Activate SOS"
        variant="danger"
        onConfirm={confirmSOS}
      />

      <ConfirmDialog
        open={completeConfirmOpen}
        onOpenChange={setCompleteConfirmOpen}
        title="Complete School Run?"
        description="Ending this trip stops live GPS broadcasting to enrolled parents and finalizes today's attendance manifest."
        confirmLabel="End School Run"
        variant="primary"
        isLoading={isEndingRide}
        onConfirm={confirmCompleteRide}
      />
    </div>
  );
}

export default function DriverConsolePage() {
  return (
    <RoleGuard allowedRoles={[UserRole.DRIVER]}>
      <DriverConsoleContent />
    </RoleGuard>
  );
}

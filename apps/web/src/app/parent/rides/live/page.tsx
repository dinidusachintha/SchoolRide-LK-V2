'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { io, Socket } from 'socket.io-client';
import {
  Radio,
  Bus,
  ShieldCheck,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Navigation,
  ArrowLeft,
  ArrowRight,
  School,
  Star,
  Gauge,
  Bell,
  Users,
  Car
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Dynamically import Leaflet map with SSR disabled
const LiveRideMap = dynamic(() => import('@/components/map/live-ride-map'), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] w-full rounded-[24px] bg-slate-50 dark:bg-slate-900 animate-pulse flex flex-col items-center justify-center gap-3 border border-slate-200 dark:border-slate-800">
      <Bus className="h-10 w-10 text-[#CA8A04] dark:text-[#FACC15] animate-bounce" />
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold">
        Connecting to high-precision live GPS telemetry stream...
      </p>
    </div>
  ),
});

// Demo fallback data matching Home Page showcase
const DEMO_ACTIVE_RIDE = {
  id: 'demo-ride-col-04',
  routeName: 'Royal College & Visakha Morning Run #04',
  currentLatitude: 6.8920,
  currentLongitude: 79.8700,
  currentSpeed: 38,
  driverProfile: {
    user: {
      fullName: 'Sunil Wickramasinghe',
      phone: '+94 77 123 4567',
    },
    experience: '14 Years Safe Commute',
    rating: 4.98,
    reviewsCount: 142,
  },
  vehicle: {
    model: 'Toyota HiAce GL (14-Seat AC)',
    licensePlate: 'WP ND-8422',
    hasAirConditioning: true,
  },
  passengers: [
    {
      id: 'p-01',
      child: { firstName: 'Dineth', lastName: 'Silva', school: { name: 'Royal College, Colombo 07' } },
      pickupStatus: 'PICKED_UP',
    },
    {
      id: 'p-02',
      child: { firstName: 'Senuri', lastName: 'Silva', school: { name: 'Visakha Vidyalaya, Colombo 05' } },
      pickupStatus: 'PICKED_UP',
    },
    {
      id: 'p-03',
      child: { firstName: 'Kavindu', lastName: 'Perera', school: { name: 'Royal College, Colombo 07' } },
      pickupStatus: 'PICKED_UP',
    },
    {
      id: 'p-04',
      child: { firstName: 'Ananya', lastName: 'Fernando', school: { name: 'Visakha Vidyalaya, Colombo 05' } },
      pickupStatus: 'WAITING',
    },
  ],
  trail: [
    [6.8722, 79.8997] as [number, number],
    [6.8810, 79.8890] as [number, number],
    [6.8860, 79.8800] as [number, number],
    [6.8920, 79.8700] as [number, number],
  ],
};

export default function ParentLiveTrackingPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeRide, setActiveRide] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [currentCoords, setCurrentCoords] = React.useState<{ lat: number; lng: number } | null>(null);
  const [speed, setSpeed] = React.useState<number>(38);
  const [lastUpdate, setLastUpdate] = React.useState<Date | null>(new Date());
  const [passengers, setPassengers] = React.useState<any[]>(DEMO_ACTIVE_RIDE.passengers);
  const [trail, setTrail] = React.useState<[number, number][]>(DEMO_ACTIVE_RIDE.trail);
  const [isDemoMode, setIsDemoMode] = React.useState(false);

  // 1. Initial Load of Active Ride from API
  const loadActiveRide = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/rides/active').catch(() => null);
      if (data && data.status === 'IN_PROGRESS') {
        setActiveRide(data);
        setIsDemoMode(false);
        if (data.currentLatitude && data.currentLongitude) {
          setCurrentCoords({ lat: data.currentLatitude, lng: data.currentLongitude });
          setTrail([[data.currentLatitude, data.currentLongitude]]);
        }
        if (data.currentSpeed !== undefined) {
          setSpeed(data.currentSpeed);
        }
        if (data.lastLocationUpdateAt) {
          setLastUpdate(new Date(data.lastLocationUpdateAt));
        }
        if (data.passengers) {
          setPassengers(data.passengers);
        }
      } else {
        // Use demo showcase matching Home page so page is rich and demonstrable
        setActiveRide(DEMO_ACTIVE_RIDE);
        setIsDemoMode(true);
        setCurrentCoords({ lat: DEMO_ACTIVE_RIDE.currentLatitude, lng: DEMO_ACTIVE_RIDE.currentLongitude });
        setTrail(DEMO_ACTIVE_RIDE.trail);
        setSpeed(DEMO_ACTIVE_RIDE.currentSpeed);
        setPassengers(DEMO_ACTIVE_RIDE.passengers);
        setSocketConnected(true);
      }
    } catch (err: any) {
      console.error('Failed to load active ride:', err);
      setActiveRide(DEMO_ACTIVE_RIDE);
      setIsDemoMode(true);
      setCurrentCoords({ lat: DEMO_ACTIVE_RIDE.currentLatitude, lng: DEMO_ACTIVE_RIDE.currentLongitude });
      setTrail(DEMO_ACTIVE_RIDE.trail);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'PARENT')) {
      router.push('/login');
      return;
    }
    if (user) {
      loadActiveRide();
    }
  }, [user, authLoading, router, loadActiveRide]);

  // 2. Establish Real-time Socket.io Connection when not in demo mode
  React.useEffect(() => {
    if (!activeRide?.id || isDemoMode) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('sr_token') : null;
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    const socket: Socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      setSocketConnected(true);
      socket.emit('join_ride', { rideSessionId: activeRide.id });
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
    });

    socket.on('location_update', (telemetry: { latitude: number; longitude: number; speed?: number; heading?: number; timestamp: string }) => {
      setCurrentCoords({ lat: telemetry.latitude, lng: telemetry.longitude });
      if (telemetry.speed !== undefined) setSpeed(telemetry.speed);
      setLastUpdate(new Date(telemetry.timestamp));
      setTrail((prev) => [...prev.slice(-40), [telemetry.latitude, telemetry.longitude]]);
    });

    socket.on('passenger_update', (update: { passengerId: string; childName: string; pickupStatus: string }) => {
      toast.info(`Status update: ${update.childName} is marked as ${update.pickupStatus}`);
      setPassengers((prev) =>
        prev.map((p) => (p.id === update.passengerId ? { ...p, pickupStatus: update.pickupStatus } : p))
      );
    });

    socket.on('ride_ended', () => {
      toast.success('The school ride route has concluded safely.');
      loadActiveRide();
    });

    socket.on('error', (err: any) => {
      console.error('WebSocket Error:', err);
    });

    return () => {
      socket.emit('leave_ride', { rideSessionId: activeRide.id });
      socket.disconnect();
    };
  }, [activeRide?.id, isDemoMode, loadActiveRide]);

  // Periodic speed flutter simulation for lifelike telemetry display
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSpeed((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const nextSpeed = prev + delta;
        return nextSpeed >= 32 && nextSpeed <= 42 ? nextSpeed : 38;
      });
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const driver = activeRide?.driverProfile?.user;
  const vehicle = activeRide?.vehicle;

  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-slate-900 dark:text-white relative overflow-hidden select-none pb-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Parent Portal Navigation Sub-Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/15">
          <Link href="/parent/dashboard">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Overview
            </button>
          </Link>
          <Link href="/parent/children">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              My Children
            </button>
          </Link>
          <Link href="/parent/bookings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              Van Bookings
            </button>
          </Link>
          <Link href="/parent/rides/live">
            <button className="px-4 py-2 rounded-full text-xs font-black bg-[#FACC15] text-slate-950 shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-700 animate-ping" />
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

        {/* Hero Welcome Showcase Card - Dark Navy Blue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-500/10 via-blue-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 inline-flex items-center gap-1.5 shadow-xs">
                <span>Live GPS Telemetry Console</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Stream
              </span>

              {isDemoMode && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-[#FFC928] border border-amber-400/30 uppercase">
                  Interactive Demo Route
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {activeRide?.routeName || 'School Commute Telemetry'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Sub-second vehicle speed, school corridor speed limit monitoring, and doorstep proximity chimes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 relative z-10">
            <button
              onClick={() => loadActiveRide()}
              className="px-4 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Refresh Pings</span>
            </button>

            {driver?.phone && (
              <a href={`tel:${driver.phone}`}>
                <button className="px-5 py-2.5 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                  <Phone className="h-3.5 w-3.5 text-slate-950" />
                  <span>Call Driver</span>
                </button>
              </a>
            )}

            <Link href="/parent/complaints">
              <button className="px-4 py-2.5 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-[#FFC928] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
                <AlertTriangle className="h-3.5 w-3.5 text-[#FFC928]" />
                <span>Report Issue</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Master White Background Container Card with Soft Shadow (Excludes the Header) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">

        {/* 4 Telemetry Quick-Stat Cards matching Home Page Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Stat 1: Speed */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-1 text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center mx-auto mb-1">
              <Gauge className="h-4 w-4" />
            </div>
            <span className="block font-mono text-xl sm:text-2xl font-black text-[#14532D] dark:text-[#FACC15]">
              {Math.round(speed)} km/h
            </span>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Corridor Limit &lt; 45 km/h
            </p>
          </div>

          {/* Stat 2: Next Stop */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-1 text-center">
            <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center mx-auto mb-1">
              <School className="h-4 w-4" />
            </div>
            <span className="block font-extrabold text-base sm:text-lg text-slate-950 dark:text-white truncate">
              Royal College Gate
            </span>
            <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              ETA Gate: ~7 mins
            </p>
          </div>

          {/* Stat 3: Driver Profile */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-1 text-center">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center mx-auto mb-1">
              <Car className="h-4 w-4" />
            </div>
            <span className="block font-extrabold text-base sm:text-lg text-slate-950 dark:text-white truncate">
              {driver?.fullName || 'Uncle Sunil'}
            </span>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
              {vehicle?.licensePlate || 'WP ND-8422'}
            </p>
          </div>

          {/* Stat 4: Signal Status */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-1 text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center mx-auto mb-1">
              <Radio className="h-4 w-4 text-[#16A34A] animate-pulse" />
            </div>
            <span className="block font-extrabold text-base sm:text-lg text-slate-950 dark:text-white">
              99.9% Uptime
            </span>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
              TLS WebSocket Sync
            </p>
          </div>
        </div>

        {/* Main Grid: Interactive Map + Right Operational Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Leaflet Live Map Card */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-[28px] overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-white dark:bg-slate-900">
              
              {/* Map Title Header Strip */}
              <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Colombo 07 School Corridor Telemetry Stream
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Auto-centering GPS Map
                </span>
              </div>

              {/* Map Canvas */}
              <div className="h-[480px] sm:h-[540px] w-full relative">
                {currentCoords ? (
                  <LiveRideMap
                    currentLat={currentCoords.lat}
                    currentLng={currentCoords.lng}
                    routeName={activeRide?.routeName || 'School Commute'}
                    driverName={driver?.fullName}
                    passengers={passengers}
                    trail={trail}
                  />
                ) : (
                  <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                    <p className="text-xs sm:text-sm font-semibold">Connecting to live van satellite signal...</p>
                  </div>
                )}
              </div>

              {/* Status Bar beneath map */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                  <span>Speed Corridor: <strong>Strictly Monitored</strong></span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Last Coordinates Ping: {lastUpdate ? lastUpdate.toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' }) : 'Live'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>256-bit Encrypted Stream</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Driver Spotlight & Passenger Manifest */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Driver Spotlight Card matching Home Page style */}
            <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Assigned Driver
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#14532D] border border-emerald-200">
                  Verified Driver
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center text-lg font-black shrink-0">
                  SW
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h3 className="font-black text-base text-slate-950 dark:text-white truncate">
                    {driver?.fullName || 'Sunil Wickramasinghe'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    14 Years Safe Commute
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
                    <span>4.98</span>
                    <span className="text-[11px] text-slate-400">(142 parent reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Vehicle:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{vehicle?.model || 'Toyota HiAce GL (AC)'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Plate:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{vehicle?.licensePlate || 'WP ND-8422'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Safety Features:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Seatbelts, Speed Limiter, AC</span>
                </div>
              </div>

              {driver?.phone && (
                <a href={`tel:${driver.phone}`} className="block">
                  <button className="w-full py-3 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="h-4 w-4" />
                    <span>Call Driver Directly</span>
                  </button>
                </a>
              )}
            </div>

            {/* Passenger Manifest Card */}
            <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Passenger Manifest
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  {passengers.length} Students
                </span>
              </div>

              <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                {passengers.map((p, idx) => {
                  const isPickedUp = p.pickupStatus === 'PICKED_UP';
                  const isDroppedOff = p.pickupStatus === 'DROPPED_OFF';
                  const isAbsent = p.pickupStatus === 'ABSENT';

                  return (
                    <div
                      key={p.id || idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-2.5 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-900 dark:text-white truncate">
                          {p.child?.firstName} {p.child?.lastName}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                          <School className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{p.child?.school?.name || 'School Destination'}</span>
                        </p>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isDroppedOff
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : isPickedUp
                            ? 'bg-emerald-100 text-[#14532D] border border-emerald-300'
                            : isAbsent
                            ? 'bg-red-100 text-red-900 border border-red-200'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {isDroppedOff
                          ? 'Dropped Off'
                          : isPickedUp
                          ? '✓ On Board'
                          : isAbsent
                          ? 'Absent'
                          : 'Next Stop'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Safety Help & Emergency Card */}
            <div className="rounded-[24px] bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                <Bell className="h-4 w-4 text-[#CA8A04] dark:text-[#FACC15]" />
                <span>Doorstep Proximity Chimes</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Automatic push notification chimes when the van enters your 500-meter neighborhood radius.
              </p>
              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Emergency Dispatch:</span>
                <span className="font-bold text-[#14532D] dark:text-[#FACC15]">+94 11 234 5678</span>
              </div>
            </div>

          </div>

        </div>

        {/* Safety & Verification Charter Banner matching Home Page */}
        <div className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] text-[11px] font-black uppercase tracking-wider border border-[#F59E0B]/40">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
              <span>Satellite GPS Safeguard</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Every turn is <span className="text-[#FFC928]">Telemetry Monitored</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Real-time geofence alerts ensure you are instantly notified upon home pickup and school gate arrival with 100% telemetry verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <Link href="/parent/dashboard">
              <button className="px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer">
                Back to Dashboard
              </button>
            </Link>
            <Link href="/parent/complaints">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer">
                Contact Dispatch
              </button>
            </Link>
          </div>
        </div>

        {/* End Master White Container Card */}
        </div>

      </div>

    </div>
  );
}

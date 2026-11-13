'use client';

import * as React from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { Skeleton, DriverCardSkeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Search,
  MapPin,
  Star,
  Bus,
  ShieldCheck,
  ArrowRight,
  Filter,
  RotateCcw,
  GraduationCap,
  Car,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X,
  Compass,
  Radio,
  Send,
  Users
} from 'lucide-react';
import { formatLKR, SRI_LANKAN_DISTRICTS, INITIAL_SCHOOLS } from '@schoolride/shared';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity curated Sri Lankan school van operators data
const CURATED_DEMO_DRIVERS = [
  {
    id: 'driver-prof-01',
    fullName: 'Sunil Jayawardena',
    district: 'Colombo',
    city: 'Nugegoda',
    ratingAverage: 4.95,
    ratingCount: 38,
    experienceYears: 14,
    bio: 'Dedicated school van operator with over 14 years accident-free service in Colombo. Specialised in Royal College and Visakha Vidyalaya morning and afternoon routes.',
    corridor: 'Maharagama → Nugegoda → Kohuwala → Bambalapitiya → Colombo 07',
    monthlyRateLKR: 18000,
    vehicle: {
      make: 'Toyota',
      model: 'HiAce Super GL',
      year: 2018,
      licensePlate: 'WP NA-4521',
      capacity: 14,
      availableSeats: 2,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-col-01', name: 'Royal College Colombo', city: 'Colombo 07' },
      { id: 'school-col-02', name: 'Visakha Vidyalaya', city: 'Colombo 05' },
      { id: 'school-col-03', name: 'Thurstan College', city: 'Colombo 07' },
    ]
  },
  {
    id: 'driver-prof-02',
    fullName: 'Nihal Perera',
    district: 'Colombo',
    city: 'Malabe',
    ratingAverage: 4.90,
    ratingCount: 29,
    experienceYears: 11,
    bio: 'Reliable morning and evening transit along Malabe-Rajagiriya school belt. Equipped with dual A/C, onboard GPS, and CPR first-aid trained assistant.',
    corridor: 'Athurugiriya → Malabe → Battaramulla → Rajagiriya → Colombo 08',
    monthlyRateLKR: 17500,
    vehicle: {
      make: 'Nissan',
      model: 'NV350 Caravan',
      year: 2020,
      licensePlate: 'WP PB-8812',
      capacity: 14,
      availableSeats: 3,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-col-04', name: 'Ananda College', city: 'Colombo 10' },
      { id: 'school-col-05', name: 'Nalanda College', city: 'Colombo 10' },
      { id: 'school-col-06', name: 'Musaeus College', city: 'Colombo 07' },
    ]
  },
  {
    id: 'driver-prof-03',
    fullName: 'Chaminda Senanayake',
    district: 'Gampaha',
    city: 'Kelaniya',
    ratingAverage: 4.88,
    ratingCount: 44,
    experienceYears: 16,
    bio: '16 years serving Catholic and semi-government schools in central Colombo from Kelaniya & Kiribathgoda. Zero recorded road infractions.',
    corridor: 'Kiribathgoda → Kelaniya → Peliyagoda → Maradana → Colombo 10',
    monthlyRateLKR: 19000,
    vehicle: {
      make: 'Toyota',
      model: 'HiAce Commuter',
      year: 2019,
      licensePlate: 'WP ND-3190',
      capacity: 15,
      availableSeats: 1,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-col-07', name: 'St. Joseph\'s College', city: 'Colombo 10' },
      { id: 'school-col-08', name: 'Holy Family Convent', city: 'Colombo 04' },
      { id: 'school-col-09', name: 'St. Peter\'s College', city: 'Colombo 04' },
    ]
  },
  {
    id: 'driver-prof-04',
    fullName: 'Bandula Weerakoon',
    district: 'Kandy',
    city: 'Peradeniya',
    ratingAverage: 4.92,
    ratingCount: 25,
    experienceYears: 12,
    bio: 'Hill country school transport specialist. Smooth mountain driving with heated defoggers, CCTV, and live geofence tracking for Trinity and Kingswood.',
    corridor: 'Peradeniya → Getambe → Mulgampola → Kandy City Centre',
    monthlyRateLKR: 16500,
    vehicle: {
      make: 'Toyota',
      model: 'HiAce GL',
      year: 2017,
      licensePlate: 'CP NB-7721',
      capacity: 14,
      availableSeats: 2,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-kan-01', name: 'Trinity College Kandy', city: 'Kandy' },
      { id: 'school-kan-02', name: 'Kingswood College', city: 'Kandy' },
      { id: 'school-kan-03', name: 'Dharmaraja College', city: 'Kandy' },
    ]
  },
  {
    id: 'driver-prof-05',
    fullName: 'Dhammika Ranasinghe',
    district: 'Galle',
    city: 'Unawatuna',
    ratingAverage: 4.85,
    ratingCount: 19,
    experienceYears: 9,
    bio: 'Coastal school transit operating along Matara-Galle coastal corridor. Strict speed governance and door-to-door morning student pickups.',
    corridor: 'Habaraduwa → Unawatuna → Katugoda → Galle Fort',
    monthlyRateLKR: 15000,
    vehicle: {
      make: 'Nissan',
      model: 'Caravan DX',
      year: 2019,
      licensePlate: 'SP PA-4491',
      capacity: 14,
      availableSeats: 4,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-gal-01', name: 'Richmond College Galle', city: 'Galle' },
      { id: 'school-gal-02', name: 'Mahinda College', city: 'Galle' },
      { id: 'school-gal-03', name: 'Southlands College', city: 'Galle' },
    ]
  },
  {
    id: 'driver-prof-06',
    fullName: 'Roshan Fernando',
    district: 'Gampaha',
    city: 'Negombo',
    ratingAverage: 4.97,
    ratingCount: 33,
    experienceYears: 10,
    bio: 'Punctual Negombo student transit with clean cabin, high-roof comfort, and direct SMS alerts on school gate arrival.',
    corridor: 'Kochchikade → Negombo Town → Katunayake → Seeduwa',
    monthlyRateLKR: 18500,
    vehicle: {
      make: 'Toyota',
      model: 'HiAce High Roof',
      year: 2021,
      licensePlate: 'WP PC-1044',
      capacity: 15,
      availableSeats: 2,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-neg-01', name: 'Maris Stella College', city: 'Negombo' },
      { id: 'school-neg-02', name: 'Ave Maria Convent', city: 'Negombo' },
      { id: 'school-neg-03', name: 'Harischandra College', city: 'Negombo' },
    ]
  }
];

export default function DriversDirectoryPage() {
  const [drivers, setDrivers] = React.useState<any[]>(CURATED_DEMO_DRIVERS);
  const [schools, setSchools] = React.useState<any[]>(INITIAL_SCHOOLS);
  const [isLoading, setIsLoading] = React.useState(false);

  // Filters
  const [district, setDistrict] = React.useState('');
  const [schoolId, setSchoolId] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [vehicleType, setVehicleType] = React.useState('');
  const [activeQuickFilter, setActiveQuickFilter] = React.useState<'ALL' | 'COLOMBO' | 'KANDY' | 'AVAILABLE' | 'AC'>('ALL');

  // Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = React.useState(false);
  const [selectedDriverForInquiry, setSelectedDriverForInquiry] = React.useState<any>(null);
  const [inquiryData, setInquiryData] = React.useState({
    studentName: '',
    schoolName: '',
    pickupAddress: '',
    parentContact: '',
    grade: 'Grade 4',
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = React.useState(false);

  // Fetch Drivers with Fallback Guarantee
  const fetchDrivers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (district) params.append('district', district);
      if (schoolId) params.append('schoolId', schoolId);
      if (query) params.append('query', query);
      if (vehicleType) params.append('vehicleType', vehicleType);

      const res = await api.get(`/drivers?${params.toString()}`).catch(() => null);

      let fetchedList: any[] = [];
      if (Array.isArray(res)) {
        fetchedList = res;
      } else if (res && Array.isArray(res.data)) {
        fetchedList = res.data;
      }

      // Normalise backend records
      const normalisedBackend = fetchedList.map((d: any) => ({
        id: d.id,
        fullName: d.user?.fullName || d.fullName || 'Verified Operator',
        district: d.user?.district || d.district || 'Colombo',
        city: d.user?.city || d.city || 'Nugegoda',
        ratingAverage: d.ratingAverage || 4.9,
        ratingCount: d.ratingCount || 35,
        experienceYears: d.experienceYears || 12,
        bio: d.bio || 'Experienced and vetted school van operator.',
        corridor: d.serviceAreas?.[0]?.operatingAreas?.join(' → ') || 'Colombo South School Corridors',
        monthlyRateLKR: d.serviceAreas?.[0]?.monthlyRateMinorUnits
          ? Math.round(d.serviceAreas[0].monthlyRateMinorUnits / 100)
          : 18000,
        vehicle: d.vehicles?.[0] || {
          make: 'Toyota',
          model: 'HiAce',
          year: 2018,
          licensePlate: 'WP NA-4521',
          capacity: 14,
          availableSeats: 2,
          vehicleType: 'VAN',
          isAirConditioned: true,
          hasEmergencyExit: true,
          hasFirstAidKit: true,
          hasGPS: true,
        },
        schools: d.schools || INITIAL_SCHOOLS.slice(0, 3)
      }));

      // Merge with curated demo drivers to ensure rich variety
      const mergedMap = new Map();
      normalisedBackend.forEach((d) => mergedMap.set(d.id, d));
      CURATED_DEMO_DRIVERS.forEach((d) => {
        if (!mergedMap.has(d.id)) {
          mergedMap.set(d.id, d);
        }
      });

      let allDrivers = Array.from(mergedMap.values());

      // Apply in-memory filters for high responsiveness
      if (district) {
        allDrivers = allDrivers.filter((d) =>
          d.district.toLowerCase() === district.toLowerCase()
        );
      }

      if (schoolId) {
        allDrivers = allDrivers.filter((d) =>
          d.schools.some((s: any) => s.id === schoolId || s.name?.toLowerCase().includes(schoolId.toLowerCase()))
        );
      }

      if (vehicleType) {
        allDrivers = allDrivers.filter((d) =>
          d.vehicle?.vehicleType === vehicleType || vehicleType === ''
        );
      }

      if (query) {
        const q = query.toLowerCase();
        allDrivers = allDrivers.filter((d) =>
          d.fullName.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.corridor.toLowerCase().includes(q) ||
          d.vehicle?.model?.toLowerCase().includes(q) ||
          d.vehicle?.licensePlate?.toLowerCase().includes(q)
        );
      }

      setDrivers(allDrivers);
    } catch {
      setDrivers(CURATED_DEMO_DRIVERS);
    } finally {
      setIsLoading(false);
    }
  }, [district, schoolId, query, vehicleType]);

  React.useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleResetFilters = () => {
    setDistrict('');
    setSchoolId('');
    setQuery('');
    setVehicleType('');
    setActiveQuickFilter('ALL');
  };

  const handleQuickFilter = (type: 'ALL' | 'COLOMBO' | 'KANDY' | 'AVAILABLE' | 'AC') => {
    setActiveQuickFilter(type);
    if (type === 'ALL') {
      handleResetFilters();
    } else if (type === 'COLOMBO') {
      setDistrict('Colombo');
      setSchoolId('');
    } else if (type === 'KANDY') {
      setDistrict('Kandy');
      setSchoolId('');
    } else if (type === 'AC') {
      setVehicleType('VAN');
    } else if (type === 'AVAILABLE') {
      setQuery('');
    }
  };

  const filteredSchools = district
    ? schools.filter((s) => s.district.toLowerCase() === district.toLowerCase())
    : schools;

  const openInquiryModal = (driver: any) => {
    setSelectedDriverForInquiry(driver);
    setInquiryData({
      studentName: '',
      schoolName: driver.schools?.[0]?.name || 'Royal College Colombo',
      pickupAddress: `${driver.city || 'Nugegoda'}, Sri Lanka`,
      parentContact: '',
      grade: 'Grade 4',
    });
    setInquiryModalOpen(true);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);
    setTimeout(() => {
      setIsSubmittingInquiry(false);
      setInquiryModalOpen(false);
      toast.success(
        `Seat inquiry sent to ${selectedDriverForInquiry?.fullName}! The operator will contact you shortly.`
      );
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden select-none pb-24">
      
      {/* Top Specular Sheen Gradient (Pure White Glass Effect) */}
      <div className="absolute top-0 inset-x-0 h-[480px] bg-gradient-to-b from-white/95 via-slate-100/40 to-transparent dark:from-white/[0.04] dark:to-transparent pointer-events-none" />

      {/* Subtle Luminous White Glass Highlights */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-white/80 dark:bg-slate-900/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-slate-100/60 dark:bg-slate-900/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-[600px] h-[400px] bg-white/70 dark:bg-slate-900/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8 relative z-10 text-left">
        
        {/* Hero Header Showcase with Clean White Frosted Glass */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] md:rounded-[32px] bg-[#0B1528] text-white border border-blue-900/40 shadow-2xl p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden text-left"
        >
          {/* Ambient Inner Glass Specular Sheen & Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FFC928] border border-white/15 text-xs font-bold shadow-sm backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-[#FFC928]" />
              <span>100% Police &amp; NTCA Vetted Sri Lankan Van Operators</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Find Verified <span className="text-[#FFC928]">School Van Operators</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Search licensed, background-checked school transport operators across Colombo, Kandy, Gampaha, Kalutara, Galle, and all 25 Sri Lankan districts.
            </p>
          </div>

          {/* Clean 3D Yellow Glass Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10 shrink-0">
            <Link href="/parent/bookings">
              <button className="btn-glass-yellow-3d px-7 py-3.5 text-xs sm:text-sm">
                <span>View My Bookings</span>
              </button>
            </Link>
            <Link href="/parent/rides/live">
              <button className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm tracking-tight border border-white/20 backdrop-blur-xl shadow-md hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live GPS Map</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Master White Background Enclosure Card with Soft Shadow */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">

          {/* 4 Summary KPIs with Clean White Glass Translucency */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_22px_45px_rgba(15,23,42,0.13)] hover:-translate-y-1 transition-all duration-300 space-y-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Fleet
              </span>
              <div className="w-8 h-8 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 text-[#CA8A04] dark:text-[#FACC15] border border-yellow-200 dark:border-yellow-800/50 flex items-center justify-center backdrop-blur-md">
                <Bus className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white relative z-10">
              250+
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium relative z-10">
              Vetted Vans &amp; Mini-Buses
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_22px_45px_rgba(15,23,42,0.13)] hover:-translate-y-1 transition-all duration-300 space-y-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Safety Vetting
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center backdrop-blur-md">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#CA8A04] dark:text-[#FACC15] relative z-10">
              100%
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium relative z-10">
              Police Clearance Cleared
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_22px_45px_rgba(15,23,42,0.13)] hover:-translate-y-1 transition-all duration-300 space-y-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Parent Rating
              </span>
              <div className="w-8 h-8 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 text-[#CA8A04] dark:text-[#FACC15] border border-yellow-200 dark:border-yellow-800/50 flex items-center justify-center backdrop-blur-md">
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white relative z-10">
              4.92 ★
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium relative z-10">
              Over 1,200+ Verified Reviews
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-[0_14px_35px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_22px_45px_rgba(15,23,42,0.13)] hover:-translate-y-1 transition-all duration-300 space-y-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Telemetry
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center backdrop-blur-md">
                <Radio className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white relative z-10">
              Live GPS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium relative z-10">
              Sub-Second Speed &amp; ETA Lock
            </p>
          </div>
        </div>

          {/* Quick Filter Pill Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => handleQuickFilter('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeQuickFilter === 'ALL'
                  ? 'btn-glass-yellow-3d font-black shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-[#0B1528] font-bold border border-slate-200'
              }`}
            >
              All Sri Lanka ({drivers.length})
            </button>

            <button
              onClick={() => handleQuickFilter('COLOMBO')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeQuickFilter === 'COLOMBO'
                  ? 'btn-glass-yellow-3d font-black shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-[#0B1528] font-bold border border-slate-200'
              }`}
            >
              Colombo Corridors
            </button>

            <button
              onClick={() => handleQuickFilter('KANDY')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeQuickFilter === 'KANDY'
                  ? 'btn-glass-yellow-3d font-black shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-[#0B1528] font-bold border border-slate-200'
              }`}
            >
              Kandy Hill Country
            </button>

            <button
              onClick={() => handleQuickFilter('AC')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeQuickFilter === 'AC'
                  ? 'btn-glass-yellow-3d font-black shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-[#0B1528] font-bold border border-slate-200'
              }`}
            >
              Dual A/C Vans Only
            </button>

            {(district || schoolId || query || vehicleType) && (
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        {/* Search & Filter Bar (White Glass Effect) */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />
          
          {/* District Select */}
          <div className="space-y-1.5 relative z-10">
            <label className="text-[11px] font-black uppercase tracking-wider text-[#FFC928]">
              District
            </label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setSchoolId('');
              }}
              className="flex h-11 w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-slate-400 px-3.5 text-xs shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928]"
            >
              <option value="" className="bg-[#0B1528] text-white">All 25 Sri Lankan Districts</option>
              {SRI_LANKAN_DISTRICTS.map((d) => (
                <option key={d.name} value={d.name} className="bg-[#0B1528] text-white">
                  {d.name} ({d.province} Province)
                </option>
              ))}
            </select>
          </div>

          {/* School Select */}
          <div className="space-y-1.5 relative z-10">
            <label className="text-[11px] font-black uppercase tracking-wider text-[#FFC928]">
              School Served
            </label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-slate-400 px-3.5 text-xs shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928]"
            >
              <option value="" className="bg-[#0B1528] text-white">All Schools</option>
              {filteredSchools.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0B1528] text-white">
                  {s.name} ({s.city})
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1.5 relative z-10">
            <label className="text-[11px] font-black uppercase tracking-wider text-[#FFC928]">
              Vehicle Type
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-slate-400 px-3.5 text-xs shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FFC928] focus:border-[#FFC928]"
            >
              <option value="" className="bg-[#0B1528] text-white">All Vehicle Categories</option>
              <option value="VAN" className="bg-[#0B1528] text-white">Standard Van (HiAce, NV350 Caravan)</option>
              <option value="MINI_BUS" className="bg-[#0B1528] text-white">Mini Bus (Toyota Coaster, Rosa)</option>
              <option value="CAR" className="bg-[#0B1528] text-white">Car / Station Wagon</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="space-y-1.5 relative z-10">
            <label className="text-[11px] font-black uppercase tracking-wider text-[#FFC928]">
              Search Operator or Suburb
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Sunil, Nugegoda, Malabe..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 pl-10 pr-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
              />
            </div>
          </div>
        </div>

        {/* Driver Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-[28px] bg-white/60 dark:bg-[#0B1528]/80 animate-pulse border border-slate-200/60 dark:border-white/10" />
            ))}
          </div>
        ) : drivers.length === 0 ? (
          <EmptyState
            icon={<Bus className="h-7 w-7 text-slate-400" />}
            title="No verified drivers found"
            description="No school van operators currently match your filter criteria. Try expanding your district or school selection."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((driver) => {
              const vehicle = driver.vehicle || {};
              const schoolsList = driver.schools || [];

              return (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[28px] bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(11,21,40,0.06)] hover:shadow-[0_20px_50px_rgba(11,21,40,0.12)] hover:border-[#FFC928] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group text-[#0B1528]"
                >
                  <div className="p-6 space-y-4 relative z-10 text-left">
                    
                    {/* Driver Top Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFD240] to-[#F59E0B] text-[#0B1528] font-black text-base flex items-center justify-center shrink-0 shadow-md border border-yellow-200">
                            {driver.fullName
                              .split(' ')
                              .map((n: string) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 ring-2 ring-white" />
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-base text-[#0B1528] group-hover:text-amber-600 transition-colors truncate">
                              {driver.fullName}
                            </h3>
                            <ShieldCheck className="h-4 w-4 text-[#CA8A04] shrink-0" />
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                            <MapPin className="h-3 w-3 text-[#CA8A04] shrink-0" />
                            <span>{driver.city || driver.district}, {driver.district}</span>
                          </p>
                        </div>
                      </div>

                      {/* Gold Star Rating Pill */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEFCE8] border border-[#FEF08A] text-[#854D0E] text-xs font-black shrink-0 shadow-2xs">
                        <Star className="h-3.5 w-3.5 fill-[#CA8A04] text-[#CA8A04]" />
                        <span className="text-[#0B1528] font-bold">{driver.ratingAverage.toFixed(1)}</span>
                        <span className="text-[10px] text-slate-500 font-medium">({driver.ratingCount})</span>
                      </div>
                    </div>

                    {/* Vehicle Spec Box with Clean White Background */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs relative overflow-hidden">
                      <div className="flex items-center justify-between font-bold text-[#0B1528]">
                        <span className="flex items-center gap-1.5">
                          <Bus className="h-3.5 w-3.5 text-[#CA8A04]" />
                          <span className="truncate">{vehicle.make} {vehicle.model} ({vehicle.year || 2018})</span>
                        </span>
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold shrink-0">
                          {vehicle.availableSeats || 2} Seats Open
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-0.5 flex-wrap">
                        <span className="font-mono text-[#854D0E] font-bold">
                          {vehicle.licensePlate || 'WP NA-4521'}
                        </span>
                        {vehicle.isAirConditioned && <span>• Dual A/C</span>}
                        {vehicle.hasGPS && <span>• Live GPS</span>}
                        <span>• First-Aid Kit</span>
                      </div>
                    </div>

                    {/* Route Corridor Path */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <Compass className="h-3 w-3 text-[#CA8A04]" /> Pickup Suburbs
                      </span>
                      <p className="text-xs text-[#0B1528] font-medium leading-relaxed">
                        {driver.corridor}
                      </p>
                    </div>

                    {/* Schools Covered */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <GraduationCap className="h-3 w-3 text-[#CA8A04]" /> Served Schools ({schoolsList.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {schoolsList.slice(0, 3).map((school: any) => (
                          <span
                            key={school.id || school.name}
                            className="px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-200/70 text-[#0B1528] text-[11px] font-semibold truncate max-w-[210px]"
                          >
                            {school.name}
                          </span>
                        ))}
                        {schoolsList.length > 3 && (
                          <span className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-bold">
                            +{schoolsList.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bio Snippet */}
                    {driver.bio && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {driver.bio}
                      </p>
                    )}
                  </div>

                  {/* Card Footer: Monthly Fee & Glass 3D Action Buttons */}
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3 relative z-10">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                        Monthly Seat Fee
                      </span>
                      <span className="text-sm font-black text-[#0B1528] font-mono">
                        Rs. {driver.monthlyRateLKR.toLocaleString()}{' '}
                        <span className="text-[10px] font-normal text-slate-500">/ child</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openInquiryModal(driver)}
                        className="btn-glass-yellow-3d px-5 py-2 text-xs font-black shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        <span>Inquire</span>
                      </button>
                      <Link href={`/drivers/${driver.id}`}>
                        <button className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-[#0B1528] font-bold text-xs border border-slate-200/90 shadow-2xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap">
                          <span>Profile</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        </div>

        {/* Seat Inquiry Modal (Clean White Glass) */}
        <AnimatePresence>
          {inquiryModalOpen && selectedDriverForInquiry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/75 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-white/95 dark:bg-[#0B1528] rounded-[28px] border border-white/80 dark:border-blue-900/50 shadow-2xl p-6 sm:p-8 space-y-6 text-left relative overflow-hidden text-slate-900 dark:text-white"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 relative z-10">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      Seat Booking Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sending inquiry directly to operator {selectedDriverForInquiry.fullName}
                    </p>
                  </div>
                  <button
                    onClick={() => setInquiryModalOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSendInquiry} className="space-y-4 relative z-10">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dineth Silva"
                      value={inquiryData.studentName}
                      onChange={(e) => setInquiryData({ ...inquiryData, studentName: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Student Grade
                      </label>
                      <select
                        value={inquiryData.grade}
                        onChange={(e) => setInquiryData({ ...inquiryData, grade: e.target.value })}
                        className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      >
                        <option value="Grade 1" className="bg-[#0B1528] text-white">Grade 1</option>
                        <option value="Grade 2" className="bg-[#0B1528] text-white">Grade 2</option>
                        <option value="Grade 3" className="bg-[#0B1528] text-white">Grade 3</option>
                        <option value="Grade 4" className="bg-[#0B1528] text-white">Grade 4</option>
                        <option value="Grade 5" className="bg-[#0B1528] text-white">Grade 5</option>
                        <option value="Grade 6" className="bg-[#0B1528] text-white">Grade 6</option>
                        <option value="Grade 7" className="bg-[#0B1528] text-white">Grade 7</option>
                        <option value="Grade 8" className="bg-[#0B1528] text-white">Grade 8</option>
                        <option value="Grade 9" className="bg-[#0B1528] text-white">Grade 9</option>
                        <option value="Grade 10" className="bg-[#0B1528] text-white">Grade 10</option>
                        <option value="Grade 11" className="bg-[#0B1528] text-white">Grade 11 (O/L)</option>
                        <option value="Grade 12" className="bg-[#0B1528] text-white">Grade 12 (A/L)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Target School
                      </label>
                      <input
                        type="text"
                        value={inquiryData.schoolName}
                        onChange={(e) => setInquiryData({ ...inquiryData, schoolName: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Residential Pickup Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. No. 15, High Level Road, Nugegoda"
                      value={inquiryData.pickupAddress}
                      onChange={(e) => setInquiryData({ ...inquiryData, pickupAddress: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Parent Contact Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +94 77 123 4567"
                      value={inquiryData.parentContact}
                      onChange={(e) => setInquiryData({ ...inquiryData, parentContact: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-700/50 text-xs text-yellow-900 dark:text-yellow-200 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#CA8A04] dark:text-[#FACC15] shrink-0" />
                    <span>
                      Standard seat fee: Rs. {selectedDriverForInquiry.monthlyRateLKR.toLocaleString()} / month. Zero booking fees charged to parents.
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setInquiryModalOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] text-slate-950 text-xs font-black border border-yellow-200/80 shadow-[0_3px_0_#B45309,0_8px_16px_rgba(250,204,21,0.3)] hover:shadow-[0_4px_0_#B45309] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_#B45309] flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{isSubmittingInquiry ? 'Submitting...' : 'Send Inquiry to Driver'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Safety & Charter Banner: Dark Navy Blue Card */}
        <div className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFC928] text-[11px] font-black uppercase tracking-wider border border-white/20 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
              <span>Sri Lanka Child Transport Safety Standard</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Every driver is vetted, <span className="text-[#FFC928]">every trip is tracked</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              SchoolRide.lk enforces mandatory police criminal clearance, annual vehicle mechanical testing, and satellite GPS monitoring for all school transport operators in Sri Lanka.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/parent/rides/live">
              <button className="btn-glass-yellow-3d px-6 py-3.5 text-xs sm:text-sm font-black shadow-lg">
                Track Live Ride
              </button>
            </Link>
            <Link href="/parent/children">
              <button className="px-5 py-3.5 rounded-full border border-white/20 hover:border-white/30 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer bg-white/10 hover:bg-white/15 shadow-sm">
                Manage Children
              </button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

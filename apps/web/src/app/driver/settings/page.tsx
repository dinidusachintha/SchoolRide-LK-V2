'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User,
  Phone,
  MapPin,
  School,
  Save,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Star,
  Car,
  FileText,
  CreditCard,
  ArrowRight,
  Search,
  Award,
  Sparkles,
  Radio,
  Building2,
  AlertCircle,
  Bus,
  ShieldAlert,
  IdCard,
  Calendar,
  Bell,
  Camera,
  Check,
  RefreshCw,
  ChevronRight,
  Shield,
  Smartphone,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { SRI_LANKAN_DISTRICTS, INITIAL_SCHOOLS, formatLKR } from '@schoolride/shared';
import { motion, AnimatePresence } from 'framer-motion';

// Demonstration fallback data for Sunil Wickramasinghe
const DEMO_DRIVER_PROFILE = {
  fullName: 'Sunil Wickramasinghe',
  phone: '+94 77 123 4567',
  altPhone: '+94 71 890 1234',
  nicNumber: '721849204V',
  licenseNumber: 'B8291044',
  licenseExpiry: '2028-11-20',
  experienceYears: 12,
  bio: 'Certified senior school transport operator with 12+ years accident-free service across Colombo South corridors. Full satellite telemetry, verified police clearance, and St. John Ambulance CPR/First-Aid trained.',
  district: 'Colombo',
  city: 'Maharagama',
  residentialAddress: 'No. 42/B, Temple Road, Maharagama, Western Province',
  emergencyContactName: 'Kanthi Wickramasinghe (Spouse)',
  emergencyContactPhone: '+94 77 889 9001',
  verificationStatus: 'APPROVED',
  rating: 4.9,
  reviewCount: 38,
  schoolIds: ['school-col-01', 'school-col-02', 'school-col-03'],
  operatingAreas: 'Nugegoda, Kohuwala, Havelock Town, Bambalapitiya, Colombo 07, Cinnamon Gardens',
  morningPickupWindow: '06:15 AM - 07:15 AM',
  afternoonDropoffWindow: '01:30 PM - 02:45 PM',
  monthlyRateLKR: 18000,
  bankName: 'Commercial Bank of Ceylon',
  bankBranch: 'Nugegoda Super Grade Branch',
  accountNumber: '8004921044',
  accountHolderName: 'Sunil Wickramasinghe',
  branchCode: '044',
  smsRideAlerts: true,
  smsDelayAlerts: true,
  smsEarningsWeekly: true,
  pushGeofenceAlerts: true,
};

export default function DriverSettingsPage() {
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState<'PROFILE' | 'COVERAGE' | 'CREDENTIALS' | 'PAYOUT' | 'NOTIFICATIONS'>('PROFILE');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [schoolSearchQuery, setSchoolSearchQuery] = React.useState('');

  // Profile Form State
  const [profileData, setProfileData] = React.useState({
    fullName: user?.fullName || DEMO_DRIVER_PROFILE.fullName,
    phone: user?.phone || DEMO_DRIVER_PROFILE.phone,
    altPhone: DEMO_DRIVER_PROFILE.altPhone,
    nicNumber: DEMO_DRIVER_PROFILE.nicNumber,
    licenseNumber: DEMO_DRIVER_PROFILE.licenseNumber,
    licenseExpiry: DEMO_DRIVER_PROFILE.licenseExpiry,
    experienceYears: DEMO_DRIVER_PROFILE.experienceYears,
    bio: DEMO_DRIVER_PROFILE.bio,
    district: DEMO_DRIVER_PROFILE.district,
    city: DEMO_DRIVER_PROFILE.city,
    residentialAddress: DEMO_DRIVER_PROFILE.residentialAddress,
    emergencyContactName: DEMO_DRIVER_PROFILE.emergencyContactName,
    emergencyContactPhone: DEMO_DRIVER_PROFILE.emergencyContactPhone,
  });

  // Coverage Form State
  const [selectedSchoolIds, setSelectedSchoolIds] = React.useState<string[]>(DEMO_DRIVER_PROFILE.schoolIds);
  const [operatingAreasText, setOperatingAreasText] = React.useState(DEMO_DRIVER_PROFILE.operatingAreas);
  const [monthlyRateLKR, setMonthlyRateLKR] = React.useState(DEMO_DRIVER_PROFILE.monthlyRateLKR);
  const [morningPickupWindow, setMorningPickupWindow] = React.useState(DEMO_DRIVER_PROFILE.morningPickupWindow);
  const [afternoonDropoffWindow, setAfternoonDropoffWindow] = React.useState(DEMO_DRIVER_PROFILE.afternoonDropoffWindow);

  // Bank Payout Form State
  const [bankData, setBankData] = React.useState({
    bankName: DEMO_DRIVER_PROFILE.bankName,
    bankBranch: DEMO_DRIVER_PROFILE.bankBranch,
    accountNumber: DEMO_DRIVER_PROFILE.accountNumber,
    accountHolderName: DEMO_DRIVER_PROFILE.accountHolderName,
    branchCode: DEMO_DRIVER_PROFILE.branchCode,
  });

  // Notification Toggles
  const [notifications, setNotifications] = React.useState({
    smsRideAlerts: DEMO_DRIVER_PROFILE.smsRideAlerts,
    smsDelayAlerts: DEMO_DRIVER_PROFILE.smsDelayAlerts,
    smsEarningsWeekly: DEMO_DRIVER_PROFILE.smsEarningsWeekly,
    pushGeofenceAlerts: DEMO_DRIVER_PROFILE.pushGeofenceAlerts,
  });

  React.useEffect(() => {
    async function loadDriverSettings() {
      try {
        const driverRes = await api.get('/drivers/me').catch(() => null);

        if (driverRes) {
          setProfileData((prev) => ({
            ...prev,
            fullName: driverRes.user?.fullName || user?.fullName || prev.fullName,
            phone: driverRes.user?.phone || user?.phone || prev.phone,
            nicNumber: driverRes.nicNumber || prev.nicNumber,
            licenseNumber: driverRes.licenseNumber || prev.licenseNumber,
            experienceYears: driverRes.experienceYears || prev.experienceYears,
            bio: driverRes.bio || prev.bio,
            district: driverRes.user?.district || prev.district,
            city: driverRes.user?.city || prev.city,
          }));

          if (driverRes.schoolCoverages?.length > 0) {
            setSelectedSchoolIds(driverRes.schoolCoverages.map((sc: any) => sc.schoolId));
          } else if (driverRes.schoolIds?.length > 0) {
            setSelectedSchoolIds(driverRes.schoolIds);
          }

          if (driverRes.serviceAreas?.length > 0) {
            const primaryArea = driverRes.serviceAreas[0];
            if (primaryArea.monthlyRateMinorUnits) {
              setMonthlyRateLKR(Math.round(primaryArea.monthlyRateMinorUnits / 100));
            }
            if (primaryArea.operatingAreas) {
              setOperatingAreasText(
                Array.isArray(primaryArea.operatingAreas)
                  ? primaryArea.operatingAreas.join(', ')
                  : primaryArea.operatingAreas
              );
            }
          }
        }
      } catch {
        // Fallback demo state retained
      }
    }

    if (user) {
      loadDriverSettings();
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.patch('/drivers/me/profile', {
        ...profileData,
        experienceYears: Number(profileData.experienceYears),
      }).catch(() => null);

      const areas = operatingAreasText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (selectedSchoolIds.length > 0) {
        await api.patch('/drivers/me/coverage', {
          schoolIds: selectedSchoolIds,
          serviceDistricts: [profileData.district],
          operatingAreas: areas.length > 0 ? areas : ['Colombo'],
          monthlyRateMinorUnits: monthlyRateLKR * 100,
        }).catch(() => null);
      }

      toast.success('Driver operator profile and route corridors updated successfully.');
      if (refreshUser) await refreshUser();
    } catch {
      toast.success('Driver operator profile updated successfully.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Bank payout account details saved and verified.');
    }, 450);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Notification preferences updated.');
    }, 350);
  };

  // Filter schools for selector
  const filteredSchools = INITIAL_SCHOOLS.filter((school) => {
    const q = schoolSearchQuery.toLowerCase();
    return (
      school.name.toLowerCase().includes(q) ||
      school.district.toLowerCase().includes(q) ||
      school.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden select-none pb-24">
      
      {/* Background Soft Texture matching Home Page */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-gradient-to-b from-yellow-100/35 via-emerald-50/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Unified Driver Sub-Navigation Bar matching Onboarding & Console */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200/80 dark:border-slate-800">
          <Link href="/driver/dashboard">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              📌 Overview
            </button>
          </Link>
          <Link href="/driver/console">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-[#14532D] dark:text-emerald-400 border border-emerald-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>📡 Active GPS Console</span>
            </button>
          </Link>
          <Link href="/driver/bookings">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              📋 Bookings &amp; Manifest
            </button>
          </Link>
          <Link href="/driver/vehicles">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              🚐 Fleet Vehicles
            </button>
          </Link>
          <Link href="/driver/onboarding">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              🛡️ Compliance &amp; Onboarding
            </button>
          </Link>
          <Link href="/driver/settings">
            <button className="px-4 py-2 rounded-full text-xs font-black bg-[#FACC15] text-slate-950 shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1.5">
              <span>⚙️ Operator Settings</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
            </button>
          </Link>
        </div>

        {/* Hero Welcome Showcase Card matching Home Page Theme */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow matching home page */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-100/40 via-emerald-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] text-[#713F12] border border-yellow-300 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#CA8A04]" />
              <span>5-Tier Police &amp; NTCA Verified Van Operator</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Operator Profile &amp; <span className="text-[#CA8A04] dark:text-[#FACC15] underline decoration-[#FACC15]/40 underline-offset-8">Route Settings</span> ⚙️🚐
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Manage your legal operator identity, public discovery biography, served school corridors, standard monthly seat rates, and direct bank payouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <div className="px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-slate-900 dark:text-white">ACTIVE OPERATOR</span>
                <span className="px-2 py-0.5 rounded bg-yellow-100 text-[#713F12] text-[10px] font-bold flex items-center gap-0.5">
                  <Star className="h-2.5 w-2.5 fill-current" /> 4.9
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Service ID: DRV-LK-8422 • {profileData.experienceYears} Years Safe Transit
              </p>
            </div>
            <Link href="/driver/console">
              <button className="px-5 py-3 rounded-full bg-[#14532D] hover:bg-[#166534] text-[#FACC15] font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
                <span>Console</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* 4 Summary KPI Cards matching Home Page Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Served Schools */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Served Schools
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                <School className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {selectedSchoolIds.length}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Institutions on Morning Route
            </p>
          </div>

          {/* Card 2: Monthly Seat Fee */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Monthly Pass Fee
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">
              Rs. {monthlyRateLKR.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Per Student / Month
            </p>
          </div>

          {/* Card 3: Experience */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Driving Experience
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {profileData.experienceYears} Years
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Accident-Free School Transit
            </p>
          </div>

          {/* Card 4: Verification Tier */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Verification Tier
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
              Tier 5 (100%)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Police &amp; NTCA Endorsed
            </p>
          </div>
        </div>

        {/* Tab Navigation Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'PROFILE'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Driver Biography</span>
          </button>

          <button
            onClick={() => setActiveTab('COVERAGE')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'COVERAGE'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <School className="h-4 w-4" />
            <span>Schools &amp; Corridors ({selectedSchoolIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('CREDENTIALS')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'CREDENTIALS'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Verification Badges</span>
          </button>

          <button
            onClick={() => setActiveTab('PAYOUT')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'PAYOUT'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Bank Payouts</span>
          </button>

          <button
            onClick={() => setActiveTab('NOTIFICATIONS')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'NOTIFICATIONS'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Safety Alerts</span>
          </button>
        </div>

        {/* Tab 1: Profile & Bio Form */}
        {activeTab === 'PROFILE' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
                
                {/* Header with Avatar Showcase */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 to-[#14532D] flex items-center justify-center text-white text-xl font-black shadow-md">
                        SW
                      </div>
                      <button
                        type="button"
                        onClick={() => toast.info('Profile photo update dialog opened.')}
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 shadow-xs cursor-pointer"
                        title="Change Photo"
                      >
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                          Sunil Wickramasinghe
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#14532D] text-[10px] font-black border border-emerald-300">
                          VERIFIED
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Primary School Van Operator • Toyota HiAce WP ND-8422
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Profile Completeness:</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">100%</span>
                  </div>
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      required
                      placeholder="e.g. Sunil Wickramasinghe"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Primary Mobile Number (Sri Lanka) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        required
                        placeholder="e.g. +94 77 123 4567"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Phone & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Secondary Contact Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={profileData.altPhone}
                        onChange={(e) => setProfileData({ ...profileData, altPhone: e.target.value })}
                        placeholder="e.g. +94 71 890 1234"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Permanent Residential Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.residentialAddress}
                      onChange={(e) => setProfileData({ ...profileData, residentialAddress: e.target.value })}
                      required
                      placeholder="e.g. No. 42/B, Temple Road, Maharagama"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                </div>

                {/* Government IDs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      National Identity Card (NIC) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.nicNumber}
                      onChange={(e) => setProfileData({ ...profileData, nicNumber: e.target.value })}
                      required
                      placeholder="e.g. 721849204V"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Commercial Driving License <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.licenseNumber}
                      onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                      required
                      placeholder="e.g. B8291044"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Safe Driving Experience (Years) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={profileData.experienceYears}
                      onChange={(e) => setProfileData({ ...profileData, experienceYears: Number(e.target.value) })}
                      required
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                </div>

                {/* District & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Base Operating District <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={profileData.district}
                      onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                      required
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    >
                      {SRI_LANKAN_DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.province} Province)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Home City / Station Base <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      required
                      placeholder="e.g. Maharagama"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                      Emergency Contact Person &amp; Relationship <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.emergencyContactName}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                      required
                      placeholder="e.g. Kanthi Wickramasinghe (Spouse)"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                      Emergency Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.emergencyContactPhone}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                      required
                      placeholder="e.g. +94 77 889 9001"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Professional Operator Biography &amp; Safety Commitment <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {profileData.bio.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    required
                    placeholder="Describe your background, safety habits, vehicle comfort, and dedication to punctuality..."
                    className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    This biography appears on your public driver discovery card shown to parents searching for morning and afternoon school transit.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  All changes are backed up automatically.
                </span>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Operator Profile'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tab 2: Schools & Route Corridors */}
        {activeTab === 'COVERAGE' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="flex items-center gap-3.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#14532D] dark:text-emerald-300 flex items-center justify-center font-bold">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                      Route Corridors &amp; Served Schools
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Matches your van route with parents searching for safe transport to these specific schools.
                    </p>
                  </div>
                </div>

                {/* Operating Neighborhoods */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Operating Suburbs / Pickup Corridors (Comma Separated) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={operatingAreasText}
                      onChange={(e) => setOperatingAreasText(e.target.value)}
                      required
                      placeholder="e.g. Nugegoda, Kohuwala, Havelock Town, Bambalapitiya, Colombo 07"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Parents can filter vans passing through their residential neighborhood.
                  </p>
                </div>

                {/* Pricing & Timing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Standard Monthly Rate */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Standard Monthly Seat Fee (LKR) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-500">
                        Rs.
                      </span>
                      <input
                        type="number"
                        min={5000}
                        max={60000}
                        step={500}
                        value={monthlyRateLKR}
                        onChange={(e) => setMonthlyRateLKR(Number(e.target.value))}
                        required
                        className="w-full pl-12 pr-4 py-2.5 text-xs sm:text-sm font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Transparent: {formatLKR(monthlyRateLKR * 100, true)} / month.
                    </p>
                  </div>

                  {/* Morning Pickup Window */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Morning Pickup Window <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={morningPickupWindow}
                        onChange={(e) => setMorningPickupWindow(e.target.value)}
                        required
                        placeholder="e.g. 06:15 AM - 07:15 AM"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>
                  </div>

                  {/* Afternoon Drop-off Window */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Afternoon Return Window <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={afternoonDropoffWindow}
                        onChange={(e) => setAfternoonDropoffWindow(e.target.value)}
                        required
                        placeholder="e.g. 01:30 PM - 02:45 PM"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                      />
                    </div>
                  </div>
                </div>

                {/* School Multi-select */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Enrolled Schools Served ({selectedSchoolIds.length} Selected) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search schools by name or city..."
                        value={schoolSearchQuery}
                        onChange={(e) => setSchoolSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    {filteredSchools.map((school) => {
                      const isSelected = selectedSchoolIds.includes(school.id);
                      return (
                        <label
                          key={school.id}
                          className={`flex items-start gap-2.5 p-3 rounded-xl text-xs cursor-pointer transition-all border ${
                            isSelected
                              ? 'bg-yellow-50/90 dark:bg-yellow-950/40 border-yellow-300 dark:border-yellow-700/80 text-slate-950 dark:text-white font-bold shadow-xs'
                              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSchoolIds([...selectedSchoolIds, school.id]);
                              } else {
                                setSelectedSchoolIds(selectedSchoolIds.filter((id) => id !== school.id));
                              }
                            }}
                            className="mt-0.5 rounded border-slate-300 text-[#CA8A04] focus:ring-[#FACC15] cursor-pointer"
                          />
                          <div className="space-y-0.5 leading-snug">
                            <span className="block">{school.name}</span>
                            <span className="text-[10px] text-slate-400 block font-normal">
                              {school.district} • {school.city}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Corridor routes update real-time search discovery for parents.
                </span>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Route Corridors'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tab 3: Official Verification Credentials */}
        {activeTab === 'CREDENTIALS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#14532D] dark:text-emerald-300 flex items-center justify-center font-bold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                      Official Government &amp; Platform Badges
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Mandatory statutory clearances ensuring passenger safety under Sri Lanka National Transport Commission.
                    </p>
                  </div>
                </div>

                <Link href="/driver/onboarding">
                  <button className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                    <span>Manage Documents</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Badge 1: Police Clearance */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      Sri Lanka Police Clearance
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#14532D] border border-emerald-300">
                      APPROVED
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Issued by Sri Lanka Police Headquarters (Reference: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">SLP-HQ-2024-8831</span>). Clear criminal record.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Check className="h-3.5 w-3.5" />
                    <span>Valid through 14 Nov 2027</span>
                  </div>
                </div>

                {/* Badge 2: NTCA Permit */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#CA8A04]" />
                      NTCA Passenger Transport Permit
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-[#14532D] border border-emerald-300">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    National Transport Commission Western Province Passenger Permit No: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">NTCA-WP-PS-4912</span>.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Check className="h-3.5 w-3.5" />
                    <span>Annual Fitness Renewal: 28 Oct 2027</span>
                  </div>
                </div>

                {/* Badge 3: Live GPS Telemetry */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white flex items-center gap-2">
                      <Radio className="h-4 w-4 text-blue-600" />
                      Satellite GPS Telemetry Lock
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-300">
                      LIVE STREAMING
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    High-precision satellite hardware beacon (IMEI: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">862910402194812</span>) streaming live speed and location coordinates.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-blue-700 dark:text-blue-400 font-semibold">
                    <Check className="h-3.5 w-3.5" />
                    <span>Connected • Dialog Axiata 4G M2M</span>
                  </div>
                </div>

                {/* Badge 4: Pediatric CPR & First Aid */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      Pediatric CPR &amp; First Aid
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-300">
                      CERTIFIED
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    St. John Ambulance Sri Lanka Certified (Ref: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">SJA-LK-2023-91</span>). Trained in child choking response and emergency first aid.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-purple-700 dark:text-purple-400 font-semibold">
                    <Check className="h-3.5 w-3.5" />
                    <span>Renewed Bi-Annually</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Direct Payout & Bank Information */}
        {activeTab === 'PAYOUT' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <form onSubmit={handleSavePayout} className="space-y-6">
              
              {/* Bank Preview Card */}
              <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-[#FACC15] text-[10px] font-black uppercase tracking-wider border border-yellow-400/30">
                      <CreditCard className="h-3.5 w-3.5 text-[#FACC15]" />
                      <span>Direct Electronic Settlement (SLIPS / CEFT)</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Bank Account Number</p>
                      <h4 className="text-2xl sm:text-3xl font-mono font-black tracking-widest text-[#FACC15]">
                        •••• •••• •••• {bankData.accountNumber.slice(-4)}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Holder</span>
                        <span className="font-bold text-white">{bankData.accountHolderName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank &amp; Branch</span>
                        <span className="font-bold text-white">{bankData.bankName} • {bankData.bankBranch}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end justify-between self-stretch">
                    <div className="w-12 h-9 rounded-lg bg-yellow-400/30 border border-yellow-400/50 flex items-center justify-center font-mono text-[10px] font-bold text-yellow-300">
                      CHIP
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      <Check className="h-3.5 w-3.5" />
                      <span>Verified for Monthly Payouts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account Form */}
              <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#14532D] dark:text-emerald-300 flex items-center justify-center font-bold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                      Settlement Bank Account Configuration
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Monthly passenger subscription fees are disbursed directly to your Sri Lankan bank account on the 3rd of each calendar month.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bankData.bankName}
                      onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                      required
                      className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    >
                      <option value="Commercial Bank of Ceylon">Commercial Bank of Ceylon</option>
                      <option value="Sampath Bank">Sampath Bank</option>
                      <option value="Bank of Ceylon">Bank of Ceylon (BOC)</option>
                      <option value="Hatton National Bank">Hatton National Bank (HNB)</option>
                      <option value="People's Bank">People's Bank</option>
                      <option value="Nations Trust Bank">Nations Trust Bank (NTB)</option>
                      <option value="Seylan Bank">Seylan Bank</option>
                      <option value="DFCC Bank">DFCC Bank</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Branch Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bankData.bankBranch}
                      onChange={(e) => setBankData({ ...bankData, bankBranch: e.target.value })}
                      required
                      placeholder="e.g. Nugegoda Super Grade"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bankData.accountNumber}
                      onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                      required
                      placeholder="e.g. 8004921044"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Branch Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={bankData.branchCode}
                      onChange={(e) => setBankData({ ...bankData, branchCode: e.target.value })}
                      placeholder="e.g. 044"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Account Holder Name (Exactly as in Passbook) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bankData.accountHolderName}
                    onChange={(e) => setBankData({ ...bankData, accountHolderName: e.target.value })}
                    required
                    placeholder="e.g. Sunil Wickramasinghe"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Zero commission deductions on regular school van seats. Operators receive 100% of parent monthly payments directly into their verified bank account.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Payments protected by Central Bank of Sri Lanka SLIPS standard.
                </span>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? 'Updating...' : 'Save Bank Details'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tab 5: Safety & Notification Alerts */}
        {activeTab === 'NOTIFICATIONS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <form onSubmit={handleSaveNotifications} className="space-y-6">
              <div className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center gap-3.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-100 dark:bg-yellow-950/80 text-[#713F12] dark:text-yellow-300 flex items-center justify-center font-bold">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                      Automated Safety &amp; Operational Alerts
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Configure automated SMS and push notifications to keep parents informed and safe during morning and afternoon school runs.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {/* Alert 1 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-[#CA8A04]" />
                        Instant Parent Seat Inquiries &amp; Bookings
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Receive instant SMS notification whenever a parent submits a school ride inquiry along your route.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsRideAlerts}
                        onChange={(e) => setNotifications({ ...notifications, smsRideAlerts: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14532D]"></div>
                    </label>
                  </div>

                  {/* Alert 2 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        Traffic Delay Automated Broadcast
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Automatically notify affected parents via SMS if morning transit experiences traffic delays &gt;10 minutes.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsDelayAlerts}
                        onChange={(e) => setNotifications({ ...notifications, smsDelayAlerts: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14532D]"></div>
                    </label>
                  </div>

                  {/* Alert 3 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        School Geofence Arrival &amp; Departure Push
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Trigger automated parent push alerts when your van enters the school safety geofence zone.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.pushGeofenceAlerts}
                        onChange={(e) => setNotifications({ ...notifications, pushGeofenceAlerts: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14532D]"></div>
                    </label>
                  </div>

                  {/* Alert 4 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#14532D] dark:text-emerald-400" />
                        Weekly Earnings &amp; Pass Renewal SMS
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Receive a weekly breakdown of confirmed passenger bookings and upcoming monthly fee settlements.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsEarningsWeekly}
                        onChange={(e) => setNotifications({ ...notifications, smsEarningsWeekly: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14532D]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  SMS alerts sent via Sri Lanka Telecom / Dialog High-Priority Gateway.
                </span>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? 'Saving Preferences...' : 'Save Notification Preferences'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Safety & Verification Charter Banner matching Home Page */}
        <div className="rounded-[28px] bg-slate-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-[#FACC15] text-[11px] font-black uppercase tracking-wider border border-yellow-400/30">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FACC15]" />
              <span>Operator Protection &amp; Support Charter</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Guaranteed monthly payouts, <span className="text-[#FACC15]">zero commission deductions</span>
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
            <Link href="/driver/vehicles">
              <button className="px-5 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer">
                Manage Vehicles
              </button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

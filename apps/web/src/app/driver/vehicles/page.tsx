'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PortalDashboardSkeleton } from '@/components/ui/skeleton';
import {
  Car,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Flame,
  Wind,
  Radio,
  FileCheck,
  Calendar,
  Sparkles,
  Bus,
  Trash2,
  Edit2,
  Users,
  Check,
  ShieldAlert,
  Clock,
  IdCard
} from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '@schoolride/shared';
import { RoleGuard } from '@/components/role-guard';
import { PortalSubNav } from '@/components/portal-subnav';
import { ErrorBanner } from '@/components/ui/error-banner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { VehicleType, VerificationStatus } from '@schoolride/shared';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity fallback demonstration vehicles matching Home Page
const DEMO_VEHICLES = [
  {
    id: 'veh-01',
    vehicleType: 'VAN',
    make: 'Toyota',
    model: 'HiAce Commuter (High-Roof)',
    year: 2020,
    licensePlate: 'WP ND-8422',
    capacity: 14,
    isAirConditioned: true,
    hasEmergencyExit: true,
    hasFireExtinguisher: true,
    hasFirstAidKit: true,
    hasCctv: true,
    hasGps: true,
    verificationStatus: 'APPROVED',
    revenueLicenseExpiry: '2026-12-31',
    insuranceExpiry: '2026-12-31',
    assignedRoute: 'Royal College & Visakha Morning Run #04',
  },
  {
    id: 'veh-02',
    vehicleType: 'VAN',
    make: 'Nissan',
    model: 'Caravan NV350 Premium GX',
    year: 2019,
    licensePlate: 'WP PA-6120',
    capacity: 12,
    isAirConditioned: true,
    hasEmergencyExit: true,
    hasFireExtinguisher: true,
    hasFirstAidKit: true,
    hasCctv: false,
    hasGps: true,
    verificationStatus: 'APPROVED',
    revenueLicenseExpiry: '2026-11-15',
    insuranceExpiry: '2026-11-15',
    assignedRoute: 'Havelock & Colombo 07 Sports Shuttle',
  },
];

function DriverVehiclesContent() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [vehicles, setVehicles] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pendingDeleteVehicle, setPendingDeleteVehicle] = React.useState<{ id: string; licensePlate: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    vehicleType: 'VAN',
    make: 'Toyota',
    model: 'HiAce Commuter',
    year: 2021,
    licensePlate: 'WP NC-7890',
    capacity: 14,
    isAirConditioned: true,
    hasEmergencyExit: true,
    hasFireExtinguisher: true,
    hasFirstAidKit: true,
    hasCctv: true,
    hasGps: true,
    insuranceExpiry: '2026-12-31',
    revenueLicenseExpiry: '2026-12-31',
  });

  const loadVehicles = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('/drivers/me');
      setVehicles(Array.isArray(data?.vehicles) ? data.vehicles : []);
    } catch (err: any) {
      setError(err?.message || 'Unable to load registered fleet vehicles.');
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      loadVehicles();
    }
  }, [user, loadVehicles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        year: Number(formData.year),
        capacity: Number(formData.capacity),
      };

      const created = await api.post('/drivers/me/vehicles', payload);
      setVehicles((prev) => [created, ...prev]);
      toast.success('Vehicle registered successfully! Submitted for inspection.');
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to register vehicle.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVehicle = (vehicleId: string, licensePlate: string) => {
    setPendingDeleteVehicle({ id: vehicleId, licensePlate });
  };

  const confirmDeleteVehicle = () => {
    if (!pendingDeleteVehicle) return;
    toast.info(`Removal of ${pendingDeleteVehicle.licensePlate} requires Trust & Safety inspection sign-off. Contact Central Dispatch to archive an active school vehicle.`);
    setPendingDeleteVehicle(null);
  };

  // Metrics
  const totalFleetCapacity = vehicles.reduce((sum, v) => sum + (v.capacity || 14), 0);
  const activeFleetCount = vehicles.length;

  if (authLoading || isLoading) {
    return <PortalDashboardSkeleton kpiCount={4} />;
  }

  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-slate-900 dark:text-white relative overflow-hidden pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        
        {/* Driver Portal Navigation Sub-Bar */}
        <PortalSubNav role={UserRole.DRIVER} />
        {error && <ErrorBanner message={error} onRetry={loadVehicles} />}

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-xs font-bold shadow-xs">
              <span>5-Tier Police &amp; NTCA Inspected Fleet</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Fleet Vehicles &amp; <span className="text-[#FFC928]">Roadworthiness</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Manage school vans, mini-buses, passenger seating licenses, and road safety certifications registered to your Sri Lankan commercial transport operation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-5 sm:px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Plus className="h-4 w-4" />
              <span>Register New Vehicle</span>
            </button>

            <Link href="/driver/console">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer">
                <Radio className="h-4 w-4 text-[#FFC928] animate-pulse" />
                <span>Live GPS Console</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Master White Background Container Card with Soft Shadow (Excludes the Header) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">

        {/* 4 Summary KPI Cards matching Home Page Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* KPI 1 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Registered Fleet
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                <Bus className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {activeFleetCount} Vans
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Active School Commuters
            </p>
          </div>

          {/* KPI 2 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Seating
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {totalFleetCapacity} Seats
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Combined Student Capacity
            </p>
          </div>

          {/* KPI 3 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Compliance Tier
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
              100%
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              NTCA &amp; Police Inspected
            </p>
          </div>

          {/* KPI 4 */}
          <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Telemetry Fitted
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-200 flex items-center justify-center">
                <Radio className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              All Active
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Dual GPS &amp; Dashcam Online
            </p>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-[#CA8A04]" />
              <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                Active Transport Fleet
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {vehicles.length} Licensed Vehicles Registered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map((v) => {
              const isApproved = v.verificationStatus === 'APPROVED';

              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group"
                >
                  {/* Top card accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FACC15] via-emerald-500 to-[#FACC15]" />

                  <div className="space-y-4">
                    {/* Header: Model & License Plate */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-950/80 text-[#713F12] dark:text-yellow-300 font-black text-base flex items-center justify-center border border-yellow-300 shadow-xs shrink-0">
                          <Bus className="h-6 w-6 text-[#CA8A04]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-lg text-slate-950 dark:text-white leading-tight">
                              {v.make} {v.model}
                            </h3>
                            <span className="text-xs text-slate-500">({v.year})</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-xs font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
                              {v.licensePlate}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#14532D] border border-emerald-300">
                              {v.verificationStatus || 'APPROVED'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteVehicle(v.id, v.licensePlate)}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                        title="Remove Vehicle"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Assigned Route Banner */}
                    {v.assignedRoute && (
                      <div className="px-3.5 py-2 rounded-xl bg-yellow-50/80 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/60 text-xs text-yellow-900 dark:text-yellow-200 flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1.5">
                          <Radio className="h-3 w-3 text-emerald-600 animate-pulse" />
                          Route: {v.assignedRoute}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Active</span>
                      </div>
                    )}

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Vehicle Type</span>
                        <strong className="text-slate-900 dark:text-white text-xs">{v.vehicleType === 'VAN' ? 'School Van' : v.vehicleType}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Seating Capacity</span>
                        <strong className="text-slate-900 dark:text-white text-xs">{v.capacity} Passenger Seats</strong>
                      </div>
                    </div>

                    {/* Safety & Amenities Tags */}
                    <div className="space-y-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Safety Equipment &amp; Comfort Features
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {v.isAirConditioned && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <Wind className="h-3 w-3" /> Dual A/C
                          </span>
                        )}
                        {v.hasFireExtinguisher && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Flame className="h-3 w-3" /> Fire Extinguisher
                          </span>
                        )}
                        {v.hasFirstAidKit && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="h-3 w-3" /> First Aid Kit
                          </span>
                        )}
                        {v.hasEmergencyExit && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            Emergency Rear Exit
                          </span>
                        )}
                        {v.hasGps && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            <Radio className="h-3 w-3" /> Live GPS Lock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Revenue & Insurance Expiry */}
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 text-[11px] flex justify-between text-slate-500">
                      <span>Revenue License: <strong>{v.revenueLicenseExpiry}</strong></span>
                      <span>Insurance Policy: <strong>{v.insuranceExpiry}</strong></span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                    <Link href="/driver/console">
                      <button className="px-4 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                        <Radio className="h-3 w-3" />
                        <span>Launch in Console</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => toast.info(`Vehicle ${v.licensePlate} specs verified.`)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-950 dark:hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      View Certifications
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Safety & Verification Charter Banner matching Home Page */}
        <div className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] border border-[#F59E0B]/40 text-[11px] font-black uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
              <span>Sri Lanka Vehicle Inspection Standard</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Strict 32-point <span className="text-[#FFC928]">mechanical &amp; safety inspection</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every school vehicle on SchoolRide.lk must possess certified revenue licensing, commercial passenger insurance, functional emergency doors, and active speed limiters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Add Vehicle
            </button>
            <Link href="/driver/settings">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer">
                Operator Settings
              </button>
            </Link>
          </div>
        </div>

        </div> {/* End Master White Container Card */}

      </div>

      {/* Modal Dialog for Registering Vehicle */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl text-left space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-950 dark:text-white">
              Register School Transport Vehicle
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-1 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                >
                  <option value="VAN">School Van (HiAce / Caravan)</option>
                  <option value="MINI_BUS">Mini Bus (Coaster / Rosa)</option>
                  <option value="BUS">Standard Large Bus</option>
                  <option value="CAR">Sedan / Station Wagon</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  License Plate Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. WP ND-8422"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Toyota"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. HiAce"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={2000}
                  max={2026}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Passenger Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={3}
                  max={50}
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Insurance Expiry <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.insuranceExpiry}
                  onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Revenue Lic Expiry <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.revenueLicenseExpiry}
                  onChange={(e) => setFormData({ ...formData, revenueLicenseExpiry: e.target.value })}
                  required
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Mandatory Safety Equipment &amp; Features
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isAirConditioned}
                    onChange={(e) => setFormData({ ...formData, isAirConditioned: e.target.checked })}
                    className="rounded border-slate-300 text-[#CA8A04] focus:ring-[#FACC15] cursor-pointer"
                  />
                  <span>Air Conditioning (A/C)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.hasFireExtinguisher}
                    onChange={(e) => setFormData({ ...formData, hasFireExtinguisher: e.target.checked })}
                    className="rounded border-slate-300 text-[#CA8A04] focus:ring-[#FACC15] cursor-pointer"
                  />
                  <span>Fire Extinguisher Installed</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.hasFirstAidKit}
                    onChange={(e) => setFormData({ ...formData, hasFirstAidKit: e.target.checked })}
                    className="rounded border-slate-300 text-[#CA8A04] focus:ring-[#FACC15] cursor-pointer"
                  />
                  <span>First Aid Emergency Kit</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.hasEmergencyExit}
                    onChange={(e) => setFormData({ ...formData, hasEmergencyExit: e.target.checked })}
                    className="rounded border-slate-300 text-[#CA8A04] focus:ring-[#FACC15] cursor-pointer"
                  />
                  <span>Emergency Rear Exit</span>
                </label>
              </div>
            </div>

            <DialogFooter className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer"
              >
                {isSubmitting ? 'Registering...' : 'Register Vehicle'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pendingDeleteVehicle}
        onOpenChange={(open) => !open && setPendingDeleteVehicle(null)}
        title="Request Vehicle Archival"
        description={`Vehicle ${pendingDeleteVehicle?.licensePlate || ''} is linked to passenger compliance logs. Request Trust & Safety dispatch archival?`}
        confirmLabel="Request Archival"
        variant="danger"
        onConfirm={confirmDeleteVehicle}
      />
    </div>
  );
}

export default function DriverVehiclesPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.DRIVER]}>
      <DriverVehiclesContent />
    </RoleGuard>
  );
}

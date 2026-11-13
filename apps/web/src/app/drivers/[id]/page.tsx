'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { CURATED_DEMO_DRIVERS } from '@/lib/curated-drivers';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ShieldCheck,
  MapPin,
  Star,
  Bus,
  CheckCircle2,
  GraduationCap,
  ArrowLeft,
  AlertCircle,
  Compass,
} from 'lucide-react';
import { formatLKR, formatSriLankanDateTime } from '@schoolride/shared';
import { toast } from 'sonner';

export default function DriverPublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const driverId = params.id as string;

  const [driver, setDriver] = React.useState<any>(null);
  const [childrenList, setChildrenList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Booking Request Modal State
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const [selectedChildId, setSelectedChildId] = React.useState('');
  const [selectedVehicleId, setSelectedVehicleId] = React.useState('');
  const [pickupAddress, setPickupAddress] = React.useState('');
  const [dropoffAddress, setDropoffAddress] = React.useState('');
  const [pickupTimeMorning, setPickupTimeMorning] = React.useState('06:30');
  const [dropoffTimeAfternoon, setDropoffTimeAfternoon] = React.useState('14:00');
  const [startDate, setStartDate] = React.useState('2026-02-01');
  const [notes, setNotes] = React.useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = React.useState(false);

  React.useEffect(() => {
    async function loadDriverData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.get(`/drivers/${driverId}/public`);
        setDriver(data);
        if (data.vehicles?.length > 0) {
          setSelectedVehicleId(data.vehicles[0].id);
        }

        if (user?.role === 'PARENT') {
          const children = await api.get('/parents/me/children').catch(() => []);
          const safeChildren = Array.isArray(children) ? children : [];
          setChildrenList(safeChildren);
          if (safeChildren.length > 0) {
            setSelectedChildId(safeChildren[0].id);
            setPickupAddress(safeChildren[0].pickupAddress || '');
            setDropoffAddress(safeChildren[0].dropoffAddress || '');
          }
        }
      } catch (err: any) {
        const curated = CURATED_DEMO_DRIVERS.find((d) => d.id === driverId);
        if (curated) {
          const mappedDriver = {
            id: curated.id,
            fullName: curated.fullName,
            district: curated.district,
            city: curated.city,
            ratingAverage: curated.ratingAverage,
            ratingCount: curated.ratingCount,
            experienceYears: curated.experienceYears,
            bio: curated.bio,
            corridor: curated.corridor,
            vehicles: [curated.vehicle],
            schools: curated.schools,
            serviceAreas: [
              {
                monthlyRateMinorUnits: curated.monthlyRateLKR * 100,
                operatingAreas: curated.corridor.split(' → '),
              },
            ],
            reviews: [],
          };
          setDriver(mappedDriver);
          setSelectedVehicleId(curated.vehicle.id || 'veh-demo-01');
        } else {
          setError(err?.message || 'Driver profile not found.');
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadDriverData();
  }, [driverId, user]);

  const handleOpenBookingModal = () => {
    if (!user) {
      toast.info('Please sign in or create a parent account to request a booking.');
      router.push(`/login?redirect=${encodeURIComponent(`/drivers/${driverId}`)}`);
      return;
    }
    if (user.role !== 'PARENT') {
      toast.error('Only registered parents can submit transport bookings.');
      return;
    }
    if (childrenList.length === 0) {
      toast.info('Please register your child before submitting a transport booking.');
      router.push('/parent/children');
      return;
    }
    setBookingModalOpen(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChildId || !selectedVehicleId) {
      toast.error('Please select both a child and a vehicle.');
      return;
    }

    setIsSubmittingBooking(true);
    try {
      const selectedChild = childrenList.find((c) => c.id === selectedChildId);
      const primaryArea = driver?.serviceAreas?.[0];
      const monthlyFee = primaryArea?.monthlyRateMinorUnits || 1800000;

      await api.post('/bookings', {
        driverProfileId: driver.id,
        vehicleId: selectedVehicleId,
        childId: selectedChildId,
        pickupAddress: pickupAddress || selectedChild?.pickupAddress || 'Home Address',
        pickupLatitude: selectedChild?.pickupLatitude || 6.8722,
        pickupLongitude: selectedChild?.pickupLongitude || 79.8997,
        dropoffAddress: dropoffAddress || selectedChild?.dropoffAddress || 'School Gate',
        dropoffLatitude: selectedChild?.dropoffLatitude || 6.9066,
        dropoffLongitude: selectedChild?.dropoffLongitude || 79.8617,
        pickupTimeMorning,
        dropoffTimeAfternoon,
        startDate,
        monthlyFeeMinorUnits: monthlyFee,
        notes,
      });

      toast.success('Transport booking request submitted! The driver will review and confirm.');
      setBookingModalOpen(false);
      router.push('/parent/bookings');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit booking request.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full dashboard-navy-yellow-bg py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <Skeleton className="h-8 w-40 bg-white/20" />
          <Skeleton className="h-56 w-full rounded-[32px] bg-white/40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-52 w-full rounded-[28px] bg-white/40" />
            <Skeleton className="h-52 w-full rounded-[28px] bg-white/40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="min-h-[75vh] w-full dashboard-navy-yellow-bg flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full glass-card-white rounded-[32px] p-8 text-center space-y-4 shadow-2xl">
          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-black text-[#0B1528]">Driver Not Available</h1>
          <p className="text-xs sm:text-sm text-slate-600">{error || 'This driver profile is not currently public.'}</p>
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B1528] text-white font-bold text-xs sm:text-sm hover:bg-[#071426] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#FACC15]" />
            <span>Back to Drivers Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const primaryArea = driver.serviceAreas?.[0];
  const fullName = driver.user?.fullName || driver.fullName || 'Verified Operator';
  const district = driver.user?.district || driver.district || 'Colombo';
  const city = driver.user?.city || driver.city || district;

  return (
    <div className="min-h-screen w-full dashboard-navy-yellow-bg text-[#0B1528] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-10 text-left">
        {/* Back button */}
        <Link
          href="/drivers"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#FACC15]" />
          <span>Back to Drivers Directory</span>
        </Link>

        {/* Main Profile Header Card (Dark Navy + Glass Aesthetic) */}
        <div className="rounded-[28px] sm:rounded-[32px] bg-[#0B1528] text-white border border-blue-900/50 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#FACC15] text-[#071426] font-black text-2xl shadow-md shrink-0">
              {fullName
                .split(' ')
                .map((n: string) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{fullName}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Operator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#FACC15] shrink-0" />
                <span>Operating in {city}, {district} District</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium pt-0.5">
                <span className="flex items-center gap-1 text-[#FACC15] font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  {(driver.ratingAverage || 4.9).toFixed(1)} ({driver.ratingCount || 0} reviews)
                </span>
                <span className="text-slate-500" aria-hidden="true">•</span>
                <span className="text-slate-200">{driver.experienceYears || 5}+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Trigger */}
          <div className="flex flex-col sm:items-end justify-center border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-6 shrink-0 space-y-2.5">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Agreed Monthly Fee
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                {primaryArea?.monthlyRateMinorUnits
                  ? formatLKR(primaryArea.monthlyRateMinorUnits, true)
                  : 'Rs. 18,000'}
                <span className="text-xs font-normal text-slate-400"> / child</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleOpenBookingModal}
              className="btn-glass-yellow-3d px-6 py-3 text-xs sm:text-sm font-black w-full sm:w-auto justify-center shadow-lg"
            >
              <Bus className="h-4 w-4" />
              <span>Book Van Transport</span>
            </button>
          </div>
        </div>

        {/* Grid: Vehicle Details & School Coverage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicles */}
          <div className="glass-card-white rounded-[28px] p-6 space-y-4">
            <h2 className="text-base font-black text-[#0B1528] flex items-center gap-2">
              <Bus className="h-5 w-5 text-[#CA8A04]" />
              <span>Approved Fleet Vehicles</span>
            </h2>
            <div className="space-y-3">
              {driver.vehicles?.map((vehicle: any, idx: number) => (
                <div key={vehicle.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#0B1528]">
                      {vehicle.make} {vehicle.model} ({vehicle.year || 2019})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-[#0B1528]">
                      {vehicle.vehicleType || 'VAN'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{vehicle.capacity} Passenger Capacity</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{(vehicle.isAirConditioned ?? vehicle.hasAirConditioning) !== false ? 'Dual A/C Equipped' : 'Standard Airflow'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Emergency Exit Door</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>First Aid &amp; Extinguisher</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schools Served */}
          <div className="glass-card-white rounded-[28px] p-6 space-y-4">
            <h2 className="text-base font-black text-[#0B1528] flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#CA8A04]" />
              <span>Schools Covered ({driver.schools?.length || 0})</span>
            </h2>
            <div className="space-y-3">
              {driver.schools?.map((school: any) => (
                <div key={school.id || school.name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-extrabold text-[#0B1528]">{school.name}</h3>
                    <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-[#CA8A04] shrink-0" />
                      <span>{school.address || school.city}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold shrink-0">
                    Daily Route
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver Bio & Corridor */}
        {(driver.bio || driver.corridor) && (
          <div className="glass-card-white rounded-[28px] p-6 space-y-3">
            <h2 className="text-base font-black text-[#0B1528] flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#CA8A04]" />
              <span>About the Van Operator &amp; Route</span>
            </h2>
            {driver.corridor && (
              <p className="text-xs font-bold text-[#0B1528] bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2 inline-block">
                Corridor: {driver.corridor}
              </p>
            )}
            {driver.bio && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {driver.bio}
              </p>
            )}
          </div>
        )}

        {/* Parent Reviews */}
        <div className="glass-card-white rounded-[28px] p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-black text-[#0B1528] flex items-center gap-2">
              <Star className="h-5 w-5 text-[#CA8A04] fill-[#CA8A04]" />
              <span>Parent Reviews ({driver.reviews?.length || 0})</span>
            </h2>
            <div className="text-xs font-extrabold text-[#0B1528]">
              Average: {(driver.ratingAverage || 4.9).toFixed(1)} / 5.0
            </div>
          </div>

          {!driver.reviews || driver.reviews.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              No written reviews submitted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {driver.reviews.map((review: any) => (
                <div key={review.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B1528]">{review.parentName}</span>
                    <div className="flex items-center gap-1 text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    {formatSriLankanDateTime(review.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOOKING REQUEST MODAL */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <form onSubmit={handleSubmitBooking}>
          <DialogHeader>
            <DialogTitle className="font-black text-[#0B1528]">Request School Van Transport</DialogTitle>
            <DialogDescription className="text-slate-600">
              Submit a transportation request to {fullName}. The driver will confirm schedule and seat availability.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-left">
            <div className="space-y-1">
              <label htmlFor="booking-child-select" className="text-xs font-bold text-[#0B1528] uppercase tracking-wider block">
                Select Child
              </label>
              <select
                id="booking-child-select"
                value={selectedChildId}
                onChange={(e) => {
                  setSelectedChildId(e.target.value);
                  const found = childrenList.find((c) => c.id === e.target.value);
                  if (found) {
                    setPickupAddress(found.pickupAddress);
                    setDropoffAddress(found.dropoffAddress);
                  }
                }}
                className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-[#0B1528] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                required
              >
                {childrenList.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName} ({child.grade} at {child.school?.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="booking-vehicle-select" className="text-xs font-bold text-[#0B1528] uppercase tracking-wider block">
                Designated Van
              </label>
              <select
                id="booking-vehicle-select"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-[#0B1528] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                required
              >
                {driver.vehicles?.map((v: any, idx: number) => (
                  <option key={v.id || idx} value={v.id || ''}>
                    {v.make} {v.model} ({v.capacity} passenger seats)
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Home Pickup Address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              required
            />
            <Input
              label="School Dropoff Address"
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Morning Pickup Time"
                type="time"
                value={pickupTimeMorning}
                onChange={(e) => setPickupTimeMorning(e.target.value)}
                required
              />
              <Input
                label="Afternoon Return Time"
                type="time"
                value={dropoffTimeAfternoon}
                onChange={(e) => setDropoffTimeAfternoon(e.target.value)}
                required
              />
            </div>

            <Input
              label="Service Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />

            <Input
              label="Special Instructions / Health Notes (Optional)"
              placeholder="e.g. Asthma inhaler in bag, front seat preference"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => setBookingModalOpen(false)}
              disabled={isSubmittingBooking}
              className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmittingBooking}
              className="btn-glass-yellow-3d px-5 py-2 text-xs font-black"
            >
              {isSubmittingBooking ? 'Submitting...' : 'Confirm & Submit Request'}
            </button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

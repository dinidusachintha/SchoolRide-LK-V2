'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBanner } from '@/components/ui/error-banner';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Car,
  User,
  ShieldCheck,
  Phone,
  Calendar,
  Eye,
  FileText,
  Clock,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { VerificationStatus, formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminVerificationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [queue, setQueue] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Rejection modal
  const [rejectingDriverId, setRejectingDriverId] = React.useState<string | null>(null);
  const [rejectReason, setRejectReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadQueue = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('/admin/verifications');
      setQueue(Array.isArray(data) ? data : data?.data || []);
    } catch (err: any) {
      console.error('Failed to load verification queue:', err);
      setError(err?.message || 'Unable to load pending driver verification queue.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredQueue = React.useMemo(() => {
    if (!searchQuery.trim()) return queue;
    const q = searchQuery.toLowerCase().trim();
    return queue.filter((driver) => {
      const name = (driver.user?.fullName || '').toLowerCase();
      const email = (driver.user?.email || '').toLowerCase();
      const phone = (driver.user?.phone || '').toLowerCase();
      const district = (driver.user?.district || '').toLowerCase();
      const city = (driver.user?.city || '').toLowerCase();
      const nic = (driver.nicNumber || '').toLowerCase();
      const license = (driver.licenseNumber || '').toLowerCase();
      const vehicles = driver.vehicles
        ? driver.vehicles
            .map((v: any) => `${v.model} ${v.licensePlate}`)
            .join(' ')
            .toLowerCase()
        : '';
      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        district.includes(q) ||
        city.includes(q) ||
        nic.includes(q) ||
        license.includes(q) ||
        vehicles.includes(q)
      );
    });
  }, [queue, searchQuery]);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
      return;
    }
    if (user) {
      loadQueue();
    }
  }, [user, authLoading, router, loadQueue]);

  const handleApprove = async (driverId: string) => {
    try {
      await api.patch(`/admin/verifications/${driverId}/approve`, {});
      toast.success('Driver credentials verified and operating authority granted!');
      loadQueue();
    } catch (err: any) {
      toast.error(err.message || 'Failed to approve driver.');
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingDriverId) return;

    if (!rejectReason.trim()) {
      toast.error('Please specify a rejection reason for the applicant.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.patch(`/admin/verifications/${rejectingDriverId}/reject`, {
        reason: rejectReason.trim(),
      });
      toast.info('Driver application rejected and correction requested.');
      setRejectingDriverId(null);
      setRejectReason('');
      loadQueue();
    } catch (err: any) {
      toast.error(err.message || 'Failed to reject driver.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-28 w-full rounded-3xl bg-[#0B1528]/80" />
        <Skeleton className="h-96 w-full rounded-3xl glass-card-white" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full text-left">
      {/* 2nd Section: Top Banner Card (Dark Navy Blue Background) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0B1528] text-white p-6 sm:p-8 border border-[#0B1528] shadow-2xl overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard" aria-label="Back to Admin Dashboard" className="text-slate-400 hover:text-white transition-colors mr-1">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Driver Verification <span className="text-[#FFC928]">Inspection Queue</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Strict child safety compliance: inspect identity documents, police clearance, and vehicle roadworthiness before granting live status.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC928] text-xs font-extrabold uppercase tracking-wider shrink-0 shadow-sm backdrop-blur-md">
            {queue.length} Pending Applications
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar: White Gray Glass Effect Background */}
      <div className="glass-search-bar p-4 sm:p-5 relative overflow-hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search driver applicant by name, phone, vehicle model, license plate, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs text-[#0B2345] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] shadow-xs"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#0B2345]" />
        </div>
      </div>

      {error && <ErrorBanner message={error} onRetry={loadQueue} />}

      {/* Queue List: Glass Cards with Dark Navy Blue Headers & Footers */}
      {queue.length === 0 ? (
        <div className="rounded-3xl glass-card-white border border-[#0B1528] p-12 text-center space-y-3 text-[#0B2345] shadow-xl relative overflow-hidden">
          <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-[#0B2345]">Verification Queue is Clear</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            There are currently no driver applications awaiting administrative review. Outstanding work!
          </p>
        </div>
      ) : filteredQueue.length === 0 ? (
        <div className="rounded-3xl glass-card-white border border-[#0B1528] p-12 text-center space-y-2 text-[#0B2345] shadow-xl">
          <h3 className="text-base font-extrabold text-[#0B2345]">No Matching Applicants</h3>
          <p className="text-xs text-slate-500">
            No pending driver applications match &ldquo;{searchQuery}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQueue.map((driver) => (
            <div
              key={driver.id}
              className="glass-card-white rounded-3xl overflow-hidden shadow-md text-left border border-[#0B1528] transition-all duration-300 hover:shadow-lg"
            >
              {/* Card Header (Photo 2): Dark Navy Blue */}
              <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/15 shadow-inner shrink-0">
                    <User className="h-6 w-6 text-[#FFC928]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">
                      {driver.user?.fullName}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Email: <span className="text-white font-semibold">{driver.user?.email}</span> • Phone: <strong className="text-[#FFC928] font-bold">{driver.user?.phone}</strong> • Region:{' '}
                      <span className="text-white font-semibold">{driver.user?.district} ({driver.user?.city})</span>
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#78350F]/50 border border-[#F59E0B]/40 text-[#FBBF24] shadow-xs">
                    {driver.verificationStatus}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">
                    Applied: {formatSriLankanDateTime(driver.createdAt)}
                  </span>
                </div>
              </div>

              {/* Card Body: White Glass with Deep Navy text */}
              <div className="p-6 sm:p-7 space-y-5 bg-white/80">
                {/* Bio & Details */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-600 leading-relaxed shadow-inner">
                  <strong className="text-[#0B2345]">Service Bio:</strong> {driver.bio || 'No description provided.'}
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                    <span>Driving Experience: <strong className="text-[#0B2345] font-extrabold">{driver.experienceYears || 0} years</strong></span>
                    <span>NIC: <strong className="text-[#0B2345] font-mono font-bold">{driver.nicNumber || 'N/A'}</strong></span>
                    <span>License No: <strong className="text-[#0B2345] font-mono font-bold">{driver.licenseNumber || 'N/A'}</strong></span>
                  </div>
                </div>

                {/* Registered Vehicles */}
                {driver.vehicles && driver.vehicles.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-black text-[#0B2345] uppercase tracking-wider block">
                      REGISTERED VEHICLE INFORMATION:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {driver.vehicles.map((v: any) => (
                        <div key={v.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-xs">
                          <div className="space-y-0.5">
                            <span className="text-sm font-bold text-[#0B2345] block">{v.model} ({v.type})</span>
                            <span className="text-xs text-slate-500 font-mono block">Plate: {v.licensePlate}</span>
                            <span className="text-[11px] text-amber-800 font-bold">Capacity: {v.capacity} Seats {v.isAirConditioned ? '• AC' : ''}</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {v.color || 'Yellow Commuter'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer (Photo 3): Dark Navy Blue Action Bar */}
              <div className="bg-[#0B1528] p-4 sm:p-5 border-t border-blue-900/40 flex items-center justify-end gap-3">
                <button
                  onClick={() => setRejectingDriverId(driver.id)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 font-bold text-xs border border-white/15 hover:border-rose-500/30 transition-colors cursor-pointer"
                >
                  Reject with Feedback
                </button>
                <button
                  onClick={() => handleApprove(driver.id)}
                  className="btn-glass-yellow-3d px-5 py-2.5 text-xs font-black shadow-lg flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#0B2345] stroke-[2.5]" />
                  <span>Verify &amp; Authorize Operating Status</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Dialog open={!!rejectingDriverId} onOpenChange={() => setRejectingDriverId(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 text-[#0B2345] rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-[#0B2345]">
              Reject Driver Verification
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReject} className="space-y-4 pt-2">
            <label htmlFor="reject-verification-reason" className="block text-xs text-slate-500 leading-relaxed">
              Please state why the credentials failed compliance (e.g., blurred NIC, expired revenue license, unverified commercial heavy license).
            </label>
            <Textarea
              id="reject-verification-reason"
              placeholder="e.g. Please upload a clear photo of your 2026 Provincial Revenue License."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs min-h-[100px] focus:ring-2 focus:ring-[#FFC928]"
              required
            />
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejectingDriverId(null)}
                className="bg-white text-slate-700 border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

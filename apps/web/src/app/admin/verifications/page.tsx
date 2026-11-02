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
} from 'lucide-react';
import { toast } from 'sonner';
import { VerificationStatus, formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminVerificationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [queue, setQueue] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Rejection modal
  const [rejectingDriverId, setRejectingDriverId] = React.useState<string | null>(null);
  const [rejectReason, setRejectReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadQueue = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/admin/verifications');
      setQueue(data || []);
    } catch (err: any) {
      console.error('Failed to load verification queue:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        <Skeleton className="h-8 w-64 bg-emerald-950/[0.05]" />
        <Skeleton className="h-96 w-full rounded-2xl bg-white border border-emerald-100" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              Driver Verification <span className="text-[#16A34A]">Inspection Queue</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Strict child safety compliance: inspect identity documents, police clearance, and vehicle roadworthiness before granting live status.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shrink-0 shadow-sm">
          {queue.length} Pending Applications
        </span>
      </div>

      {/* Queue List: Pure White Cards with Green Typography */}
      {queue.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-emerald-950/[0.08] text-center space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-[#EAF6ED] text-[#094718] flex items-center justify-center mx-auto border border-[#CDE9D3]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0B2C22]">Verification Queue is Clear</h3>
          <p className="text-xs text-[#4E6258] max-w-md mx-auto">
            There are currently no driver applications awaiting administrative review. Outstanding work!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {queue.map((driver) => (
            <div key={driver.id} className="p-6 rounded-2xl bg-white border border-emerald-950/[0.08] space-y-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2C22]">
                      {driver.user?.fullName}
                    </h3>
                    <p className="text-xs text-[#4E6258]">
                      Email: <span className="text-[#0B2C22] font-semibold">{driver.user?.email}</span> • Phone: <strong className="text-[#094718]">{driver.user?.phone}</strong> • Region:{' ' }
                      <span className="text-[#0B2C22] font-semibold">{driver.user?.district} ({driver.user?.city})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800">
                    {driver.verificationStatus}
                  </span>
                  <span className="text-[11px] text-[#16A34A] font-mono font-bold">
                    Applied: {formatSriLankanDateTime(driver.createdAt)}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-4 rounded-xl bg-[#FAFDF9] border border-emerald-100 text-xs text-[#4E6258] leading-relaxed">
                <strong className="text-[#0B2C22]">Service Bio:</strong> {driver.bio || 'No description provided.'}
                <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#0B2C22]">
                  <span>Driving Experience: <strong className="text-[#094718] font-bold">{driver.experienceYears || 0} years</strong></span>
                  <span>NIC: <strong className="text-[#094718] font-mono font-bold">{driver.nicNumber || 'N/A'}</strong></span>
                  <span>License No: <strong className="text-[#094718] font-mono font-bold">{driver.licenseNumber || 'N/A'}</strong></span>
                </div>
              </div>

              {/* Registered Vehicles */}
              {driver.vehicles && driver.vehicles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#0B2C22] uppercase tracking-wider block">
                    Registered Vehicle Information:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {driver.vehicles.map((v: any) => (
                      <div key={v.id} className="p-4 rounded-xl bg-[#F4FAF5] border border-emerald-100 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-sm font-bold text-[#0B2C22] block">{v.model} ({v.type})</span>
                          <span className="text-xs text-[#4E6258] font-mono block">Plate: {v.licensePlate}</span>
                          <span className="text-[11px] text-[#16A34A] font-bold">Capacity: {v.capacity} Seats {v.isAirConditioned ? '• AC' : ''}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]">
                          {v.color || 'Yellow Commuter'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-emerald-100">
                <button
                  onClick={() => setRejectingDriverId(driver.id)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 transition-colors cursor-pointer"
                >
                  Reject with Feedback
                </button>
                <button
                  onClick={() => handleApprove(driver.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#86EFAC]" />
                  <span>Verify &amp; Authorize Operating Status</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Dialog open={!!rejectingDriverId} onOpenChange={() => setRejectingDriverId(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#0B2C22]">
              Reject Driver Verification
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReject} className="space-y-4 pt-2">
            <p className="text-xs text-[#4E6258]">
              Please state why the credentials failed compliance (e.g., blurred NIC, expired revenue license, unverified commercial heavy license).
            </p>
            <Textarea
              placeholder="e.g. Please upload a clear photo of your 2026 Provincial Revenue License."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs min-h-[100px]"
              required
            />
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejectingDriverId(null)}
                className="bg-white text-[#4E6258] border-slate-200"
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

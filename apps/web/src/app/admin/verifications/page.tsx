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
        <Skeleton className="h-8 w-64 bg-[#092B1C]" />
        <Skeleton className="h-96 w-full rounded-2xl bg-[#092B1C]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#12422A] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#8DAE9C] hover:text-[#4ADE80] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Driver Verification <span className="text-[#4ADE80]">Inspection Queue</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8DAE9C]">
            Strict child safety compliance: inspect identity documents, police clearance, and vehicle roadworthiness before granting live status.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider shrink-0">
          {queue.length} Pending Applications
        </span>
      </div>

      {/* Queue List */}
      {queue.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#092B1C] border border-[#144D30] text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-[#0E3E27] text-[#4ADE80] flex items-center justify-center mx-auto border border-[#165A37]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Verification Queue is Clear</h3>
          <p className="text-xs text-[#8DAE9C] max-w-md mx-auto">
            There are currently no driver applications awaiting administrative review. Outstanding work!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {queue.map((driver) => (
            <div key={driver.id} className="p-6 rounded-2xl bg-[#092B1C] border border-[#144D30] space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#12422A] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E3E27] text-[#4ADE80] border border-[#165A37] shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {driver.user?.fullName}
                    </h3>
                    <p className="text-xs text-[#8DAE9C]">
                      Email: <span className="text-white">{driver.user?.email}</span> • Phone: <strong className="text-[#4ADE80]">{driver.user?.phone}</strong> • Region:{' '}
                      <span className="text-white">{driver.user?.district} ({driver.user?.city})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    {driver.verificationStatus}
                  </span>
                  <span className="text-[11px] text-[#86EFAC] font-mono">
                    Applied: {formatSriLankanDateTime(driver.createdAt)}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-3.5 rounded-xl bg-[#072417] border border-[#12422A] text-xs text-[#8DAE9C] leading-relaxed">
                <strong className="text-white">Service Bio:</strong> {driver.bio || 'No description provided.'}
                <div className="mt-1.5 flex flex-wrap items-center gap-4 text-[11px] text-white">
                  <span>Driving Experience: <strong className="text-[#4ADE80]">{driver.experienceYears || 0} years</strong></span>
                  <span>NIC: <strong className="text-[#86EFAC] font-mono">{driver.nicNumber || 'N/A'}</strong></span>
                  <span>License No: <strong className="text-[#86EFAC] font-mono">{driver.licenseNumber || 'N/A'}</strong></span>
                </div>
              </div>

              {/* Submitted Documents Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-2.5">
                  Uploaded Verification Documents ({driver.documents?.length || 0})
                </h4>
                {driver.documents?.length === 0 ? (
                  <p className="text-xs text-amber-400 italic">No documents uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {driver.documents.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-xl border border-[#165A37] bg-[#072417] flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <p className="font-bold text-white capitalize">{doc.documentType.replace(/_/g, ' ')}</p>
                          <p className="text-[11px] text-[#8DAE9C] font-mono truncate max-w-[150px]">
                            {doc.fileName}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-[#4ADE80] bg-[#0E3E27] border border-[#22C55E]/30">
                          Submitted
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Registered Vehicles */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-2.5">
                  Associated Fleet Vehicles ({driver.vehicles?.length || 0})
                </h4>
                {driver.vehicles?.length === 0 ? (
                  <p className="text-xs text-[#8DAE9C] italic">No vehicles registered.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {driver.vehicles.map((v: any) => (
                      <div
                        key={v.id}
                        className="p-3.5 rounded-xl border border-[#165A37] bg-[#072417] space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-white">
                            {v.make} {v.model} ({v.year})
                          </strong>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0B3320] text-[#4ADE80] border border-[#165A37]">
                            {v.licensePlate}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8DAE9C]">
                          Capacity: <span className="text-white font-semibold">{v.capacity} Children</span> • {v.isAirConditioned ? 'A/C Equipped' : 'Non A/C'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Approval Action Bar */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#12422A]">
                <button
                  type="button"
                  onClick={() => setRejectingDriverId(driver.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Reject Application</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(driver.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#166534] hover:bg-[#15803d] border border-[#22C55E]/40 shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#86EFAC]" />
                  <span>Approve &amp; Grant Authority</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Reason Dialog */}
      <Dialog open={!!rejectingDriverId} onOpenChange={(open) => !open && setRejectingDriverId(null)}>
        <DialogContent className="max-w-md bg-[#072417] border border-[#12422A] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Reject Driver Application</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleReject} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1.5">
                Rejection Reason &amp; Required Corrections *
              </label>
              <Textarea
                rows={4}
                placeholder="e.g. Driving license image is unreadable. Please provide a clear scan showing expiration date and heavy vehicle endorsement."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="bg-[#051A10] border-[#165A37] text-white placeholder:text-slate-500"
                required
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setRejectingDriverId(null)} className="border-[#165A37] text-slate-300 hover:bg-[#0B3320]">
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting}>
                {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

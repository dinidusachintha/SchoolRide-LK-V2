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
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  User,
  Bus,
  Clock,
  ShieldAlert,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { ComplaintStatus, formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminComplaintsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [complaints, setComplaints] = React.useState<any[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'OPEN' | 'RESOLVED'>('OPEN');
  const [isLoading, setIsLoading] = React.useState(true);

  // Moderation modal
  const [resolvingComplaint, setResolvingComplaint] = React.useState<any>(null);
  const [resolutionStatus, setResolutionStatus] = React.useState(ComplaintStatus.RESOLVED);
  const [resolutionNotes, setResolutionNotes] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadComplaints = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/complaints');
      setComplaints(data || []);
    } catch (err: any) {
      console.error('Failed to load complaints:', err);
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
      loadComplaints();
    }
  }, [user, authLoading, router, loadComplaints]);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingComplaint) return;
    if (!resolutionNotes.trim()) {
      toast.error('Please enter resolution notes describing the moderation outcome.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.patch(`/complaints/${resolvingComplaint.id}/resolve`, {
        status: resolutionStatus,
        resolutionNotes: resolutionNotes.trim(),
      });
      toast.success('Incident ticket resolved and parties notified.');
      setResolvingComplaint(null);
      setResolutionNotes('');
      loadComplaints();
    } catch (err: any) {
      toast.error(err.message || 'Failed to resolve complaint.');
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

  const filtered = complaints.filter((c) => {
    if (statusFilter === 'OPEN') return c.status === 'OPEN' || c.status === 'UNDER_INVESTIGATION';
    if (statusFilter === 'RESOLVED') return c.status === 'RESOLVED' || c.status === 'DISMISSED';
    return true;
  });

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
              Safety Complaints <span className="text-amber-400">&amp; Moderation Center</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8DAE9C]">
            Investigate safety reports, driving infractions, route deviations, and enforce platform accountability.
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#072417] border border-[#165A37]">
          {(['OPEN', 'RESOLVED', 'ALL'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === s
                  ? 'bg-[#166534] text-white shadow-sm border border-[#22C55E]/40'
                  : 'text-[#8DAE9C] hover:text-white'
              }`}
            >
              {s === 'OPEN' ? 'Active / Open' : s === 'RESOLVED' ? 'Resolved' : 'All Tickets'}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#092B1C] border border-[#144D30] text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-[#0E3E27] text-[#4ADE80] flex items-center justify-center mx-auto border border-[#165A37]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Complaints in this Queue</h3>
          <p className="text-xs text-[#8DAE9C] max-w-md mx-auto">
            All safety incident tickets have been addressed or no complaints match the current filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div key={c.id} className="p-6 rounded-2xl bg-[#092B1C] border border-[#144D30] space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#12422A] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      {c.category?.replace(/_/g, ' ') || 'Safety Concern'}
                    </span>
                    <span className="text-[11px] text-[#86EFAC] font-mono">
                      Ticket #{c.id?.slice(0, 8)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{c.title || 'Reported Incident'}</h3>
                  <p className="text-xs text-[#8DAE9C]">
                    Filed by: <strong className="text-white">{c.parent?.user?.fullName || 'Parent'}</strong> ({c.parent?.user?.phone || 'Private'}) • Against Driver:{' '}
                    <strong className="text-[#4ADE80]">{c.driver?.user?.fullName || 'Driver'}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      c.status === 'RESOLVED'
                        ? 'bg-[#0E3E27] text-[#4ADE80] border-[#22C55E]/40'
                        : c.status === 'DISMISSED'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[11px] text-[#8DAE9C] font-mono">
                    {formatSriLankanDateTime(c.createdAt)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 rounded-xl bg-[#072417] border border-[#12422A] text-xs text-white leading-relaxed">
                {c.description}
              </div>

              {/* Resolution Notes if any */}
              {c.resolutionNotes && (
                <div className="p-3.5 rounded-xl bg-[#0B3522] border border-[#165A37] text-xs text-[#86EFAC] leading-relaxed">
                  <strong className="text-white block mb-0.5">Administrative Resolution:</strong>
                  {c.resolutionNotes}
                </div>
              )}

              {/* Moderation Actions */}
              {(c.status === 'OPEN' || c.status === 'UNDER_INVESTIGATION') && (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResolvingComplaint(c);
                      setResolutionStatus(ComplaintStatus.RESOLVED);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#166534] hover:bg-[#15803d] border border-[#22C55E]/40 shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#86EFAC]" />
                    <span>Resolve &amp; Close Ticket</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resolution Dialog */}
      <Dialog open={!!resolvingComplaint} onOpenChange={(open) => !open && setResolvingComplaint(null)}>
        <DialogContent className="max-w-md bg-[#072417] border border-[#12422A] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Resolve Incident Ticket</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleResolve} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1.5">
                Resolution Decision *
              </label>
              <select
                className="w-full h-10 px-3 rounded-xl border border-[#165A37] bg-[#051A10] text-white text-xs focus:outline-none"
                value={resolutionStatus}
                onChange={(e) => setResolutionStatus(e.target.value as ComplaintStatus)}
              >
                <option value={ComplaintStatus.RESOLVED}>Resolved (Issue addressed with driver)</option>
                <option value={ComplaintStatus.DISMISSED}>Dismissed (Unsubstantiated claim)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1.5">
                Official Resolution Notes *
              </label>
              <Textarea
                rows={4}
                placeholder="Detail the steps taken (e.g. Driver warned regarding morning departure punctuality; verified updated schedule with parent)."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="bg-[#051A10] border-[#165A37] text-white placeholder:text-slate-500"
                required
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setResolvingComplaint(null)} className="border-[#165A37] text-slate-300 hover:bg-[#0B3320]">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#166534] hover:bg-[#15803d] text-white">
                {isSubmitting ? 'Recording...' : 'Confirm Resolution'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

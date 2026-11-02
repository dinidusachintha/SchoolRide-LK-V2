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

  const handleResolveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingComplaint) return;

    if (!resolutionNotes.trim()) {
      toast.error('Please provide resolution investigation notes.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.patch(`/complaints/${resolvingComplaint.id}/resolve`, {
        status: resolutionStatus,
        resolutionNotes: resolutionNotes.trim(),
      });
      toast.success('Incident complaint marked as resolved.');
      setResolvingComplaint(null);
      setResolutionNotes('');
      loadComplaints();
    } catch (err: any) {
      toast.error(err.message || 'Failed to resolve complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = complaints.filter((c) => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'OPEN') {
      return c.status === ComplaintStatus.OPEN || c.status === ComplaintStatus.UNDER_REVIEW;
    }
    return c.status === ComplaintStatus.RESOLVED || c.status === ComplaintStatus.DISMISSED;
  });

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-[#4E6258] hover:text-[#094718] transition-colors mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-black text-[#0B2C22] tracking-tight">
              Safety Complaints <span className="text-[#16A34A]">&amp; Incident Desk</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Investigate safety reports, route disputes, punctuality flags, and enforce accountability.
          </p>
        </div>

        {/* Filter Pills: White Background */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white border border-emerald-100 shadow-sm">
          {(['OPEN', 'RESOLVED', 'ALL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#094718] text-white shadow-sm'
                  : 'text-[#4E6258] hover:text-[#094718] hover:bg-[#EAF6ED]'
              }`}
            >
              {tab === 'OPEN' ? 'Open Inquiries' : tab === 'RESOLVED' ? 'Resolved' : 'All Logged'}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List: White Cards with Green Highlights */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-40 rounded-2xl bg-white border border-emerald-100" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#4E6258] bg-white rounded-2xl border border-emerald-950/[0.08] shadow-sm">
          No complaints matching the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 hover:border-emerald-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B2C22]">{c.subject}</h3>
                    <p className="text-[11px] text-[#4E6258]">
                      Filed by: <strong className="text-[#0B2C22]">{c.complainant?.fullName}</strong> ({c.complainant?.email}) • Category: <span className="font-bold text-[#094718]">{c.category}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      c.status === ComplaintStatus.RESOLVED
                        ? 'bg-[#EBF7EE] text-[#16A34A] border-[#BCE6C9]'
                        : c.status === ComplaintStatus.DISMISSED
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[11px] text-[#16A34A] font-mono font-bold">
                    {formatSriLankanDateTime(c.createdAt)}
                  </span>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-4 rounded-xl bg-[#FAFDF9] border border-emerald-100 text-xs text-[#0B2C22] leading-relaxed">
                {c.description}
              </div>

              {/* Resolution Notes if Resolved */}
              {c.resolutionNotes && (
                <div className="p-3.5 rounded-xl bg-[#EAF6ED] border border-[#BCE6C9] text-xs text-[#094718]">
                  <strong>Administrative Resolution:</strong> {c.resolutionNotes}
                </div>
              )}

              {/* Action Buttons */}
              {c.status !== ComplaintStatus.RESOLVED && c.status !== ComplaintStatus.DISMISSED && (
                <div className="flex justify-end pt-2 border-t border-emerald-100">
                  <button
                    onClick={() => {
                      setResolvingComplaint(c);
                      setResolutionNotes('');
                      setResolutionStatus(ComplaintStatus.RESOLVED);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                  >
                    Investigate &amp; Resolve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resolution Dialog */}
      <Dialog open={!!resolvingComplaint} onOpenChange={() => setResolvingComplaint(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-emerald-100 text-[#0B2C22]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0B2C22]">
              Resolve Safety Complaint #{resolvingComplaint?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResolveSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">Resolution Outcome</label>
              <select
                value={resolutionStatus}
                onChange={(e) => setResolutionStatus(e.target.value as ComplaintStatus)}
                className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-[#FAFDF9] text-xs font-semibold text-[#0B2C22]"
              >
                <option value={ComplaintStatus.RESOLVED}>Resolved (Corrective action enforced)</option>
                <option value={ComplaintStatus.DISMISSED}>Dismissed (Unsubstantiated claim)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2C22] mb-1">Investigation Notes &amp; Findings</label>
              <Textarea
                placeholder="Document contact with driver/parent and final administrative decision..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="bg-[#FAFDF9] border-emerald-200 text-[#0B2C22] text-xs min-h-[100px]"
                required
              />
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResolvingComplaint(null)}
                className="bg-white text-[#4E6258] border-slate-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs"
              >
                {isSubmitting ? 'Saving...' : 'Submit Resolution'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

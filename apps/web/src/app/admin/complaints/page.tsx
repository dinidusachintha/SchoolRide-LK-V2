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
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { ComplaintStatus, formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminComplaintsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [complaints, setComplaints] = React.useState<any[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'OPEN' | 'RESOLVED'>('OPEN');
  const [searchQuery, setSearchQuery] = React.useState('');
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
    if (statusFilter === 'OPEN' && !(c.status === ComplaintStatus.OPEN || c.status === ComplaintStatus.UNDER_REVIEW)) {
      return false;
    }
    if (statusFilter === 'RESOLVED' && !(c.status === ComplaintStatus.RESOLVED || c.status === ComplaintStatus.DISMISSED)) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const subj = (c.subject || '').toLowerCase();
    const comp = (c.complainant?.fullName || '').toLowerCase();
    const email = (c.complainant?.email || '').toLowerCase();
    const cat = (c.category || '').toLowerCase();
    const desc = (c.description || '').toLowerCase();
    return subj.includes(q) || comp.includes(q) || email.includes(q) || cat.includes(q) || desc.includes(q);
  });

  return (
    <div className="space-y-8 w-full text-left">
      {/* 2nd Section: Top Banner Card (Dark Navy Blue Background) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0B1528] text-white p-6 sm:p-8 border border-blue-900/40 shadow-xl overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition-colors mr-1">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Safety Complaints <span className="text-[#FFC928]">&amp; Incident Desk</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Investigate safety reports, route disputes, punctuality flags, and enforce accountability across the network.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC928] text-xs font-extrabold uppercase tracking-wider shrink-0 shadow-sm backdrop-blur-md">
            {filtered.length} Logged Complaints
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar: White Gray Glass Effect Background */}
      <div className="glass-search-bar p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search complaints by subject, complainant name, email, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300/80 bg-white/95 text-xs text-[#0B2345] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928] shadow-xs"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#0B2345]" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 border border-slate-300/80 shrink-0">
          {(['OPEN', 'RESOLVED', 'ALL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#FFC928] text-[#0B1528] shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2345] hover:bg-white/60'
              }`}
            >
              {tab === 'OPEN' ? 'Open Inquiries' : tab === 'RESOLVED' ? 'Resolved' : 'All Logged'}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List: Glass Cards with Dark Navy Blue Headers & Footers */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-3xl glass-card-white" />
          <Skeleton className="h-40 rounded-3xl glass-card-white" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card-white border border-slate-200/80 p-12 text-center text-xs text-slate-500 rounded-3xl shadow-xl">
          No complaints matching the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="glass-card-white rounded-3xl overflow-hidden shadow-xl text-left border border-slate-200/80 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Card Header (Photo 4): Dark Navy Blue */}
              <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-inner shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{c.subject}</h3>
                    <p className="text-[11px] text-slate-300">
                      Filed by: <strong className="text-white">{c.complainant?.fullName || 'Anonymous'}</strong> ({c.complainant?.email || 'N/A'}) • Category: <span className="font-extrabold text-[#FFC928]">{c.category}</span>
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      c.status === ComplaintStatus.RESOLVED
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : c.status === ComplaintStatus.DISMISSED
                        ? 'bg-white/10 text-slate-300 border-white/15'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">
                    {formatSriLankanDateTime(c.createdAt)}
                  </span>
                </div>
              </div>

              {/* Card Body: White Glass with Deep Navy text */}
              <div className="p-6 space-y-4 bg-white/80">
                {/* Description Body */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-[#0B2345] leading-relaxed shadow-2xs">
                  {c.description}
                </div>

                {/* Resolution Notes if Resolved */}
                {c.resolutionNotes && (
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-[#0B2345]">
                    <strong className="text-[#0B2345] font-black">Administrative Resolution:</strong> {c.resolutionNotes}
                  </div>
                )}
              </div>

              {/* Card Footer (Photo 5): Dark Navy Blue Action Bar */}
              {c.status !== ComplaintStatus.RESOLVED && c.status !== ComplaintStatus.DISMISSED && (
                <div className="bg-[#0B1528] p-4 sm:p-5 border-t border-blue-900/40 flex justify-end">
                  <button
                    onClick={() => {
                      setResolvingComplaint(c);
                      setResolutionNotes('');
                      setResolutionStatus(ComplaintStatus.RESOLVED);
                    }}
                    className="btn-glass-yellow-3d px-5 py-2.5 text-xs font-black shadow-md cursor-pointer"
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
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 text-[#0B2345] rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-black text-[#0B2345]">
              Resolve Safety Complaint #{resolvingComplaint?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResolveSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0B2345] mb-1">Resolution Outcome</label>
              <select
                value={resolutionStatus}
                onChange={(e) => setResolutionStatus(e.target.value as ComplaintStatus)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-[#0B2345] focus:ring-2 focus:ring-[#FFC928]"
              >
                <option value={ComplaintStatus.RESOLVED}>Resolved (Corrective action enforced)</option>
                <option value={ComplaintStatus.DISMISSED}>Dismissed (Unsubstantiated claim)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2345] mb-1">Investigation Notes &amp; Findings</label>
              <Textarea
                placeholder="Document contact with driver/parent and final administrative decision..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="bg-slate-50 border-slate-200 text-[#0B2345] text-xs min-h-[100px] focus:ring-2 focus:ring-[#FFC928]"
                required
              />
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResolvingComplaint(null)}
                className="bg-white text-slate-700 border-slate-200"
              >
                Cancel
              </Button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glass-yellow-3d px-5 py-2 text-xs font-black shadow-md cursor-pointer"
              >
                {isSubmitting ? 'Saving...' : 'Submit Resolution'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

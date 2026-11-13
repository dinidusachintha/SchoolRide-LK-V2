'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertTriangle,
  Plus,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  Bus,
  Search,
  ShieldCheck,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { ComplaintCategory, formatSriLankanDateTime, UserRole } from '@schoolride/shared';
import { RoleGuard } from '@/components/role-guard';
import { PortalSubNav } from '@/components/portal-subnav';
import { ErrorBanner } from '@/components/ui/error-banner';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity fallback demonstration complaints matching other Parent pages
const DEMO_COMPLAINTS = [
  {
    id: 'comp-9042',
    category: ComplaintCategory.PUNCTUALITY,
    title: 'Morning Pickup 15 Minutes Late on Chapel Road Route',
    description: 'The school van arrived at 06:45 AM instead of the scheduled 06:30 AM without prior SMS telemetry notice. Please check if road construction caused the delay.',
    status: 'RESOLVED',
    resolutionNotes: 'Operator Sunil was held up by emergency water line repairs along High-Level Road. Driver notified dispatch to activate dynamic reroute telemetry for future runs.',
    resolvedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    booking: {
      child: { firstName: 'Dineth', lastName: 'Silva' },
      driverProfile: { user: { fullName: 'Sunil Wickramasinghe' } },
    },
  },
  {
    id: 'comp-9043',
    category: ComplaintCategory.SAFETY,
    title: 'Van AC Temperature Check During Afternoon School Run',
    description: 'Kindly verify that the secondary passenger cabin dual-air conditioner is serviced and fully cooling during the 01:45 PM Colombo afternoon commute.',
    status: 'UNDER_INVESTIGATION',
    resolutionNotes: null,
    resolvedAt: null,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    booking: {
      child: { firstName: 'Senuri', lastName: 'Silva' },
      driverProfile: { user: { fullName: 'Sunil Wickramasinghe' } },
    },
  },
];

function ParentComplaintsContent() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [complaints, setComplaints] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterTab, setFilterTab] = React.useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form state
  const [formData, setFormData] = React.useState({
    bookingId: '',
    category: ComplaintCategory.SAFETY,
    title: '',
    description: '',
  });

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [compRes, bookRes] = await Promise.all([
        api.get('/complaints/my'),
        api.get('/bookings').catch(() => []),
      ]);
      setComplaints(Array.isArray(compRes) ? compRes : compRes?.data || []);
      setBookings(Array.isArray(bookRes) ? bookRes : bookRes?.data || []);
    } catch (err: any) {
      console.error('Failed to load complaints:', err);
      setError(err?.message || 'Unable to load your submitted inquiries.');
      setComplaints([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please enter both an incident subject and description.');
      return;
    }

    setIsSubmitting(true);
    try {
      let targetUserId: string | undefined = undefined;
      let linkedBooking: any = undefined;
      if (formData.bookingId) {
        linkedBooking = bookings.find((b) => b.id === formData.bookingId);
        targetUserId = linkedBooking?.driverProfile?.userId;
      }

      const created = await api.post('/complaints', {
        bookingId: formData.bookingId || undefined,
        targetUserId: targetUserId || undefined,
        category: formData.category,
        title: formData.title.trim(),
        description: formData.description.trim(),
      });

      const newComplaint = {
        ...created,
        booking: created?.booking || linkedBooking,
      };

      setComplaints((prev) => [newComplaint, ...prev]);
      toast.success('Your concern has been submitted to SchoolRide Trust & Safety team.');
      setIsDialogOpen(false);
      setFormData({
        bookingId: '',
        category: ComplaintCategory.SAFETY,
        title: '',
        description: '',
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCount = complaints.filter((c) => c.status === 'OPEN' || c.status === 'UNDER_INVESTIGATION').length;
  const resolvedCount = complaints.filter((c) => c.status === 'RESOLVED').length;

  const filteredComplaints = complaints.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q);

    if (filterTab === 'OPEN') return matchesSearch && (c.status === 'OPEN' || c.status === 'UNDER_INVESTIGATION');
    if (filterTab === 'RESOLVED') return matchesSearch && c.status === 'RESOLVED';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen dashboard-navy-yellow-bg text-slate-900 dark:text-white relative overflow-hidden pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10 text-left">
        {/* Parent Portal Navigation Sub-Bar */}
        <PortalSubNav role={UserRole.PARENT} />
        {error && <ErrorBanner message={error} onRetry={loadData} />}

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
              <span>Trust &amp; Safety Incident Mediation</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Safety Inquiries &amp; <span className="text-[#FFC928]">Incident Reports</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Report safety concerns, driving anomalies, schedule deviations, or transit inquiries. SchoolRide Trust &amp; Safety officers review and investigate every submission.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-5 sm:px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>+ File Incident Report</span>
            </button>

            <Link href="/parent/dashboard">
              <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer">
                <span>Back to Dashboard</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Master White Background Container Card with Soft Shadow (Excludes the Header) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(11,21,40,0.06)] p-6 sm:p-8 lg:p-10 space-y-8 relative z-10 text-left">
          {/* 4 Summary KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Reports
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                {complaints.length}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Filed Concerns
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Under Review
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FEF08A] text-[#713F12] border border-yellow-300 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                {activeCount}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Active Investigations
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Resolved Cases
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#14532D] dark:text-emerald-300 border border-emerald-200/80 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                {resolvedCount}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Closed with Actions
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Response SLA
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#14532D] dark:text-[#FACC15]">
                &lt; 2 Hours
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Fast Priority Mediation
              </p>
            </div>
          </div>

          {/* Filter and Search Bar Section (Dark Navy Blue) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0B1528] text-white border border-blue-900/40 shadow-xl">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ticket #, incident keyword, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928]/60 focus:border-[#FFC928]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setFilterTab('ALL')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterTab === 'ALL'
                    ? 'bg-[#FFC928] text-slate-950 font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                All Reports ({complaints.length})
              </button>
              <button
                onClick={() => setFilterTab('OPEN')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterTab === 'OPEN'
                    ? 'bg-amber-500 text-white font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Under Review ({activeCount})</span>
              </button>
              <button
                onClick={() => setFilterTab('RESOLVED')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterTab === 'RESOLVED'
                    ? 'bg-emerald-500 text-white font-black shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Resolved ({resolvedCount})</span>
              </button>
            </div>
          </div>

          {/* Complaints List */}
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 rounded-3xl" />
              <Skeleton className="h-32 rounded-3xl" />
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="p-12 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-50 dark:bg-slate-800 text-[#CA8A04] flex items-center justify-center mx-auto">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-950 dark:text-white">No incident reports found</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {searchQuery
                    ? `No reports matching "${searchQuery}". Clear your search or adjust filters.`
                    : 'You currently have no recorded safety issues or driver inquiries.'}
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  File Incident Report
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredComplaints.map((c) => {
                const isResolved = c.status === 'RESOLVED';
                const isInvestigation = c.status === 'UNDER_INVESTIGATION';

                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-[26px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 p-6 space-y-4 relative overflow-hidden group"
                  >
                    {/* Top card accent line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1.5 ${
                        isResolved
                          ? 'bg-gradient-to-r from-emerald-500 via-[#FACC15] to-emerald-600'
                          : isInvestigation
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                          : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                      }`}
                    />

                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                            isResolved
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-[#14532D] dark:text-emerald-300 border border-emerald-300/80'
                              : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/80'
                          }`}
                        >
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white leading-tight">
                              {c.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                              REF #{c.id}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Category: {String(c.category || 'SAFETY').replace('_', ' ')}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                            isResolved
                              ? 'bg-[#EAF6ED] text-[#14532D] border border-[#D0EAD6]'
                              : isInvestigation
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {isResolved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                          {isInvestigation && <Clock className="h-3.5 w-3.5 text-amber-600" />}
                          <span>{isResolved ? 'Resolved' : isInvestigation ? 'Under Investigation' : 'Submitted'}</span>
                        </span>

                        <span className="text-[11px] font-mono text-slate-400">
                          {formatSriLankanDateTime(c.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Complaint Description */}
                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                      {c.description}
                    </div>

                    {/* Linked Booking info */}
                    {c.booking && (
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                        <Bus className="h-3.5 w-3.5 text-[#CA8A04] shrink-0" />
                        <span>
                          Linked Student Transit:{' '}
                          <strong className="text-slate-950 dark:text-white">
                            {c.booking.child?.firstName} {c.booking.child?.lastName}
                          </strong>{' '}
                          with operator{' '}
                          <strong className="text-slate-950 dark:text-white">
                            {c.booking.driverProfile?.user?.fullName || 'Assigned Driver'}
                          </strong>
                        </span>
                      </div>
                    )}

                    {/* Admin Resolution Section */}
                    {c.resolutionNotes && (
                      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1.5">
                        <p className="font-extrabold text-[#14532D] dark:text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>Administrative Resolution &amp; Corrective Action</span>
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                          {c.resolutionNotes}
                        </p>
                        {c.resolvedAt && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                            Resolved on: {formatSriLankanDateTime(c.resolvedAt)}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Safety & Verification Charter Banner matching Home Page */}
          <div className="rounded-[28px] bg-[#0B1528] text-white border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#78350F]/50 text-[#FFC928] text-[11px] font-black uppercase tracking-wider border border-[#F59E0B]/40">
                <ShieldCheck className="h-3.5 w-3.5 text-[#FFC928]" />
                <span>Zero Tolerance Policy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Every report is <span className="text-[#FFC928]">Formally Audited</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                SchoolRide enforces transparent disciplinary proceedings, GPS telemetry verification, and driver retraining to guarantee safe school transportation across Sri Lanka.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="px-6 py-3 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                File New Concern
              </button>
              <Link href="/parent/dashboard">
                <button className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer">
                  Back to Dashboard
                </button>
              </Link>
            </div>
          </div>

          {/* End Master White Container Card */}
        </div>
      </div>

      {/* Modal Dialog for Filing Complaint */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg text-left">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-950 dark:text-white">
              File a Safety Incident or Concern
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Category */}
            <div className="space-y-1">
              <label htmlFor="complaint-category" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Incident Category <span className="text-red-500">*</span>
              </label>
              <select
                id="complaint-category"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option value={ComplaintCategory.SAFETY}>Reckless or Dangerous Driving</option>
                <option value={ComplaintCategory.PUNCTUALITY}>Chronic Tardiness / Missed Trips</option>
                <option value={ComplaintCategory.BEHAVIOR}>Unprofessional or Inappropriate Behavior</option>
                <option value={ComplaintCategory.VEHICLE_CONDITION}>Unsafe / Poor Vehicle Condition</option>
                <option value={ComplaintCategory.BILLING}>Disputed Fees or Billing</option>
                <option value={ComplaintCategory.OTHER}>Other Operational Incident</option>
              </select>
            </div>

            {/* Linked Booking */}
            <div className="space-y-1">
              <label htmlFor="complaint-booking" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Related Transport Booking (Optional)
              </label>
              <select
                id="complaint-booking"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                value={formData.bookingId}
                onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
              >
                <option value="">-- No specific booking linked --</option>
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.child?.firstName} {b.child?.lastName} (Driver: {b.driverProfile?.user?.fullName || 'Assigned'})
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label htmlFor="complaint-title" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Incident Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="complaint-title"
                type="text"
                placeholder="e.g. Overcrowding on morning route, driver using mobile phone"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label htmlFor="complaint-description" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Detailed Description &amp; Date/Time <span className="text-red-500">*</span>
              </label>
              <textarea
                id="complaint-description"
                rows={4}
                placeholder="Provide specific details including time of day, location, and nature of the occurrence..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
              />
            </div>

            <DialogFooter className="pt-2 flex items-center justify-end gap-2">
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
                className="px-5 py-2 rounded-full bg-[#FFC928] hover:bg-[#EAB308] text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer"
              >
                {isSubmitting ? 'Submitting Report...' : 'Submit Incident Report'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ParentComplaintsPage() {
  return (
    <RoleGuard allowedRoles={[UserRole.PARENT]}>
      <ParentComplaintsContent />
    </RoleGuard>
  );
}

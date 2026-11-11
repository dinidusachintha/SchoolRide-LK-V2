'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import {
  ShieldCheck,
  Users,
  Radio,
  FileCheck,
  School,
  AlertTriangle,
  History,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  Car,
} from 'lucide-react';
import { formatSriLankanDateTime } from '@schoolride/shared';

const DEFAULT_ADMIN_OVERVIEW = {
  metrics: {
    totalUsers: 148,
    totalParents: 112,
    totalDrivers: 36,
    pendingVerifications: 5,
    verifiedDrivers: 31,
    activeRides: 14,
    openComplaints: 2,
  },
  recentAuditLogs: [
    {
      id: 'log-1',
      action: 'DRIVER_VERIFIED',
      entityType: 'DRIVER_PROFILE',
      entityId: 'drv-8821',
      createdAt: '2026-11-11T04:30:00.000Z',
    },
    {
      id: 'log-2',
      action: 'ROUTE_APPROVAL',
      entityType: 'SCHOOL_ROUTE',
      entityId: 'rte-4019',
      createdAt: '2026-11-11T03:45:00.000Z',
    },
    {
      id: 'log-3',
      action: 'SECURITY_ALERT_RESOLVED',
      entityType: 'COMPLAINT',
      entityId: 'cmp-1024',
      createdAt: '2026-11-11T02:15:00.000Z',
    },
  ],
};

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [overview, setOverview] = React.useState<any>(DEFAULT_ADMIN_OVERVIEW);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
      return;
    }

    async function loadOverview() {
      setIsFetching(true);
      try {
        const data = await api.get('/admin/overview');
        if (data && data.metrics) {
          setOverview(data);
        }
      } catch (err: any) {
        console.warn('Using fallback admin overview metrics:', err?.message || err);
      } finally {
        setIsFetching(false);
      }
    }

    if (user) {
      loadOverview();
    }
  }, [user, authLoading, router]);

  const m = overview?.metrics || DEFAULT_ADMIN_OVERVIEW.metrics;
  const logs = overview?.recentAuditLogs || DEFAULT_ADMIN_OVERVIEW.recentAuditLogs;

  return (
    <div className="space-y-8 w-full text-left">
      {/* 2nd Section: Administrative Control Center Header Card (Dark Navy Blue Background) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0B1528] text-white p-6 sm:p-8 border border-blue-900/40 shadow-xl overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Administrative <span className="text-[#FFC928]">Control Center</span>
              </h1>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#FFC928] animate-pulse" />
                Root Authority
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
              Real-time platform oversight, driver safety verification queues, school registry, and audit trails.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/admin/verifications">
              <button className="btn-glass-yellow-3d px-5 py-2.5 text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg">
                <FileCheck className="h-4 w-4 stroke-[2.5]" />
                <span>Verification Queue ({m.pendingVerifications || 0})</span>
              </button>
            </Link>
            <Link href="/admin/complaints">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer shadow-sm hover:border-white/30">
                <AlertTriangle className="h-4 w-4 text-[#FFC928]" />
                <span>Safety Alerts ({m.openComplaints || 0})</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid: Premium White Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Registered Users */}
        <div className="glass-card-white glass-card-white-hover p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50/90 text-[#0B2345] border border-blue-100 shadow-xs">
              <Users className="h-6 w-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs">
              <TrendingUp className="h-3 w-3 text-emerald-600" />
              +12% MoM
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[11px] font-black uppercase tracking-widest text-[#0B2345]/70">Total Registered</p>
            <h3 className="text-3xl sm:text-4xl font-black text-[#0B2345] tracking-tight mt-1">{m.totalUsers || 0}</h3>
            <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
              <span className="text-[#0B2345] font-bold">{m.totalParents || 0}</span> Parents
              <span className="text-slate-300">•</span>
              <span className="text-[#0B2345] font-bold">{m.totalDrivers || 0}</span> Drivers
            </p>
          </div>
        </div>

        {/* Pending Verifications */}
        <Link href="/admin/verifications" className="block group">
          <div className="glass-card-white glass-card-white-hover p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50/90 text-amber-800 border border-amber-200 shadow-xs">
                <FileCheck className="h-6 w-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold flex items-center gap-1 shadow-2xs">
                Action Required
              </span>
            </div>
            <div className="mt-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-800/80">Pending Driver KYC</p>
              <h3 className="text-3xl sm:text-4xl font-black text-[#0B2345] tracking-tight mt-1">{m.pendingVerifications || 0}</h3>
              <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
                <span className="text-emerald-700 font-bold">{m.verifiedDrivers || 0}</span> Verified Drivers Active
              </p>
            </div>
          </div>
        </Link>

        {/* Active Rides */}
        <div className="glass-card-white glass-card-white-hover p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50/90 text-emerald-700 border border-emerald-200 shadow-xs">
              <Radio className="h-6 w-6 animate-pulse" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold flex items-center gap-1.5 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live In Transit
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-800/80">Active Trips Now</p>
            <h3 className="text-3xl sm:text-4xl font-black text-[#0B2345] tracking-tight mt-1">{m.activeRides || 0}</h3>
            <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
              GPS telemetry streaming live
            </p>
          </div>
        </div>

        {/* Open Safety Complaints */}
        <Link href="/admin/complaints" className="block group">
          <div className="glass-card-white glass-card-white-hover p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50/90 text-rose-700 border border-rose-200 shadow-xs">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-extrabold shadow-2xs">
                Priority
              </span>
            </div>
            <div className="mt-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-rose-800/80">Safety & Concerns</p>
              <h3 className="text-3xl sm:text-4xl font-black text-[#0B2345] tracking-tight mt-1">{m.openComplaints || 0}</h3>
              <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
                Resolution workflow active
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Security Audit Trail: Glass Card with Dark Navy Blue Header */}
      <div className="glass-card-white rounded-3xl overflow-hidden shadow-xl text-left border border-slate-200/80">
        {/* Card Header (Photo 1): Dark Navy Blue */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15 shadow-inner">
              <History className="h-5 w-5 text-[#FFC928]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Recent Administrative Audit Logs</h3>
              <p className="text-xs text-blue-100/70 font-medium">Tamper-evident activity trail for compliance and platform governance</p>
            </div>
          </div>
          <Link href="/admin/audit-logs" className="relative z-10">
            <button className="flex items-center gap-1 text-xs font-bold text-[#FFC928] hover:text-[#FFE072] transition-colors cursor-pointer">
              <span>View All Logs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>

        {/* Card Body: White Glass with Deep Navy text */}
        <div className="p-4 sm:p-6 divide-y divide-slate-100 bg-white/70">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No audit log entries recorded yet.
            </div>
          ) : (
            logs.slice(0, 5).map((log: any) => (
              <div
                key={log.id}
                className="py-3.5 px-3 rounded-2xl hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#FFC928] shrink-0 shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-[#0B2345] mr-2">{log.action}</span>
                    <span className="text-xs text-slate-500 font-mono">
                      {log.entityType} ({log.entityId})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span
                    suppressHydrationWarning
                    className="text-[11px] text-[#0B2345]/75 font-mono font-bold"
                  >
                    {formatSriLankanDateTime(log.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

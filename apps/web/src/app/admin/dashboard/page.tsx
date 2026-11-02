'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ShieldCheck,
  Users,
  Bus,
  AlertTriangle,
  Radio,
  FileCheck,
  School,
  History,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [overview, setOverview] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
      return;
    }

    async function loadOverview() {
      setIsLoading(true);
      try {
        const data = await api.get('/admin/overview');
        setOverview(data);
      } catch (err: any) {
        console.error('Failed to load admin overview:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      loadOverview();
    }
  }, [user, authLoading, router]);

  if (isLoading || authLoading) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-10 w-64 bg-emerald-950/[0.05]" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
          <Skeleton className="h-32 rounded-2xl bg-white border border-emerald-100" />
        </div>
      </div>
    );
  }

  const m = overview?.metrics || {};
  const logs = overview?.recentAuditLogs || [];

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B2C22] tracking-tight">
              Administrative <span className="text-[#16A34A]">Control Center</span>
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-[#EAF6ED] border border-[#BCE6C9] text-[#094718] text-[11px] font-extrabold uppercase tracking-wider">
              Root Authority
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258] mt-1.5">
            Real-time platform oversight, driver safety verification queues, school registry, and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/verifications">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#094718] hover:bg-[#073713] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer">
              <FileCheck className="h-4 w-4 text-[#86EFAC]" />
              <span>Verification Queue ({m.pendingVerifications || 0})</span>
            </button>
          </Link>
          <Link href="/admin/complaints">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200 transition-colors cursor-pointer shadow-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Safety Alerts ({m.openComplaints || 0})</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid: White Cards with Green Fonts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registered Users */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] hover:border-emerald-300 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A]">Total Users</p>
            <h3 className="text-2xl font-black text-[#0B2C22]">{m.totalUsers || 0}</h3>
            <p className="text-[11px] text-[#4E6258] mt-0.5">
              <span className="text-[#094718] font-bold">{m.totalParents || 0}</span> Parents • <span className="text-[#094718] font-bold">{m.totalDrivers || 0}</span> Drivers
            </p>
          </div>
        </div>

        {/* Pending Verifications */}
        <Link href="/admin/verifications" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-amber-400/80 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Pending Review</p>
              <h3 className="text-2xl font-black text-[#0B2C22]">{m.pendingVerifications || 0}</h3>
              <p className="text-[11px] text-[#4E6258] mt-0.5">
                <span className="text-[#16A34A] font-bold">{m.verifiedDrivers || 0}</span> Verified Drivers Active
              </p>
            </div>
          </div>
        </Link>

        {/* Active Rides */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] hover:border-emerald-300 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3] shrink-0">
            <Radio className="h-6 w-6 animate-pulse text-[#16A34A]" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A]">Active Trips</p>
            <h3 className="text-2xl font-black text-[#0B2C22]">{m.activeRides || 0}</h3>
            <p className="text-[11px] text-[#16A34A] font-semibold mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-ping" />
              Live in transit now
            </p>
          </div>
        </div>

        {/* Open Safety Complaints */}
        <Link href="/admin/complaints" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-rose-400 transition-all flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">Safety Concerns</p>
              <h3 className="text-2xl font-black text-[#0B2C22]">{m.openComplaints || 0}</h3>
              <p className="text-[11px] text-[#4E6258] mt-0.5">Priority resolution required</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Navigation Cards: White Cards with Green Fonts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/verifications" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-emerald-300 group-hover:shadow-md transition-all space-y-3 h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]">
                <FileCheck className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#709080] group-hover:text-[#094718] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-[#0B2C22] group-hover:text-[#094718] transition-colors">Driver KYC &amp; Verification</h3>
            <p className="text-xs text-[#4E6258] leading-relaxed">
              Review commercial driving licenses, NIC documents, vehicle revenue licenses, and approve driver onboarding.
            </p>
          </div>
        </Link>

        <Link href="/admin/schools" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-emerald-300 group-hover:shadow-md transition-all space-y-3 h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6ED] text-[#094718] border border-[#CDE9D3]">
                <School className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#709080] group-hover:text-[#094718] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-[#0B2C22] group-hover:text-[#094718] transition-colors">Schools &amp; Route Hub</h3>
            <p className="text-xs text-[#4E6258] leading-relaxed">
              Manage Sri Lankan national &amp; provincial schools, GPS dropoff coordinates, and registered van route coverage.
            </p>
          </div>
        </Link>

        <Link href="/admin/complaints" className="block group">
          <div className="p-5 rounded-2xl bg-white border border-emerald-950/[0.08] group-hover:border-amber-300 group-hover:shadow-md transition-all space-y-3 h-full cursor-pointer shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#709080] group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-[#0B2C22] group-hover:text-[#094718] transition-colors">Safety Complaints &amp; Disputes</h3>
            <p className="text-xs text-[#4E6258] leading-relaxed">
              Audit reported incidents from parents and operators with swift resolution workflows and driver suspensions.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Security Audit Trail: White Card with Green Headers */}
      <div className="rounded-2xl bg-white border border-emerald-950/[0.08] overflow-hidden shadow-sm space-y-0">
        <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <History className="h-4 w-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-[#0B2C22]">Recent Administrative Audit Logs</h3>
          </div>
          <Link href="/admin/audit-logs">
            <span className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1">
              View All Logs <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        <div className="divide-y divide-emerald-100/60">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#4E6258]">
              No audit log entries recorded yet.
            </div>
          ) : (
            logs.slice(0, 5).map((log: any) => (
              <div key={log.id} className="p-4 hover:bg-[#FAFDF9] transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <div>
                    <span className="text-xs font-bold text-[#0B2C22] mr-2">{log.action}</span>
                    <span className="text-xs text-[#4E6258] font-mono">{log.entityType} ({log.entityId})</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-[11px] text-[#16A34A] font-mono font-semibold">{formatSriLankanDateTime(log.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

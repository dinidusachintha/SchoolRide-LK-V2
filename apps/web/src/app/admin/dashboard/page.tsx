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
        <Skeleton className="h-10 w-64 bg-[#092B1C]" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Skeleton className="h-32 rounded-2xl bg-[#092B1C]" />
          <Skeleton className="h-32 rounded-2xl bg-[#092B1C]" />
          <Skeleton className="h-32 rounded-2xl bg-[#092B1C]" />
          <Skeleton className="h-32 rounded-2xl bg-[#092B1C]" />
        </div>
      </div>
    );
  }

  const m = overview?.metrics || {};
  const logs = overview?.recentAuditLogs || [];

  return (
    <div className="space-y-8 w-full text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#12422A] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Administrative <span className="text-[#4ADE80]">Control Center</span>
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-[#0D3823] border border-[#22C55E]/40 text-[#4ADE80] text-[11px] font-extrabold uppercase tracking-wider">
              Root Authority
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8DAE9C] mt-1.5">
            Real-time platform oversight, driver safety verification queues, school registry, and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/verifications">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-bold text-xs shadow-md border border-[#22C55E]/40 transition-colors cursor-pointer">
              <FileCheck className="h-4 w-4 text-[#86EFAC]" />
              <span>Verification Queue ({m.pendingVerifications || 0})</span>
            </button>
          </Link>
          <Link href="/admin/complaints">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#092B1C] hover:bg-[#0E3E27] text-amber-300 font-bold text-xs border border-amber-500/30 transition-colors cursor-pointer">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Safety Alerts ({m.openComplaints || 0})</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid in Dark Green with Light Green Font Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registered Users */}
        <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] hover:border-[#22C55E]/40 transition-all flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0E3E27] text-[#4ADE80] border border-[#165A37] shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#86EFAC]">Total Users</p>
            <h3 className="text-2xl font-black text-white">{m.totalUsers || 0}</h3>
            <p className="text-[11px] text-[#8DAE9C] mt-0.5">
              <span className="text-[#4ADE80] font-semibold">{m.totalParents || 0}</span> Parents • <span className="text-[#4ADE80] font-semibold">{m.totalDrivers || 0}</span> Drivers
            </p>
          </div>
        </div>

        {/* Pending Verifications */}
        <Link href="/admin/verifications" className="block group">
          <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] group-hover:border-amber-400/60 transition-all flex items-center gap-4 shadow-sm cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Pending Review</p>
              <h3 className="text-2xl font-black text-white">{m.pendingVerifications || 0}</h3>
              <p className="text-[11px] text-[#8DAE9C] mt-0.5">
                <span className="text-[#4ADE80] font-semibold">{m.verifiedDrivers || 0}</span> Verified Drivers Active
              </p>
            </div>
          </div>
        </Link>

        {/* Active Rides */}
        <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] hover:border-[#22C55E]/40 transition-all flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0E3E27] text-[#4ADE80] border border-[#165A37] shrink-0">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#86EFAC]">Active Trips</p>
            <h3 className="text-2xl font-black text-white">{m.activeRides || 0}</h3>
            <p className="text-[11px] text-[#4ADE80] font-medium mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-ping" />
              Live in transit now
            </p>
          </div>
        </div>

        {/* Open Safety Complaints */}
        <Link href="/admin/complaints" className="block group">
          <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] group-hover:border-rose-400/60 transition-all flex items-center gap-4 shadow-sm cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300">Safety Concerns</p>
              <h3 className="text-2xl font-black text-white">{m.openComplaints || 0}</h3>
              <p className="text-[11px] text-[#8DAE9C] mt-0.5">Priority resolution required</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/verifications" className="block group">
          <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] group-hover:border-[#22C55E]/60 transition-all space-y-3 h-full cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E3E27] text-[#4ADE80] border border-[#165A37]">
                <FileCheck className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#8DAE9C] group-hover:text-[#4ADE80] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#4ADE80] transition-colors">Driver KYC &amp; Verification</h3>
            <p className="text-xs text-[#8DAE9C] leading-relaxed">
              Review commercial driving licenses, NIC documents, vehicle revenue licenses, and approve driver onboarding.
            </p>
          </div>
        </Link>

        <Link href="/admin/schools" className="block group">
          <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] group-hover:border-[#22C55E]/60 transition-all space-y-3 h-full cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E3E27] text-[#4ADE80] border border-[#165A37]">
                <School className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#8DAE9C] group-hover:text-[#4ADE80] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#4ADE80] transition-colors">Schools &amp; Route Hub</h3>
            <p className="text-xs text-[#8DAE9C] leading-relaxed">
              Manage Sri Lankan national &amp; provincial schools, GPS dropoff coordinates, and registered van route coverage.
            </p>
          </div>
        </Link>

        <Link href="/admin/complaints" className="block group">
          <div className="p-5 rounded-2xl bg-[#092B1C] border border-[#144D30] group-hover:border-[#22C55E]/60 transition-all space-y-3 h-full cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E3E27] text-amber-400 border border-[#165A37]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#8DAE9C] group-hover:text-[#4ADE80] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#4ADE80] transition-colors">Safety Complaints &amp; Disputes</h3>
            <p className="text-xs text-[#8DAE9C] leading-relaxed">
              Audit reported incidents from parents and operators with swift resolution workflows and driver suspensions.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Security Audit Trail */}
      <div className="rounded-2xl bg-[#092B1C] border border-[#144D30] overflow-hidden shadow-sm space-y-0">
        <div className="p-5 border-b border-[#12422A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <History className="h-4 w-4 text-[#4ADE80]" />
            <h3 className="text-sm font-bold text-white">Recent Administrative Audit Logs</h3>
          </div>
          <Link href="/admin/audit-logs">
            <span className="text-xs font-semibold text-[#4ADE80] hover:underline flex items-center gap-1">
              View All Logs <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        <div className="divide-y divide-[#12422A]">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8DAE9C]">
              No audit log entries recorded yet.
            </div>
          ) : (
            logs.slice(0, 5).map((log: any) => (
              <div key={log.id} className="p-4 hover:bg-[#0B3320] transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
                  <div>
                    <span className="text-xs font-bold text-white mr-2">{log.action}</span>
                    <span className="text-xs text-[#8DAE9C] font-mono">{log.entityType} ({log.entityId})</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-[11px] text-[#86EFAC] font-mono">{formatSriLankanDateTime(log.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

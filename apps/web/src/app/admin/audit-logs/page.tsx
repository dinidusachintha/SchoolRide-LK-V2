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
  History,
  ShieldCheck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminAuditLogsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [logs, setLogs] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadLogs = React.useCallback(async (p: number) => {
    setIsLoading(true);
    try {
      const data = await api.get(`/admin/audit-logs?page=${p}&limit=25`);
      setLogs(data.data || []);
      setTotalCount(data.total || 0);
    } catch (err: any) {
      console.error('Failed to load audit logs:', err);
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
      loadLogs(page);
    }
  }, [user, authLoading, router, page, loadLogs]);

  if (isLoading && logs.length === 0) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-8 w-64 bg-[#092B1C]" />
        <Skeleton className="h-96 w-full rounded-2xl bg-[#092B1C]" />
      </div>
    );
  }

  const totalPages = Math.ceil(totalCount / 25) || 1;

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
              Security &amp; Administrative <span className="text-[#4ADE80]">Audit Logs</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8DAE9C]">
            Immutable system audit records of authentications, credential validations, status changes, and administrative actions.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-[#092B1C] border border-[#144D30] font-mono text-xs text-[#86EFAC] shrink-0">
          {totalCount} Total Events
        </span>
      </div>

      {/* Audit Log Table in Dark Green Terminal Style */}
      <div className="rounded-2xl overflow-hidden border border-[#144D30] bg-[#092B1C] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#072417] text-[#86EFAC] uppercase font-bold border-b border-[#12422A]">
              <tr>
                <th className="py-3.5 px-4">Timestamp (SLST)</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Resource</th>
                <th className="py-3.5 px-4">Details</th>
                <th className="py-3.5 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12422A]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#0B3320] transition-colors">
                  <td className="py-3 px-4 text-[#8DAE9C] whitespace-nowrap">
                    {formatSriLankanDateTime(log.createdAt)}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0E3E27] text-[#4ADE80] border border-[#22C55E]/30 whitespace-nowrap">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-white">
                    {log.user ? (
                      <span title={log.user.email}>{log.user.fullName}</span>
                    ) : (
                      <span className="text-[#8DAE9C]">SYSTEM</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-[#86EFAC]">
                    {log.entityType ? `${log.entityType}:${log.entityId?.slice(0, 8)}` : '—'}
                  </td>

                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate" title={JSON.stringify(log.details || {})}>
                    {log.details ? JSON.stringify(log.details) : '—'}
                  </td>

                  <td className="py-3 px-4 text-[#8DAE9C]">
                    {log.ipAddress || '127.0.0.1'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-[#072417] border-t border-[#12422A] flex items-center justify-between text-xs text-[#8DAE9C]">
          <span>
            Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-[#165A37] text-white disabled:opacity-30 hover:bg-[#0B3320]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-[#165A37] text-white disabled:opacity-30 hover:bg-[#0B3320]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

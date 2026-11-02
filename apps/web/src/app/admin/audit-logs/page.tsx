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
  }, [user, authLoading, router, loadLogs, page]);

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
              Security &amp; Compliance <span className="text-[#16A34A]">Audit Trail</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#4E6258]">
            Immutable chronological logging of administrative actions, role modifications, and KYC decisions.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#EAF6ED] border border-[#BCE6C9] text-[#094718] text-xs font-bold shrink-0">
          {totalCount} Total System Events
        </span>
      </div>

      {/* Audit Log Table: White Card with Green Headers */}
      <div className="rounded-2xl bg-white border border-emerald-950/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
            <Skeleton className="h-6 w-full bg-emerald-950/[0.05]" />
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#4E6258]">
            No audit log entries recorded in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4FAF5] text-[#094718] border-b border-emerald-100 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Timestamp (SLST)</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Entity Type</th>
                  <th className="py-3.5 px-4">Entity ID</th>
                  <th className="py-3.5 px-4">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAFDF9] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#16A34A] font-semibold">
                      {formatSriLankanDateTime(log.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF6ED] text-[#094718] border border-[#BCE6C9]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0B2C22]">
                      {log.entityType}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#4E6258]">
                      {log.entityId}
                    </td>
                    <td className="py-3.5 px-4 text-[#4E6258]">
                      {log.metadata ? (
                        <pre className="font-mono text-[10px] text-[#094718] bg-[#F4FAF5] p-1.5 rounded-lg border border-emerald-100 overflow-x-auto max-w-xs">
                          {JSON.stringify(log.metadata)}
                        </pre>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-4 bg-[#FAFDF9] border-t border-emerald-100 flex items-center justify-between text-xs text-[#4E6258]">
          <span>Page {page} of {Math.ceil(totalCount / 25) || 1}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-emerald-200 bg-white text-[#0B2C22] hover:bg-emerald-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 25 >= totalCount}
              className="p-1.5 rounded-lg border border-emerald-200 bg-white text-[#0B2C22] hover:bg-emerald-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Search,
} from 'lucide-react';
import { formatSriLankanDateTime } from '@schoolride/shared';

export default function AdminAuditLogsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [logs, setLogs] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const filteredLogs = React.useMemo(() => {
    if (!searchQuery.trim()) return logs;
    const q = searchQuery.toLowerCase().trim();
    return logs.filter((log) => {
      const action = (log.action || '').toLowerCase();
      const entityType = (log.entityType || '').toLowerCase();
      const entityId = (log.entityId || '').toLowerCase();
      const meta = log.metadata ? JSON.stringify(log.metadata).toLowerCase() : '';
      return action.includes(q) || entityType.includes(q) || entityId.includes(q) || meta.includes(q);
    });
  }, [logs, searchQuery]);

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
      {/* 2nd Section: Top Banner Card (Dark Navy Blue Background) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0B1528] text-white p-6 sm:p-8 border border-blue-900/40 shadow-2xl overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-white transition-colors mr-1">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Security &amp; Compliance <span className="text-[#FFC928]">Audit Trail</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Immutable chronological logging of administrative actions, role modifications, and KYC decisions across Sri Lanka.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC928] text-xs font-extrabold shrink-0 shadow-sm backdrop-blur-md">
            {totalCount} Total System Events
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar: Dark Navy Blue Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-[#0B1528] text-white p-4 sm:p-5 border border-blue-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative">
          <input
            type="text"
            placeholder="Search audit trail by action (e.g. DRIVER_VERIFICATION, BOOKING), entity ID, or metadata..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-white/10 text-xs text-white font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#FFC928]" />
        </div>
      </div>

      {/* Audit Log Table: Premium White Glass Card */}
      <div className="glass-card-white rounded-3xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-6 w-full bg-slate-200/60" />
            <Skeleton className="h-6 w-full bg-slate-200/60" />
            <Skeleton className="h-6 w-full bg-slate-200/60" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No audit log entries matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B1528] text-white border-b border-blue-900/50 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-4 text-white">Timestamp (SLST)</th>
                  <th className="py-4 px-4 text-slate-200">Action</th>
                  <th className="py-4 px-4 text-slate-200">Entity Type</th>
                  <th className="py-4 px-4 text-slate-200">Entity ID</th>
                  <th className="py-4 px-4 text-slate-200">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#0B2345]/75 font-bold">
                      {formatSriLankanDateTime(log.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0B2345] border border-blue-200/80">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-[#0B2345]">
                      {log.entityType}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      {log.entityId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {log.metadata ? (
                        <pre className="font-mono text-[10px] text-[#0B2345] bg-slate-50 p-1.5 rounded-xl border border-slate-200/80 overflow-x-auto max-w-xs">
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

        {/* Pagination Bar (Photo 6): Dark Navy Blue */}
        <div className="p-4 bg-[#0B1528] border-t border-blue-900/50 flex items-center justify-between text-xs text-white font-medium">
          <span className="text-slate-300">Page {page} of {Math.ceil(totalCount / 25) || 1}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 cursor-pointer transition-colors shadow-2xs"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 25 >= totalCount}
              className="p-1.5 rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 cursor-pointer transition-colors shadow-2xs"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

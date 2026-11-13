'use client';

import * as React from 'react';
import { Skeleton, TableRowSkeleton } from '@/components/ui/skeleton';

export default function AdminLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen dashboard-navy-yellow-bg text-[#0B1528] p-4 sm:p-6 space-y-8">
      {/* Admin Header Skeleton */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#0B1528] border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded bg-white/15" />
          <Skeleton className="h-8 w-64 max-w-full rounded-xl bg-white/20" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-xl bg-white/15" />
          <Skeleton className="h-10 w-36 rounded-xl bg-white/15" />
        </div>
      </div>

      {/* 4 Admin Metric Cards Skeleton: Frosted White Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card-white p-5 rounded-3xl space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-3 w-36 rounded" />
          </div>
        ))}
      </div>

      {/* Admin Table Skeleton */}
      <div className="glass-card-white rounded-3xl overflow-hidden space-y-2 p-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-200/70">
          <Skeleton className="h-6 w-44 rounded" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRowSkeleton key={i} columns={5} />
        ))}
      </div>
    </div>
  );
}
